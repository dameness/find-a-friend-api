import { OrganizationsRepository } from '@/models/organization-repository';
import { Organization, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  private organizations: Organization[] = [];

  async create(data: Prisma.OrganizationCreateInput) {
    const {
      city,
      email,
      latitude,
      longitude,
      name,
      neighborhood,
      password_hash,
      phone,
      state,
      street,
      zip_code,
    } = data;

    const organization: Organization = {
      id: randomUUID(),
      latitude: new Prisma.Decimal(latitude.toString()),
      longitude: new Prisma.Decimal(longitude.toString()),
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

  async findByEmail(email: string) {
    const organization = this.organizations.find((it) => it.email === email);
    return organization || null;
  }
}
