import { FastifyInstance } from 'fastify';
import { authenticate } from './authenticate';
import { refreshToken } from './refresh-token';
import { registerOrganization } from './register';
import { getStates } from './get-states';
import { getOrganizatonDetails } from './get-details';

export const organizationRoutes = async (app: FastifyInstance) => {
  app.post('/organizations', registerOrganization);

  app.get('/states', getStates);
  app.get('/organizations/:id', getOrganizatonDetails);

  // Authentication
  app.post('/sessions', authenticate);
  app.patch('/token/refresh', refreshToken);
};
