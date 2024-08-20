import { PrismaOrganizationsRepository } from '@/repos/prisma/prisma-organizations-repository';
import { RegisterPetUseCase } from '../register';
import { PrismaPetsRepository } from '@/repos/prisma/prisma-pets-repository';

export function makeRegisterPetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const organizationsRepository = new PrismaOrganizationsRepository();
  const registerPetUseCase = new RegisterPetUseCase(
    petsRepository,
    organizationsRepository
  );

  return registerPetUseCase;
}
