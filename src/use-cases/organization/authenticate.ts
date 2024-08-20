import { InvalidCredentialsError } from '@/errors/invalid-credentials-error';
import { OrganizationsRepository } from '@/models/organization-repository';
import { Organization } from '@prisma/client';
import bcrypt from 'bcryptjs';

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  organization: Organization;
}

export class AuthenticateUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const organization = await this.organizationsRepository.findByEmail(email);

    if (!organization) throw new InvalidCredentialsError();

    const passwordMatches = await bcrypt.compare(
      password,
      organization.password_hash
    );

    if (!passwordMatches) throw new InvalidCredentialsError();

    return { organization };
  }
}
