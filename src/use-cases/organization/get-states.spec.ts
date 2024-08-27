import { InMemoryOrganizationsRepository } from '@/repos/in-memory/in-memory-organizations-repository';
import { describe, expect, it, beforeEach } from 'vitest';
import { GetStatesUseCase } from './get-states';
import { Decimal } from '@prisma/client/runtime/library';
import { hash } from 'bcryptjs';

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: GetStatesUseCase;

describe('Get States Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new GetStatesUseCase(organizationsRepository);
  });

  it('should be able to get states from all organizations', async () => {
    for (let i = 1; i <= 5; i++) {
      await organizationsRepository.create({
        id: `org-${i}`,
        email: `mail1${i}@mail.com`,
        name: 'name-01',
        phone: '99999999',
        password_hash: await hash('123456', 6),
        zip_code: '933321112',
        state: 'state-01',
        city: `city-${i}`,
        neighborhood: 'n-01',
        street: 's-01',
        latitude: new Decimal(0),
        longitude: new Decimal(0),
      });
    }

    for (let i = 1; i <= 6; i++) {
      await organizationsRepository.create({
        id: `org-${i}`,
        email: `mail2${i}@mail.com`,
        name: 'name-01',
        phone: '99999999',
        password_hash: await hash('123456', 6),
        zip_code: '933321112',
        state: 'state-02',
        city: `city-${i}`,
        neighborhood: 'n-01',
        street: 's-01',
        latitude: new Decimal(0),
        longitude: new Decimal(0),
      });
    }

    const { states } = await sut.execute();

    expect(states).toHaveLength(2);
    expect(states[0].cities).toHaveLength(5);
    expect(states[1].cities).toHaveLength(6);
    expect(states).toEqual([
      expect.objectContaining({ state: 'state-01' }),
      expect.objectContaining({ state: 'state-02' }),
    ]);
  });
});
