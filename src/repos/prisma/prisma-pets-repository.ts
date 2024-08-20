import { prisma } from '@/lib/prisma';
import { PetFilters, PetRepository } from '@/models/pet-repository';
import { Prisma } from '@prisma/client';

export class PrismaPetsRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
    });

    return pet;
  }

  async filter(filters: PetFilters) {
    const petsFilters = { ...filters, city: undefined };

    const pets = await prisma.pet.findMany({
      where: {
        organization: { city: filters.city },
        ...petsFilters,
      },
    });

    return pets;
  }
}
