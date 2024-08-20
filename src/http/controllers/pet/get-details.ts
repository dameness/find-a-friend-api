import { makeGetPetDetailsUseCase } from '@/use-cases/pet/factories/get-pet-details-use-case-factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/errors/resource-not-found-error';

export const getPetDetails = async (req: FastifyRequest, res: FastifyReply) => {
  const getPetDetailsParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = getPetDetailsParamsSchema.parse(req.params);

  const getPetDetailsUseCase = makeGetPetDetailsUseCase();

  try {
    const { pet } = await getPetDetailsUseCase.execute({
      id,
    });

    return res.status(200).send({ pet });
  } catch (err) {
    if (err instanceof ResourceNotFoundError)
      return res.status(404).send({ message: err.message });

    throw err;
  }
};
