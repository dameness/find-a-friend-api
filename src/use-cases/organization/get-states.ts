import { OrganizationsRepository } from '@/models/organization-repository';

export type State = {
  state: string;
  cities: string[];
};

interface GetStatesUseCaseResponse {
  states: State[];
}

export class GetStatesUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}
  async execute(): Promise<GetStatesUseCaseResponse> {
    const states = await this.organizationsRepository.getStates();

    return { states };
  }
}
