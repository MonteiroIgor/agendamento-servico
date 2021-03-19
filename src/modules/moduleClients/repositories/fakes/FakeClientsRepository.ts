import { uuid } from 'uuidv4';

import IClientsRepository from '../../../moduleClients/repositories/IClientsRepository';
import ICreateClientDTO from '../../../moduleClients/dtos/ICreateClientDTO';

import Client from '../../infra/typeorm/entities/Client';


class ClientRepository implements IClientsRepository{
    private clients: Client[] = [];


    // public async findAll(): Promise<Client | undefined> {
    //   const findClients = this.clients.find(client => client.id !== null);

    //   return findClients;
    // }

    public async findByCpf(cpf: string): Promise<Client | undefined> {
        const findClient = this.clients.find(client => client.cpf === cpf);

        return findClient;
    }

    public async findById(id: string): Promise<Client | undefined> {
      const findClient = this.clients.find(client => client.id === id);

      return findClient;
    }

  public async create({
    name,
    cpf,
    email,
    phone,
    dtBirth,
    credit }: ICreateClientDTO): Promise<Client> {

    const client = new Client();

    Object.assign(client, { id: uuid() })

    client.name = name;
    client.cpf = cpf;
    client.email = email;
    client.phone = phone;
    client.dtBirth = dtBirth;
    client.credit = credit;

    return client;
    }



    public async insertCredit(credit: number, id: string): Promise<void | undefined> {
        credit;
        id;
    }

}

export default ClientRepository;
