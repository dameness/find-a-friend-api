import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '@/app';
import request from 'supertest';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { Decimal } from '@prisma/client/runtime/library';

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticate', async () => {
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

    const response = await request(app.server).post('/sessions').send({
      email: 'mail@mail.com',
      password: '123456',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body.token).toBeTypeOf('string');
  });
});
