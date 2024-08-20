import { OrganizationAlreadyExistsError } from '@/errors/organization-already-exists-error';
import { OrganizationsRepository } from '@/models/organization-repository';
import { Organization } from '@prisma/client';
import bcrypt from 'bcryptjs';

interface RegisterOrganizationUseCaseRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  zip_code: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  latitude: number;
  longitude: number;
}

interface RegisterOrganizationUseCaseResponse {
  organization: Organization;
}

export class RegisterOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}
  async execute(
    data: RegisterOrganizationUseCaseRequest
  ): Promise<RegisterOrganizationUseCaseResponse> {
    const password_hash = await bcrypt.hash(data.password, 6);

    const emailAlreadyRegistered =
      await this.organizationsRepository.findByEmail(data.email);

    if (emailAlreadyRegistered) throw new OrganizationAlreadyExistsError();

    const newData = { ...data, password: undefined };

    const organization = await this.organizationsRepository.create({
      ...newData,
      password_hash,
    });

    return { organization };
  }
}
