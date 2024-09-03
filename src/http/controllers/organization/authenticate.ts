import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeAuthenticateUseCase } from '@/use-cases/organization/factories/authenticate-use-case-factory';
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error';
export const authenticate = async (req: FastifyRequest, res: FastifyReply) => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const data = authenticateBodySchema.parse(req.body);

  const authenticateUseCase = makeAuthenticateUseCase();

  try {
    const { organization } = await authenticateUseCase.execute(data);

    const token = await res.jwtSign({}, { sign: { sub: organization.id } });

    const refreshToken = await res.jwtSign(
      {},
      { sign: { sub: organization.id, expiresIn: '7d' } }
    );

    return res
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        // secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError)
      return res.status(403).send({ message: err.message });

    throw err;
  }
};
