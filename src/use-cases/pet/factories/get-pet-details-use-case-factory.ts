import { GetPetDetailsUseCase } from '../get-details';
import { PrismaPetsRepository } from '@/repos/prisma/prisma-pets-repository';

export function makeGetPetDetailsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const getPetDetailsUseCase = new GetPetDetailsUseCase(petsRepository);

  return getPetDetailsUseCase;
}
