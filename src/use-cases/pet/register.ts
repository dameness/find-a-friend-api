import { ResourceNotFoundError } from '@/errors/resource-not-found-error';
import { OrganizationsRepository } from '@/models/organization-repository';
import { PetRepository } from '@/models/pet-repository';
import { Pet } from '@prisma/client';

interface RegisterPetUseCaseRequest {
  id?: string;
  name: string;
  description?: string;
  requirements?: string;
  age?: 'PUPPY' | 'ADULT' | 'SENIOR';
  size?: 'SMALL' | 'MEDIUM' | 'BIG';
  energy?: 'LOW' | 'MEDIUM' | 'HIGH';
  independency?: 'LOW' | 'MEDIUM' | 'HIGH';
  space_needed?: 'LOW' | 'MEDIUM' | 'HIGH';
  image_url?: string;
  organization_id: string;
}

interface RegisterPetUseCaseResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetRepository,
    private organizationsRepository: OrganizationsRepository
  ) {}

  async execute(
    data: RegisterPetUseCaseRequest
  ): Promise<RegisterPetUseCaseResponse> {
    const organizationExists = await this.organizationsRepository.findById(
      data.organization_id
    );

    if (!organizationExists) throw new ResourceNotFoundError();

    const pet = await this.petsRepository.create(data);

    return { pet };
  }
}
