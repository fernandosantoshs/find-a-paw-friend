import { OngsRepository } from '@/repositories/ongs-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface CreateOngUseCaseRequest {
  name: string;
  email: string;
  whatsapp: string;
  zipcode: string;
  address_street: string;
  address_number: string;
  address_complement?: string | null;
  city: string;
  uf: string;
}
export class CreateOngUseCase {
  constructor(private ongsRepository: OngsRepository) {}

  async execute({
    name,
    email,
    whatsapp,
    zipcode,
    address_street,
    address_number,
    address_complement,
    city,
    uf,
  }: CreateOngUseCaseRequest) {
    const emailAlreadyExists = await this.ongsRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const ong = await this.ongsRepository.create({
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

    return ong;
  }
}
