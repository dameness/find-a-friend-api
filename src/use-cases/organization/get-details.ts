import { ResourceNotFoundError } from '@/errors/resource-not-found-error';
import { OrganizationsRepository } from '@/models/organization-repository';
import { Organization } from '@prisma/client';

interface GetOrganizationDetailsUseCaseRequest {
  id: string;
}

interface GetOrganizationDetailsUseCaseResponse {
  organization: Omit<Organization, 'password_hash'>;
}

export class GetOrganizationDetailsUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    id,
  }: GetOrganizationDetailsUseCaseRequest): Promise<GetOrganizationDetailsUseCaseResponse> {
    const organization = await this.organizationsRepository.findById(id);

    if (!organization) throw new ResourceNotFoundError();

    const organizationWithoutPasswordHash = {
      ...organization,
      password_hash: undefined,
    };

    return { organization: organizationWithoutPasswordHash };
  }
}
