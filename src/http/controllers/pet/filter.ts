import { makeFilterPetsUseCase } from '@/use-cases/pet/factories/filter-pets-use-case-factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const filterPets = async (req: FastifyRequest, res: FastifyReply) => {
  const filterPetsQuerySchema = z.object({
    city: z.string(),
    age: z.enum(['PUPPY', 'ADULT', 'SENIOR']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
    energy: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    independency: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    space_needed: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  });

  const data = filterPetsQuerySchema.parse(req.query);

  const filterPetsUseCase = makeFilterPetsUseCase();

  const { pets } = await filterPetsUseCase.execute({ filters: data });

  return res.status(200).send({ pets });
};
