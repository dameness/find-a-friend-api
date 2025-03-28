import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(['production', 'test', 'dev']).default('dev'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  LOCATION_IQ_API_KEY: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid environment variables. ', _env.error.format());
  throw new Error('Invalid environment variables.');
}

export const env = _env.data;
