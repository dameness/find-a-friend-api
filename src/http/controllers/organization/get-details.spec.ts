import { app } from '@/app';
import request from 'supertest';
import { prisma } from '@/lib/prisma';
import { createAndAuthenticateOrganization } from '@/utils/create-and-authenticate-organization';

describe('Get Organization Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get organization details without password hash', async () => {
    await createAndAuthenticateOrganization(app);

    const { id } = await prisma.organization.findFirstOrThrow();

    const response = await request(app.server)
      .get(`/organizations/${id}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.organization).toEqual(expect.objectContaining({ id }));
    expect(response.body.organization.password_hash).toEqual(undefined);
  });
});
