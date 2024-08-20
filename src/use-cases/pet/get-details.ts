import { ResourceNotFoundError } from '@/errors/resource-not-found-error';
import { PetRepository } from '@/models/pet-repository';
import { Pet } from '@prisma/client';

interface GetPetDetailsUseCaseRequest {
  id: string;
}

interface GetPetDetailsUseCaseResponse {
  pet: Pet;
}

export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute({
    id,
  }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) throw new ResourceNotFoundError();

    return { pet };
  }
}
