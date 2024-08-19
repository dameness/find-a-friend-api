import { OrganizationsRepository } from '@/models/organization-repository';
import { describe, it, beforeEach, expect } from 'vitest';
import { AuthenticateUseCase } from './authenticate';
import { InMemoryOrganizationsRepository } from '@/repos/in-memory/in-memory-organizations-repository';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error';

let organizationsRepository: OrganizationsRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new AuthenticateUseCase(organizationsRepository);
  });

  it('should be able to authenticate as an organization', async () => {
    const emailInput = 'mail@mail.com';
    const passwordInput = '123456';

    await organizationsRepository.create({
      email: emailInput,
      name: 'name-01',
      phone: '99999999',
      password_hash: await hash(passwordInput, 6),
      zip_code: '933321112',
      state: 'state-01',
      city: 'city-01',
      neighborhood: 'n-01',
      street: 's-01',
      latitude: 0,
      longitude: 0,
    });

    const { organization } = await sut.execute({
      email: emailInput,
      password: passwordInput,
    });

    expect(organization.id).toBeTypeOf('string');
  });

  it('should not be able to authenticate with invalid e-mail', async () => {
    await expect(() =>
      sut.execute({
        email: 'wrong@mail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const emailInput = 'mail@mail.com';
    const passwordInput = '123456';

    await organizationsRepository.create({
      email: emailInput,
      name: 'name-01',
      phone: '99999999',
      password_hash: await hash(passwordInput, 6),
      zip_code: '933321112',
      state: 'state-01',
      city: 'city-01',
      neighborhood: 'n-01',
      street: 's-01',
      latitude: 0,
      longitude: 0,
    });

    await expect(() =>
      sut.execute({
        email: emailInput,
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
