import { InMemoryOrganizationsRepository } from '@/repos/in-memory/in-memory-organizations-repository';
import { describe } from 'vitest';
import { RegisterOrganizationUseCase } from './register';
import { beforeEach } from 'node:test';

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: RegisterOrganizationUseCase;

describe('Register Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository();
    sut = new RegisterOrganizationUseCase(organizationsRepository);
  });

  //continuar
});
