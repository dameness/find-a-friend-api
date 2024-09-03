import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { env } from './env';
import { ZodError } from 'zod';
import { organizationRoutes } from './http/controllers/organization/routes';
import { petRoutes } from './http/controllers/pet/routes';
import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import fastifyMultipart from '@fastify/multipart';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

export const app = fastify();

// @ts-ignore
const __dirname = dirname(fileURLToPath(import.meta.url));

app.register(fastifyCors, {
  // Refresh Token Cookie just working on same origin with HTTP (development)
  // TODO: on production, change cookies config --> secure: true; samesite: 'None';
  origin: ['http://192.168.1.14:5173', 'http://localhost:5173'],
  credentials: true,
});
app.register(fastifyCookie);
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
});
app.register(fastifyMultipart);
app.register(fastifyStatic, {
  root: path.join(__dirname, 'uploads'),
  prefix: '/uploads/',
});

app.post('/upload', async (req, res) => {
  const data = await req.file();

  if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
    fs.mkdirSync(path.join(__dirname, 'uploads'));
  }

  const fileName = `${Date.now()}-${data?.filename}`;
  const filePath = path.join(__dirname, 'uploads', fileName);

  const fileStream = fs.createWriteStream(filePath);

  data?.file.pipe(fileStream);

  res.send({ filePath: `/uploads/${fileName}` });
});

app.register(organizationRoutes);
app.register(petRoutes);

app.setErrorHandler((error, _req, res) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // could use an external tool to control error logs in production
  }

  return res.status(500).send({ message: 'Internal server error.' });
});
