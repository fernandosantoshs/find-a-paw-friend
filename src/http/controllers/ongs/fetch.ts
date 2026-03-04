import { prisma } from '@/lib/prisma';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const ongs = await prisma.ong.findMany({
    omit: { id: true, created_at: true, updated_at: true },
  });

  return reply.status(200).send(ongs);
}
