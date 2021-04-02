import { getRepository, Not, Repository } from 'typeorm';

import IProvidersRepository from '../../../repositories/IProvidersRepository';
import ICreateProviderDTO from '../../../dtos/ICreateProviderDTO';

import Provider from '../entities/Provider';
import IFindAllProvidersDTO from '@modules/moduleProviders/dtos/IFindAllProvidersDTO';


class ProviderRepository implements IProvidersRepository{
    private ormRepository: Repository<Provider>;

    constructor() {
      this.ormRepository = getRepository(Provider);
    }

    public async findByCpf(cpf: string): Promise<Provider | undefined> {
        const findProvider = await this.ormRepository.findOne({
          where: { cpf },
        });

        return findProvider;
    }

    public async findByEmail(email: string): Promise<Provider | undefined> {
      const findProvider = await this.ormRepository.findOne({
        where: { email },
      });

      return findProvider;
  }

    public async findAllProviders({ except_provider_id }: IFindAllProvidersDTO): Promise<Provider[] | undefined> {
      let providers: Provider[];

      if(except_provider_id) {
        providers = await this.ormRepository.find({
          where: {
            id: Not(except_provider_id),
          }
        });
     } else {
       providers = await this.ormRepository.find();
     }

     return providers;
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
