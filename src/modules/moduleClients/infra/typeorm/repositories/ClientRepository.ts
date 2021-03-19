import ICreateClientDTO from '../../../../../modules/moduleClients/dtos/ICreateClientDTO';
import { getRepository, Repository, getConnection } from 'typeorm';

import IClientsRepository from '../../../repositories/IClientsRepository';

import Client from '../entities/Client';


class ClientRepository implements IClientsRepository{
    private ormRepository: Repository<Client>;

    constructor() {
      this.ormRepository = getRepository(Client);
    }

    public async findAllClients(): Promise<Client[] | undefined> {
      let clients: Client[];

      clients = await this.ormRepository.find();

      return clients;
    }

    public async findByCpf(cpf: string): Promise<Client | undefined> {
        const findClient = await this.ormRepository.findOne({
          where: { cpf },
        });

        return findClient;
    }

    public async findById(id: string): Promise<Client | undefined> {
      const findClient = await this.ormRepository.findOne({
        where: { id },
      });

      return findClient;
  }

  public async insertCredit(credit: number, id: string): Promise<void | undefined>{

    await getConnection()
    .createQueryBuilder()
    .update(Client)
    .set({ credit: credit })
    .where("id = :id", { id: id })
    .execute();
  }

  public async create({
    name,
    cpf,
    email,
    phone,
    dtBirth,
    credit }: ICreateClientDTO): Promise<Client> {

    const client = this.ormRepository.create({
      name,
      cpf,
      email,
      phone,
      dtBirth,
      credit});

     await this.ormRepository.save(client);

     return client;
    }

}

export default ClientRepository;
