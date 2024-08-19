import { Pet, Prisma } from '@prisma/client';

export interface PetFilters {
  city: string;
  age?: 'PUPPY' | 'ADULT' | 'SENIOR';
  size?: 'SMALL' | 'MEDIUM' | 'BIG';
  energy?: 'LOW' | 'MEDIUM' | 'HIGH';
  independency?: 'LOW' | 'MEDIUM' | 'HIGH';
  space_needed?: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  filter(filters: PetFilters): Promise<Pet[]>;
}
