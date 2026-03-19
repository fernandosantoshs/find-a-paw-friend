import { Ong, Prisma } from 'generated/prisma/client';

export interface OngsRepository {
  create(data: Prisma.OngCreateInput): Promise<Ong>;
  findByEmail(email: string): Promise<Ong | null>;
}
