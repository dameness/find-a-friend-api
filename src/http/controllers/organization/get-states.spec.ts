import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '@/app';
import request from 'supertest';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { Decimal } from '@prisma/client/runtime/library';

describe('Get States (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get states', async () => {
    await prisma.organization.createMany({
      data: [
        {
          email: 'mail1@mail.com',
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
        {
          email: 'mail2@mail.com',
          name: 'name-01',
          phone: '99999999',
          password_hash: await bcrypt.hash('123456', 6),
          zip_code: '933321112',
          state: 'state-01',
          city: 'city-02',
          neighborhood: 'n-01',
          street: 's-01',
          latitude: new Decimal(0),
          longitude: new Decimal(0),
        },
        {
          email: 'mail3@mail.com',
          name: 'name-01',
          phone: '99999999',
          password_hash: await bcrypt.hash('123456', 6),
          zip_code: '933321112',
          state: 'state-01',
          city: 'city-03',
          neighborhood: 'n-01',
          street: 's-01',
          latitude: new Decimal(0),
          longitude: new Decimal(0),
        },
        {
          email: 'mail4@mail.com',
          name: 'name-01',
          phone: '99999999',
          password_hash: await bcrypt.hash('123456', 6),
          zip_code: '933321112',
          state: 'state-02',
          city: 'city-01',
          neighborhood: 'n-01',
          street: 's-01',
          latitude: new Decimal(0),
          longitude: new Decimal(0),
        },
      ],
    });

    const response = await request(app.server).get('/states');

    expect(response.statusCode).toEqual(200);
    expect(response.body.states).toHaveLength(2);
    expect(response.body.states[0].cities).toHaveLength(3);
    expect(response.body.states[1].cities).toHaveLength(1);
    expect(response.body.states).toEqual([
      expect.objectContaining({ state: 'state-01' }),
      expect.objectContaining({ state: 'state-02' }),
    ]);
  });
});
