import { State } from '@/use-cases/organization/get-states';
import { Organization, Prisma } from '@prisma/client';

export type OrganizationCreateInput = Omit<
  Prisma.OrganizationCreateInput,
  'latitude' | 'longitude'
>;

export interface OrganizationsRepository {
  create(data: OrganizationCreateInput): Promise<Organization>;
  findById(id: string): Promise<Organization | null>;
  findByEmail(email: string): Promise<Organization | null>;
  getStates(): Promise<State[]>;
}
