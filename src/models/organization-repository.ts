import { Organization, Prisma } from '@prisma/client';

export interface OrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
  findById(id: string): Promise<Organization | null>;
  findByEmail(email: string): Promise<Organization | null>;
}
