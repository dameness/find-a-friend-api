import { PrismaOrganizationsRepository } from '@/repos/prisma/prisma-organizations-repository';
import { GetOrganizationDetailsUseCase } from '../get-details';

export function makeGetOrganizationDetailsUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const getOrganizationDetailsUseCase = new GetOrganizationDetailsUseCase(
    organizationsRepository
  );

  return getOrganizationDetailsUseCase;
}
