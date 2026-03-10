import { prisma } from '@/lib/prisma';

interface CreateOngRequest {
  name: string;
  email: string;
  whatsapp: string;
  zipcode: string;
  address_street: string;
  address_number: string;
  address_complement?: string;
  city: string;
  uf: string;
}

export async function createOngUseCase({
  name,
  email,
  whatsapp,
  zipcode,
  address_street,
  address_number,
  address_complement,
  city,
  uf,
}: CreateOngRequest) {
  const emailAlreadyExists = await prisma.ong.findUnique({
    where: {
      email,
    },
  });

  if (emailAlreadyExists) {
    throw new Error('Email already exists');
  }

  const ong = await prisma.ong.create({
    data: {
      name,
      email,
      whatsapp,
      zipcode,
      address_street,
      address_number,
      address_complement: address_complement || null,
      city,
      uf,
    },
  });

  return ong;
}
