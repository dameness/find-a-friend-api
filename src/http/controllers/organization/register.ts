import { makeRegisterOrganizationUseCase } from '@/use-cases/organization/factories/register-organization-use-case-factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { OrganizationAlreadyExistsError } from '@/errors/organization-already-exists-error';

export const registerOrganization = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const registerOrganizationBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    password: z.string(),
    zip_code: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
  });

  const data = registerOrganizationBodySchema.parse(req.body);

  const registerOrganizationUseCase = makeRegisterOrganizationUseCase();

  try {
    await registerOrganizationUseCase.execute(data);
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError)
      return res.status(409).send({ message: err.message });

    throw err;
  }

  return res.status(201).send();
};
