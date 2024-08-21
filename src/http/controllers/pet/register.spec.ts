import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '@/app';
import request from 'supertest';
import { prisma } from '@/lib/prisma';
import { createAndAuthenticateOrganization } from '@/utils/create-and-authenticate-organization';

describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to register a pet', async () => {
    const { token } = await createAndAuthenticateOrganization(app);

    const { id: organizationId } = await prisma.organization.findFirstOrThrow();

    const petResponse = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'pet-01',
        description: 'description',
        requirements: 'requirements',
        size: 'BIG',
        energy: 'LOW',
        age: 'PUPPY',
        independency: 'LOW',
        space_needed: 'HIGH',
        image_url: 'image-url-test',
        organization_id: organizationId,
      });

    expect(petResponse.statusCode).toEqual(201);
  });
});
