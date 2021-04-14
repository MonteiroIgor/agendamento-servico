import { uuid } from 'uuidv4';

import IProvidersRepository from '../../../moduleProviders/repositories/IProvidersRepository';
import ICreateProviderDTO from '../../../moduleProviders/dtos/ICreateProviderDTO';

import Provider from '../../../moduleProviders/infra/typeorm/entities/Provider';
import IFindAllProvidersDTO from '../../../../modules/moduleProviders/dtos/IFindAllProvidersDTO';

class ProviderRepository implements IProvidersRepository{
    private providers: Provider[] = [];

    public async findByCpf(cpf: string): Promise<Provider | undefined> {
        const findProvider = this.providers.find(provider => provider.cpf === cpf);

        return findProvider;
    }

    public async findByEmail(email: string): Promise<Provider | undefined> {
      const findProvider = this.providers.find(provider => provider.email === email);

      return findProvider;
  }


    public async findById(id: string): Promise<Provider | undefined> {
      const findProvider = this.providers.find(provider => provider.id === id);

      return findProvider ;

    }

    public async findAllProviders({except_provider_id}: IFindAllProvidersDTO): Promise<Provider[] | undefined> {
       let providers = this.providers;

       if(except_provider_id) {
         providers = this.providers.filter(provider => provider.id !== except_provider_id);

       return providers;
      }
    }

    public async create({
      name,
      cpf,
      email,
      phone,
      dtBirth }: ICreateProviderDTO): Promise<Provider> {

      const provider = new Provider();

      Object.assign(provider, { id: uuid() })

      provider.name = name;
      provider.cpf = cpf;
      provider.email = email;
      provider.phone = phone;
      provider.dtBirth = dtBirth;

      this.providers.push(provider);

    return provider;

  }

}

export default ProviderRepository;
