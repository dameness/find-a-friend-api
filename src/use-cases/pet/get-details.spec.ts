import { InMemoryPetsRepository } from '@/repos/in-memory/in-memory-pets-repository';
import { GetPetDetailsUseCase } from './get-details';
import { InMemoryOrganizationsRepository } from '@/repos/in-memory/in-memory-organizations-repository';
import { hash } from 'bcryptjs';
import { ResourceNotFoundError } from '@/errors/resource-not-found-error';

let organizationsRepository: InMemoryOrganizationsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: GetPetDetailsUseCase;

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    petsRepository = new InMemoryPetsRepository(organizationsRepository);
    sut = new GetPetDetailsUseCase(petsRepository);
  });

  it('should be able to get pet details', async () => {
    const { id: organizationId } = await organizationsRepository.create({
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
    });

    const createdPet = await petsRepository.create({
      name: 'pet-01',
      organization_id: organizationId,
    });

    const { pet } = await sut.execute({ id: createdPet.id });

    expect(pet.id).toBe(createdPet.id);
    expect(pet.organization_id).toBe(createdPet.organization_id);
  });

  it('should not be able to get pet details with invalid id', async () => {
    await expect(() =>
      sut.execute({ id: 'invalid-id' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
