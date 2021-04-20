import Provider from '../infra/typeorm/entities/Provider';
import ICreateProviderDTO from  '../dtos/ICreateProviderDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IProvidersRepository {
  findAllProviders(date: IFindAllProvidersDTO): Promise<Provider[]>;

  create(data: ICreateProviderDTO): Promise<Provider>;

  findByCpf(cpf: string): Promise<Provider | undefined>;

  findById(id: string): Promise<Provider | undefined>;

  findByEmail(email: string): Promise<Provider | undefined>;

}
