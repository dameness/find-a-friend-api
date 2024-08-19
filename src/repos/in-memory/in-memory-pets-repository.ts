import { PetFilters, PetRepository } from '@/models/pet-repository';
import { Prisma, Pet } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { InMemoryOrganizationsRepository } from './in-memory-organizations-repository';

export class InMemoryPetsRepository implements PetRepository {
  constructor(
    private organizationsRepository: InMemoryOrganizationsRepository
  ) {}

  private pets: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      requirements: data.requirements ?? null,
      age: data.age ?? 'ADULT',
      energy: data.energy ?? 'MEDIUM',
      independency: data.independency ?? 'MEDIUM',
      size: data.size ?? 'MEDIUM',
      space_needed: data.space_needed ?? 'MEDIUM',
      image_url: data.image_url ?? null,
      organization_id: data.organization_id,
    };

    this.pets.push(pet);

    return pet;
  }

  async findById(id: string) {
    const pet = this.pets.find((it) => it.id === id);
    return pet || null;
  }

  async filter(filters: PetFilters) {
    const organizationsByCity =
      this.organizationsRepository.organizations.filter(
        (it) => it.city === filters.city
      );

    const pets = this.pets
      .filter((pet) =>
        organizationsByCity.some(
          (organization) => organization.id === pet.organization_id
        )
      )
      .filter((pet) => (filters.age ? pet.age === filters.age : true))
      .filter((pet) => (filters.size ? pet.size === filters.size : true))
      .filter((pet) => (filters.energy ? pet.energy === filters.energy : true))
      .filter((pet) =>
        filters.independency ? pet.independency === filters.independency : true
      )
      .filter((pet) =>
        filters.space_needed ? pet.space_needed === filters.space_needed : true
      );

    return pets;
  }
}
