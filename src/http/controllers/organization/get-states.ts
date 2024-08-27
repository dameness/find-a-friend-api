import { FastifyReply, FastifyRequest } from 'fastify';
import { makeGetStatesUseCase } from '@/use-cases/organization/factories/get-states-use-case-factory';

export const getStates = async (_req: FastifyRequest, res: FastifyReply) => {
  const getStatesUseCase = makeGetStatesUseCase();

  const { states } = await getStatesUseCase.execute();

  return res.status(200).send({ states });
};
