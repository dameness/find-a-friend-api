import { PrismaOrganizationsRepository } from '@/repos/prisma/prisma-organizations-repository';
import { RegisterOrganizationUseCase } from '../register';

export function makeRegisterOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository();
  const registerOrganizationUseCase = new RegisterOrganizationUseCase(
    organizationsRepository
  );

  return registerOrganizationUseCase;
}
