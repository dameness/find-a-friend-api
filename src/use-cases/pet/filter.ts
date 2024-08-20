import { PetFilters, PetRepository } from '@/models/pet-repository';
import { Pet } from '@prisma/client';

interface FilterPetsUseCaseRequest {
  filters: PetFilters;
}

interface FilterPetsUseCaseResponse {
  pets: Pet[];
}

export class FilterPetsUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute({
    filters,
  }: FilterPetsUseCaseRequest): Promise<FilterPetsUseCaseResponse> {
    const pets = await this.petsRepository.filter(filters);

    return { pets };
  }
}
