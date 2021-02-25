import Client from '../infra/typeorm/entities/Client';
import ClientRepository from '../infra/typeorm/repositories/ClientRepository';

import AppError from '../../../shared/errors/AppError';
import IClientsRepository from '../repositories/IClientsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    name: string;
    cpf: string;
    email: string;
    phone: string;
    dtBirth: Date;
    credit: number;
}

@injectable()
class CreateClientService {
    constructor(
      @inject(ClientRepository)
      private clientRepository: IClientsRepository){}


    public async execute({name, cpf, email, phone, dtBirth, credit}: IRequest): Promise<Client> {

    const clientCheck = await this.clientRepository.findByCpf(cpf);

    if (clientCheck) {
        throw new AppError('This Client is already existis')
    }

    const client = await this.clientRepository.create({
      name,
      cpf,
      email,
      phone,
      dtBirth,
      credit,
    });

    return client;
    }
}

export default CreateClientService;
