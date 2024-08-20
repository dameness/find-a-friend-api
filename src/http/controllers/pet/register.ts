import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/errors/resource-not-found-error';
import { makeRegisterPetUseCase } from '@/use-cases/pet/factories/register-pet-use-case-factory';

export const registerPet = async (req: FastifyRequest, res: FastifyReply) => {
  const registerPetBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    requirements: z.string().optional(),
    age: z.enum(['PUPPY', 'ADULT', 'SENIOR']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
    energy: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    independency: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    space_needed: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    image_url: z.string().optional(),
  });

  const data = registerPetBodySchema.parse(req.body);

  const registerPetUseCase = makeRegisterPetUseCase();

  try {
    await registerPetUseCase.execute({
      ...data,
      organization_id: req.user.sub,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError)
      return res.status(404).send({ message: err.message });

    throw err;
  }

  return res.status(201).send();
};
