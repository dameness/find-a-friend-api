import { beforeEach, describe, expect, it } from 'vitest';
import { GetOrganizationDetailsUseCase } from './get-details';
import { InMemoryOrganizationsRepository } from '@/repos/in-memory/in-memory-organizations-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { hash } from 'bcryptjs';
import { ResourceNotFoundError } from '@/errors/resource-not-found-error';

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: GetOrganizationDetailsUseCase;

describe('Get Organization Details Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new GetOrganizationDetailsUseCase(organizationsRepository);
  });

  it('should be able to get organization details without password hash', async () => {
    const { id } = await organizationsRepository.create({
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

    const { organization } = await sut.execute({ id });

    expect(organization.id).toBe(id);
    expect(organization).toEqual(
      expect.objectContaining({ password_hash: undefined })
    );
  });

  it('should not be able to get organization details with invalid id', async () => {
    await expect(() =>
      sut.execute({ id: 'invalid-id' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
