import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';
import { Decimal } from '@prisma/client/runtime/library';

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  await prisma.organization.create({
    data: {
      email: 'mail@mail.com',
      name: 'name-01',
      phone: '99999999',
      password_hash: await bcrypt.hash('123456', 6),
      zip_code: '933321112',
      state: 'state-01',
      city: 'city-01',
      neighborhood: 'n-01',
      street: 's-01',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    },
  });

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'mail@mail.com',
    password: '123456',
  });

  const { token } = authResponse.body;

  return { token };
}
