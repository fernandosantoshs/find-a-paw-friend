import { prisma } from '@/lib/prisma';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const ongBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    whatsapp: z.string(),
    zipcode: z.string(),
    address_street: z.string(),
    address_number: z.string(),
    city: z.string(),
    uf: z.string().length(2),
  });

  const {
    name,
    email,
    whatsapp,
    zipcode,
    address_street,
    address_number,
    city,
    uf,
  } = ongBodySchema.parse(request.body);

  const ong = await prisma.ong.create({
    data: {
      name,
      email,
      whatsapp,
      zipcode,
      address_street,
      address_number,
      city,
      uf,
    },
  });

  return reply.status(201).send(ong);
}
