import { app } from '@/app';
import request from 'supertest';
import { prisma } from '@/lib/prisma';
import { createAndAuthenticateOrganization } from '@/utils/create-and-authenticate-organization';

describe('Get Pet Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get pet details', async () => {
    await createAndAuthenticateOrganization(app);

    const { id: organizationId } = await prisma.organization.findFirstOrThrow();

    const pet = await prisma.pet.create({
      data: {
        name: 'pet-01',
        organization_id: organizationId,
      },
    });

    const petResponse = await request(app.server).get(`/pets/${pet.id}`).send();

    expect(petResponse.statusCode).toEqual(200);
    expect(petResponse.body.pet).toEqual(
      expect.objectContaining({ id: pet.id })
    );
  });
});
