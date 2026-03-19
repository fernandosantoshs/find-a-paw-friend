import { PrismaOngsRepository } from '@/repositories/prisma/prisma-ongs-respository';
import { CreateOngUseCase } from '@/use-cases/create-ong';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
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

  try {
    const ongsRepository = new PrismaOngsRepository();
    const createOngUseCase = new CreateOngUseCase(ongsRepository);

    await createOngUseCase.execute({
      name,
      email,
      whatsapp,
      zipcode,
      address_street,
      address_number,
      address_complement: address_complement || null,
      city,
      uf,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(201).send();
}
