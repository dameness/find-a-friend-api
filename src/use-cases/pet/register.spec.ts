import { InMemoryOrganizationsRepository } from '@/repos/in-memory/in-memory-organizations-repository';
import { InMemoryPetsRepository } from '@/repos/in-memory/in-memory-pets-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterPetUseCase } from './register';
import { Decimal } from '@prisma/client/runtime/library';
import { hash } from 'bcryptjs';
import { ResourceNotFoundError } from '@/errors/resource-not-found-error';

let organizationsRepository: InMemoryOrganizationsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: RegisterPetUseCase;

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    petsRepository = new InMemoryPetsRepository(organizationsRepository);
    sut = new RegisterPetUseCase(petsRepository, organizationsRepository);
  });

  it('should be able to register a pet', async () => {
    await organizationsRepository.create({
      id: 'org-01',
      email: 'mail@mail.com',
      name: 'name-01',
      phone: '99999999',
      password_hash: await hash('123456', 6),
      zip_code: '933321112',
      state: 'state-01',
      city: 'city-01',
      neighborhood: 'n-01',
      street: 's-01',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });

    const { pet } = await sut.execute({
      name: 'pet-01',
      organization_id: 'org-01',
    });

    expect(pet.id).toBeTypeOf('string');
  });

  it('should not be able to register a pet with unexistent organization', async () => {
    await organizationsRepository.create({
      id: 'org-01',
      email: 'mail@mail.com',
      name: 'name-01',
      phone: '99999999',
      password_hash: await hash('123456', 6),
      zip_code: '933321112',
      state: 'state-01',
      city: 'city-01',
      neighborhood: 'n-01',
      street: 's-01',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });

    await expect(() =>
      sut.execute({
        name: 'pet-01',
        organization_id: 'org-02',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
