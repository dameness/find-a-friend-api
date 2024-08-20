import { PetFilters, PetRepository } from '@/models/pet-repository';
import { Pet } from '@prisma/client';

interface filterPetsUseCaseRequest {
  filters: PetFilters;
}

interface filterPetsUseCaseResponse {
  pets: Pet[];
}

export class filterPetsUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute({
    filters,
  }: filterPetsUseCaseRequest): Promise<filterPetsUseCaseResponse> {
    const pets = await this.petsRepository.filter(filters);

    return { pets };
  }
}
