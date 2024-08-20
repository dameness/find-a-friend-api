import { FastifyInstance } from 'fastify';
import { authenticate } from './authenticate';
import { refreshToken } from './refresh-token';
import { registerOrganization } from './register';

export const organizationRoutes = async (app: FastifyInstance) => {
  app.post('/organizations', registerOrganization);

  // Authentication
  app.post('/sessions', authenticate);
  app.patch('/token/refresh', refreshToken);
};
