import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/errors/resource-not-found-error';
import { makeGetOrganizationDetailsUseCase } from '@/use-cases/organization/factories/get-organization-details-use-case-factory';

export const getOrganizatonDetails = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const getOrganizatonDetailsParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = getOrganizatonDetailsParamsSchema.parse(req.params);

  const getOrganizatonDetailsUseCase = makeGetOrganizationDetailsUseCase();

  try {
    const { organization } = await getOrganizatonDetailsUseCase.execute({
      id,
    });

    return res.status(200).send({ organization });
  } catch (err) {
    if (err instanceof ResourceNotFoundError)
      return res.status(404).send({ message: err.message });

    throw err;
  }
};
