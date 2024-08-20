import { PrismaPetsRepository } from '@/repos/prisma/prisma-pets-repository';
import { FilterPetsUseCase } from '../filter';

export function makeFilterPetsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const filterPetsUseCase = new FilterPetsUseCase(petsRepository);

  return filterPetsUseCase;
}
