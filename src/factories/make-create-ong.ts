import { PrismaOngsRepository } from '@/repositories/prisma/prisma-ongs-respository';
import { CreateOngUseCase } from '@/use-cases/create-ong';

export function makeCreateOngUseCase() {
  const ongsRepository = new PrismaOngsRepository();
  const useCase = new CreateOngUseCase(ongsRepository);

  return useCase;
}
