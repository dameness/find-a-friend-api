import { FastifyInstance } from 'fastify';
import { registerPet } from './register';
import { verifyJwt } from '@/http/middleware/verify-jwt';
import { getPetDetails } from './get-details';
import { filterPets } from './filter';

export const petRoutes = async (app: FastifyInstance) => {
  app.get('/pets/:id', getPetDetails);
  app.get('/pets', filterPets);

  // Authenticated
  app.post('/pets', { onRequest: [verifyJwt] }, registerPet);
};
