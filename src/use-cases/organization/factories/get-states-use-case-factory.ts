import { PrismaOrganizationsRepository } from '@/repos/prisma/prisma-organizations-repository';
import { GetStatesUseCase } from '../get-states';

export function makeGetStatesUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const getStatesUseCase = new GetStatesUseCase(organizationsRepository);

  return getStatesUseCase;
}
