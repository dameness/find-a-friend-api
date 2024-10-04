import { InMemoryPetsRepository } from '@/repos/in-memory/in-memory-pets-repository';
import { FilterPetsUseCase } from './filter';
import { InMemoryOrganizationsRepository } from '@/repos/in-memory/in-memory-organizations-repository';
import { hash } from 'bcryptjs';

let petsRepository: InMemoryPetsRepository;
let organizationsRepository: InMemoryOrganizationsRepository;
let sut: FilterPetsUseCase;

describe('Filter Pets Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    petsRepository = new InMemoryPetsRepository(organizationsRepository);
    sut = new FilterPetsUseCase(petsRepository);
  });

  it('should be able to filter pets by city', async () => {
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
    });

    await organizationsRepository.create({
      id: 'org-02',
      email: 'mail@mail.com',
      name: 'name-01',
      phone: '99999999',
      password_hash: await hash('123456', 6),
      zip_code: '933321112',
      state: 'state-01',
      city: 'city-02',
      neighborhood: 'n-01',
      street: 's-01',
    });

    // registering pets in org-01 from city-01
    for (let i = 1; i <= 3; i++) {
      await petsRepository.create({
        name: `pet-${i}`,
        organization_id: 'org-01',
      });
    }

    // registering pets in org-02 from city-02
    for (let i = 1; i <= 5; i++) {
      await petsRepository.create({
        name: `pet-${i}`,
        organization_id: 'org-02',
      });
    }

    const { pets: petsFromCity1 } = await sut.execute({
      filters: { city: 'city-01' },
    });

    const { pets: petsFromCity2 } = await sut.execute({
      filters: { city: 'city-02' },
    });

    const { pets: petsFromUnexistentCity } = await sut.execute({
      filters: { city: 'city' },
    });

    expect(petsFromCity1).toHaveLength(3);
    expect(petsFromCity2).toHaveLength(5);
    expect(petsFromUnexistentCity).toHaveLength(0);
  });

  it('should be able to filter pets by age', async () => {
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
    });

    await petsRepository.create({
      name: 'pet-01',
      age: 'PUPPY',
      organization_id: 'org-01',
    });
    await petsRepository.create({
      name: 'pet-02',
      organization_id: 'org-01',
    });

    await petsRepository.create({
      name: 'pet-03',
      age: 'SENIOR',
      organization_id: 'org-01',
    });

    await petsRepository.create({
      name: 'pet-04',
      age: 'SENIOR',
      organization_id: 'org-01',
    });

    const { pets: puppies } = await sut.execute({
      filters: { city: 'city-01', age: 'PUPPY' },
    });

    const { pets: adults } = await sut.execute({
      filters: { city: 'city-01', age: 'ADULT' },
    });

    const { pets: seniors } = await sut.execute({
      filters: { city: 'city-01', age: 'SENIOR' },
    });

    expect(puppies).toHaveLength(1);
    expect(adults).toHaveLength(1);
    expect(seniors).toHaveLength(2);
  });

  it('should be able to filter pets by size', async () => {
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
    });

    await petsRepository.create({
      name: 'pet-01',
      size: 'SMALL',
      organization_id: 'org-01',
    });
    await petsRepository.create({
      name: 'pet-02',
      organization_id: 'org-01',
    });

    await petsRepository.create({
      name: 'pet-03',
      size: 'BIG',
      organization_id: 'org-01',
    });

    await petsRepository.create({
      name: 'pet-04',
      size: 'BIG',
      organization_id: 'org-01',
    });

    const { pets: smallPets } = await sut.execute({
      filters: { city: 'city-01', size: 'SMALL' },
    });

    const { pets: mediumPets } = await sut.execute({
      filters: { city: 'city-01', size: 'MEDIUM' },
    });

    const { pets: bigPets } = await sut.execute({
      filters: { city: 'city-01', size: 'BIG' },
    });

    expect(smallPets).toHaveLength(1);
    expect(mediumPets).toHaveLength(1);
    expect(bigPets).toHaveLength(2);
  });

  it('should be able to filter pets by energy level', async () => {
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
    });

    await petsRepository.create({
      name: 'pet-01',
      energy: 'LOW',
      organization_id: 'org-01',
    });
    await petsRepository.create({
      name: 'pet-02',
      organization_id: 'org-01',
    });

    await petsRepository.create({
      name: 'pet-03',
      energy: 'HIGH',
      organization_id: 'org-01',
    });

    await petsRepository.create({
      name: 'pet-04',
      energy: 'HIGH',
      organization_id: 'org-01',
    });

    const { pets: lowEnergyPets } = await sut.execute({
      filters: { city: 'city-01', energy: 'LOW' },
    });

    const { pets: mediumEnergyPets } = await sut.execute({
      filters: { city: 'city-01', energy: 'MEDIUM' },
    });

    const { pets: highEnergyPets } = await sut.execute({
      filters: { city: 'city-01', energy: 'HIGH' },
    });

    expect(lowEnergyPets).toHaveLength(1);
    expect(mediumEnergyPets).toHaveLength(1);
    expect(highEnergyPets).toHaveLength(2);
  });

  it('should be able to filter pets by independency level', async () => {
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
    });

    await petsRepository.create({
      name: 'pet-01',
      independency: 'LOW',
      organization_id: 'org-01',
    });
    await petsRepository.create({
      name: 'pet-02',
      organization_id: 'org-01',
    });

    await petsRepository.create({
      name: 'pet-03',
      independency: 'HIGH',
      organization_id: 'org-01',
    });

    await petsRepository.create({
      name: 'pet-04',
      independency: 'HIGH',
      organization_id: 'org-01',
    });

    const { pets: lowIndependencyPets } = await sut.execute({
      filters: { city: 'city-01', independency: 'LOW' },
    });

    const { pets: mediumIndependencyPets } = await sut.execute({
      filters: { city: 'city-01', independency: 'MEDIUM' },
    });

    const { pets: highIndependencyPets } = await sut.execute({
      filters: { city: 'city-01', independency: 'HIGH' },
    });

    expect(lowIndependencyPets).toHaveLength(1);
    expect(mediumIndependencyPets).toHaveLength(1);
    expect(highIndependencyPets).toHaveLength(2);
  });

  it('should be able to filter pets by space needed', async () => {
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
    });

    await petsRepository.create({
      name: 'pet-01',
      space_needed: 'LOW',
      organization_id: 'org-01',
    });
    await petsRepository.create({
      name: 'pet-02',
      organization_id: 'org-01',
    });

    await petsRepository.create({
      name: 'pet-03',
      space_needed: 'HIGH',
      organization_id: 'org-01',
    });

    await petsRepository.create({
      name: 'pet-04',
      space_needed: 'HIGH',
      organization_id: 'org-01',
    });

    const { pets: lowSpacePets } = await sut.execute({
      filters: { city: 'city-01', space_needed: 'LOW' },
    });

    const { pets: mediumSpacePets } = await sut.execute({
      filters: { city: 'city-01', space_needed: 'MEDIUM' },
    });

    const { pets: highSpacePets } = await sut.execute({
      filters: { city: 'city-01', space_needed: 'HIGH' },
    });

    expect(lowSpacePets).toHaveLength(1);
    expect(mediumSpacePets).toHaveLength(1);
    expect(highSpacePets).toHaveLength(2);
  });

  it('should be able to fetch pets with multiple filters', async () => {
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
    });

    await organizationsRepository.create({
      id: 'org-02',
      email: 'mail@mail.com',
      name: 'name-01',
      phone: '99999999',
      password_hash: await hash('123456', 6),
      zip_code: '933321112',
      state: 'state-01',
      city: 'city-02',
      neighborhood: 'n-01',
      street: 's-01',
    });

    // City 1, Puppies, Low Space Needed
    for (let i = 1; i <= 10; i++) {
      await petsRepository.create({
        name: `pet-${i}`,
        age: 'PUPPY',
        space_needed: 'LOW',
        organization_id: 'org-01',
      });
    }

    // City 1, Low Space Needed
    for (let i = 1; i <= 25; i++) {
      await petsRepository.create({
        name: `pet-${i}`,
        space_needed: 'LOW',
        organization_id: 'org-01',
      });
    }

    // City 1, Puppies, High Space Needed
    for (let i = 1; i <= 5; i++) {
      await petsRepository.create({
        name: `pet-${i}`,
        age: 'PUPPY',
        space_needed: 'HIGH',
        organization_id: 'org-01',
      });
    }

    // City 2, Puppies, Low Space Needed
    for (let i = 1; i <= 15; i++) {
      await petsRepository.create({
        name: `pet-${i}`,
        age: 'PUPPY',
        space_needed: 'LOW',
        organization_id: 'org-02',
      });
    }

    await petsRepository.create({
      name: `pet-1`,
      age: 'PUPPY',
      space_needed: 'LOW',
      size: 'BIG',
      organization_id: 'org-02',
    });

    const { pets: filteredPets1 } = await sut.execute({
      filters: { city: 'city-01', age: 'PUPPY', space_needed: 'LOW' },
    });

    const { pets: filteredPets2 } = await sut.execute({
      filters: {
        city: 'city-01',
        space_needed: 'LOW',
        energy: 'MEDIUM',
        size: 'MEDIUM',
      },
    });

    const { pets: filteredPets3 } = await sut.execute({
      filters: {
        city: 'city-02',
        age: 'PUPPY',
        space_needed: 'LOW',
        size: 'MEDIUM',
      },
    });

    const { pets: filteredPets4 } = await sut.execute({
      filters: {
        city: 'city-02',
        age: 'PUPPY',
        space_needed: 'LOW',
        size: 'MEDIUM',
        independency: 'HIGH',
      },
    });

    expect(filteredPets1).toHaveLength(10);
    expect(filteredPets2).toHaveLength(35);
    expect(filteredPets3).toHaveLength(15);
    expect(filteredPets4).toHaveLength(0);
  });
});
