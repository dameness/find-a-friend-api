import { prisma } from '@/lib/prisma';
import {
  OrganizationCreateInput,
  OrganizationsRepository,
} from '@/models/organization-repository';
import { State } from '@/use-cases/organization/get-states';
import { env } from '@/env';

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create(data: OrganizationCreateInput) {
    const { city, street, state, zip_code } = data;

    const url = new URL(
      `https://us1.locationiq.com/v1/search/structured?format=json&addressdetails=0&limit=1&normalizeaddress=1&key=${env.LOCATION_IQ_API_KEY}`
    );
    url.searchParams.append('city', city);
    url.searchParams.append('street', street);
    url.searchParams.append('state', state);
    url.searchParams.append('postalcode', zip_code);

    const response = await fetch(url);

    const locations: { lat: string; lon: string }[] = await response.json();

    const dataWithLatAndLon = {
      ...data,
      latitude: locations[0]?.lat ?? 0,
      longitude: locations[0]?.lon ?? 0,
    };

    const organization = await prisma.organization.create({
      data: dataWithLatAndLon,
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
