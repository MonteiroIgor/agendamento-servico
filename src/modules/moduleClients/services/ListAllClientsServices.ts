import { startOfHour } from 'date-fns';

import Client from "../infra/typeorm/entities/Client";
import ClientRepository from '../infra/typeorm/repositories/ClientRepository';

import AppError from '../../../shared/errors/AppError';
import IClientsRepository from '../repositories/IClientsRepository';
import { inject, injectable } from 'tsyringe';



@injectable()
class ListAllClientService {
  constructor(
    @inject(ClientRepository)
    private clientRepository: IClientsRepository) {}

  public async execute(): Promise<Client[] | undefined> {

    const clients = await this.clientRepository.findAllClients();

    if(!clients){
      throw new AppError('Not exists clients registry.');
    }

    return clients;

  }
}

export default ListAllClientService;
