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
        zip_code: '09175-500',
        state: 'SP',
        city: 'Santo André',
        neighborhood: 'Jardim do Estádio',
        street: 'Rua das Hortências',
      });

    expect(organizationResponse.statusCode).toEqual(201);
  });
});
