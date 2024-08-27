import { prisma } from '@/lib/prisma';
import { OrganizationsRepository } from '@/models/organization-repository';
import { State } from '@/use-cases/organization/get-states';
import { Prisma } from '@prisma/client';

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data,
    });

    return organization;
  }

  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: { id },
    });

    return organization;
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: { email },
    });

    return organization;
  }
  async getStates() {
    const citiesAndStates = await prisma.organization.findMany({
      select: {
        city: true,
        state: true,
      },
    });

    const keys = new Set<string>();
    let states: State[] = [];

    citiesAndStates.map((it) => {
      const key = `${it.state}_${it.city}`;
      if (!keys.has(key)) {
        keys.add(key);

        let found = false;

        states = states.map((stateObject) => {
          if (stateObject.state === it.state) {
            found = true;
            return {
              state: stateObject.state,
              cities: [...stateObject.cities, it.city],
            };
          }
          return stateObject;
        });

        if (!found) {
          states.push({ state: it.state, cities: [it.city] });
        }
      }
    });

    return states;
  }
}
