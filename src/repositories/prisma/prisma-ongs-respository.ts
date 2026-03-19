import { prisma } from '@/lib/prisma';
import { Prisma } from 'generated/prisma/client';
import { OngsRepository } from '../ongs-repository';

export class PrismaOngsRepository implements OngsRepository {
  async create(data: Prisma.OngCreateInput) {
    const ong = await prisma.ong.create({
      data,
    });

    return ong;
  }

  async findByEmail(email: string) {
    const ong = await prisma.ong.findUnique({
      where: {
        email,
      },
    });

    return ong;
  }
}
