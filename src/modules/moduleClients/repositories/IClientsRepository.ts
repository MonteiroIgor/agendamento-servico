import Client from '../infra/typeorm/entities/Client';
import ICreateClientDTO from '../dtos/ICreateClientDTO';

export default interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<Client>;

  findByCpf(cpf: string): Promise<Client | undefined>;

  findById(id: string): Promise<Client | undefined>;

  insertCredit(credit: number, id: string): Promise<void | undefined>;

  findAllClients(): Promise<Client[] | undefined>;
}
