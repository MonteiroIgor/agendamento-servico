import { add } from 'date-fns';
import { EntityRepository, getConnection, Repository } from 'typeorm';

import Client from '../models/Client';

@EntityRepository(Client)
class ClientRepository extends Repository<Client> {
    public async findByCpf(cpf: string): Promise<Client | null> {
        const findClient = await this.findOne({
          where: { cpf },
        });

        return findClient || null;
    }

    public async findById(id: string): Promise<Client | null> {
      const findClient = await this.findOne({
        where: { id },
      });

      return findClient || null;
  }

  public async inserCredit(credit: number, id: string): Promise<void | null>{

    await getConnection()
    .createQueryBuilder()
    .update(Client)
    .set({ credit: credit })
    .where("id = :id", { id: id })
    .execute();
  }

}

export default ClientRepository;
