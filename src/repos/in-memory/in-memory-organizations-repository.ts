import {
  OrganizationCreateInput,
  OrganizationsRepository,
} from '@/models/organization-repository';
import { State } from '@/use-cases/organization/get-states';
import { Organization, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public organizations: Organization[] = [];

  async create(data: OrganizationCreateInput) {
    const {
      id,
      city,
      email,
      name,
      neighborhood,
      password_hash,
      phone,
      state,
      street,
      zip_code,
    } = data;

    const organization: Organization = {
      id: id ?? randomUUID(),
      latitude: new Prisma.Decimal(0),
      longitude: new Prisma.Decimal(0),
      city,
      email,
      name,
      neighborhood,
      password_hash,
      phone,
      state,
      street,
      zip_code,
    };

    this.organizations.push(organization);

    return organization;
  }

  async findById(id: string) {
    const organization = this.organizations.find((it) => it.id === id);
    return organization || null;
  }

  async findByEmail(email: string) {
    const organization = this.organizations.find((it) => it.email === email);
    return organization || null;
  }

  async getStates() {
    const initialStates = this.organizations.map((it) => it.state);
    const uniqueStates = [...new Set(initialStates)];

    const states: State[] = uniqueStates.map((state) => {
      const initialCities = this.organizations
        .map((it) => {
          if (state === it.state) return it.city;
        })
        .filter((it) => it != undefined) as string[];

      const uniqueCities = [...new Set(initialCities)];

      return {
        state: state,
        cities: uniqueCities,
      };
    });

    return states;
  }
}
