import { EntityRepository, Repository } from 'typeorm';

import Provider from '../models/Provider';

@EntityRepository(Provider)
class ProviderRepository extends Repository<Provider> {
    public async findByCpf(cpf: string): Promise<Provider | null> {
        const findProvider = await this.findOne({
          where: { cpf },
        });

        return findProvider || null;
    }

    public async findById(id: string): Promise<Provider | null> {
      const findProvider = await this.findOne({
        where: { id },
      });

      return findProvider || null;
  }

}

export default ProviderRepository;
