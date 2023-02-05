import { getRepository, Repository } from 'typeorm';

import IProvidersRepository from '../../../repositories/IProvidersRepository';
import ICreateProviderDTO from '../../../dtos/ICreateProviderDTO';

import Provider from '../entities/Provider';


class ProviderRepository implements IProvidersRepository{
    private ormRepository: Repository<Provider>;

    constructor() {
      this.ormRepository = getRepository(Provider);
    }

    public async findAllProvider(): Promise<Provider[]> {
      const findProvider = await this.ormRepository.find()

      return findProvider;
  }

    public async findByCpf(cpf: string): Promise<Provider | undefined> {
        const findProvider = await this.ormRepository.findOne({
          where: { cpf },
        });

        return findProvider;
    }

    public async findById(id: string): Promise<Provider | undefined> {
      const findProvider = await this.ormRepository.findOne({
        where: { id },
      });

      return findProvider ;

    }
    public async create({
      name,
      cpf,
      email,
      phone,
      dtBirth }: ICreateProviderDTO): Promise<Provider> {

    const provider = this.ormRepository.create({
      name,
      cpf,
      email,
      phone,
      dtBirth});

    await this.ormRepository.save(provider);

    return provider;

  }

}

export default ProviderRepository;
