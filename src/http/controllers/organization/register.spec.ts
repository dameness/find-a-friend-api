import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '@/app';
import request from 'supertest';

describe('Register Organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to register an organization', async () => {
    const organizationResponse = await request(app.server)
      .post('/organizations')
      .send({
        email: 'mail@mail.com',
        name: 'name-01',
        phone: '99999999',
        password: '123456',
        zip_code: '933321112',
        state: 'state-01',
        city: 'city-01',
        neighborhood: 'n-01',
        street: 's-01',
        latitude: 0,
        longitude: 0,
      });

    expect(organizationResponse.statusCode).toEqual(201);
  });
});
