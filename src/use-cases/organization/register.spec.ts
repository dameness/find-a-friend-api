import { InMemoryOrganizationsRepository } from '@/repos/in-memory/in-memory-organizations-repository';
import { RegisterOrganizationUseCase } from './register';
import { OrganizationAlreadyExistsError } from '@/errors/organization-already-exists-error';
import { compare } from 'bcryptjs';

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: RegisterOrganizationUseCase;

describe('Register Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new RegisterOrganizationUseCase(organizationsRepository);
  });

  it('should be able to register an organization', async () => {
    const { organization } = await sut.execute({
      email: 'mail@mail.com',
      name: 'name-01',
      phone: '99999999',
      password: '123456',
      zip_code: '933321112',
      state: 'state-01',
      city: 'city-01',
      neighborhood: 'n-01',
      street: 's-01',
    });

    expect(organization.id).toBeTypeOf('string');
  });

  it('should not be able to register using the same e-mail twice', async () => {
    await sut.execute({
      email: 'mail@mail.com',
      name: 'name-01',
      phone: '99999999',
      password: '123456',
      zip_code: '933321112',
      state: 'state-01',
      city: 'city-01',
      neighborhood: 'n-01',
      street: 's-01',
    });

    await expect(() =>
      sut.execute({
        email: 'mail@mail.com',
        name: 'name-02',
        phone: '999999991',
        password: '1234561',
        zip_code: '9333211121',
        state: 'state-012',
        city: 'city-012',
        neighborhood: '2n-01',
        street: 's-012',
      })
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError);
  });

  it('should hash password upon registration', async () => {
    const passwordInput = '123456';

    const { organization } = await sut.execute({
      email: 'mail@mail.com',
      name: 'name-01',
      phone: '99999999',
      password: passwordInput,
      zip_code: '933321112',
      state: 'state-01',
      city: 'city-01',
      neighborhood: 'n-01',
      street: 's-01',
    });

    expect(await compare(passwordInput, organization.password_hash)).toBe(true);
  });
});
