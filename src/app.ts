import { fastify } from 'fastify';
import { ongsRoutes } from '@/http/controllers/ongs/routes';
import { ZodError } from 'zod';
import { env } from './env';

export const app = fastify();

app.register(ongsRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', errors: error.issues });
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error);
  }

  return reply.status(500).send({ message: 'Internal Server Error' });
});
