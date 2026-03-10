import { createOngUseCase } from '@/use-cases/create-ong';
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
    address_complement: z.string().optional(),
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
    address_complement,
    city,
    uf,
  } = ongBodySchema.parse(request.body);

  const ong = await createOngUseCase({
    name,
    email,
    whatsapp,
    zipcode,
    address_street,
    address_number,
    ...(address_complement && { address_complement }),
    city,
    uf,
  });

  return reply.status(201).send(ong);
}
