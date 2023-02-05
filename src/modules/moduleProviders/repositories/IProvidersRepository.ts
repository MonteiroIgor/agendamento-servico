import Provider from '../infra/typeorm/entities/Provider';
import ICreateProviderDTO from  '../dtos/ICreateProviderDTO';

export default interface IProvidersRepository {
  findAllProvider(): Promise<Provider[]>;

  create(data: ICreateProviderDTO): Promise<Provider>;

  findByCpf(cpf: string): Promise<Provider | undefined>;

  findById(id: string): Promise<Provider | undefined>;
}
