import { app } from '@/app';
import request from 'supertest';
import { prisma } from '@/lib/prisma';
import { createAndAuthenticateOrganization } from '@/utils/create-and-authenticate-organization';

describe('Filter Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to filter pets', async () => {
    await createAndAuthenticateOrganization(app);

    const { id: organizationId } = await prisma.organization.findFirstOrThrow();

    await prisma.pet.createMany({
      data: [
        {
          name: 'pet-01',
          description: 'description',
          requirements: 'requirements',
          size: 'BIG',
          energy: 'LOW',
          age: 'PUPPY',
          image_url: 'image-url-test',
          organization_id: organizationId,
        },
        {
          name: 'pet-01',
          description: 'description',
          requirements: 'requirements',
          size: 'BIG',
          energy: 'LOW',
          age: 'PUPPY',
          image_url: 'image-url-test',
          organization_id: organizationId,
        },
        {
          name: 'pet-01',
          description: 'description',
          requirements: 'requirements',
          size: 'BIG',
          energy: 'LOW',
          age: 'PUPPY',
          image_url: 'image-url-test',
          organization_id: organizationId,
        },
        {
          name: 'pet-01',
          description: 'description',
          requirements: 'requirements',
          size: 'BIG',
          age: 'PUPPY',
          image_url: 'image-url-test',
          organization_id: organizationId,
        },
        {
          name: 'pet-01',
          description: 'description',
          requirements: 'requirements',
          age: 'PUPPY',
          energy: 'LOW',
          image_url: 'image-url-test',
          organization_id: organizationId,
        },
      ],
    });

    const petResponse = await request(app.server)
      .get('/pets')
      .query({
        city: 'city-01', // city from organization
        size: 'BIG',
        age: 'PUPPY',
        energy: 'LOW',
      })
      .send();

    expect(petResponse.statusCode).toEqual(200);
    expect(petResponse.body.pets).toHaveLength(3);
    expect(petResponse.body.pets).toEqual([
      expect.objectContaining({ id: expect.any(String) }),
      expect.objectContaining({ id: expect.any(String) }),
      expect.objectContaining({ id: expect.any(String) }),
    ]);
  });
});
