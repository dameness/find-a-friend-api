import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { env } from './env';
import { ZodError } from 'zod';
import { organizationRoutes } from './http/controllers/organization/routes';
import { petRoutes } from './http/controllers/pet/routes';
import fastifyCors from '@fastify/cors';

export const app = fastify();

app.register(fastifyCors, {
  origin: true,
  credentials: true,
});
app.register(fastifyCookie);
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
});
app.register(organizationRoutes);
app.register(petRoutes);

app.setErrorHandler((error, _req, res) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // could use an external tool to control error logs in production
  }

  return res.status(500).send({ message: 'Internal server error.' });
});
