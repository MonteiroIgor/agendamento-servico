import { getCustomRepository, getRepository } from 'typeorm';

import Client from '../models/Client';
import ClientRepository from '../repositories/ClientRepository';

import AppError from '../errors/AppError';

interface Request {
    name: string;
    cpf: string;
    email: string;
    phone: string;
    dtBirth: Date;
    credit: number;
}

class CreateClientService {
    public async execute({name, cpf, email, phone, dtBirth, credit}: Request): Promise<Client> {
    const clientRepository = getCustomRepository(ClientRepository);

    const clientCheck = await clientRepository.findByCpf(cpf);

    if (clientCheck) {
        throw new AppError('This Client is already existis')
    }

    const client = clientRepository.create({
      name,
      cpf,
      email,
      phone,
      dtBirth,
      credit,
    });

    await clientRepository.save(client);

    return client;
    }
}

export default CreateClientService;
