import { FastifyInstance } from 'fastify';
import { registerPet } from './register';
import { verifyJwt } from '@/http/middleware/verify-jwt';
import { getPetDetails } from './get-details';
import { filterPets } from './filter';
import path from 'node:path';
import fs from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// @ts-ignore
const __dirname = dirname(fileURLToPath(import.meta.url));

export const petRoutes = async (app: FastifyInstance) => {
  app.get('/pets/:id', getPetDetails);
  app.get('/pets', filterPets);

  // Authenticated
  app.post('/pets', { onRequest: [verifyJwt] }, registerPet);
  app.post('/upload', { onRequest: [verifyJwt] }, async (req, res) => {
    const data = await req.file();

    if (!fs.existsSync(path.join(__dirname, '../../../uploads'))) {
      fs.mkdirSync(path.join(__dirname, '../../../uploads'));
    }

    const fileName = `${Date.now()}-${data?.filename}`;
    const filePath = path.join(__dirname, '../../../uploads', fileName);

    const fileStream = fs.createWriteStream(filePath);

    data?.file.pipe(fileStream);

    res.send({ filePath: `/uploads/${fileName}` });
  });
};
