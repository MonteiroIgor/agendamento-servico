import Provider from '../../moduleProviders/infra/typeorm/entities/Provider';

import AppError from '../../../shared/errors/AppError';
import IProvidersRepository from '../../moduleProviders/repositories/IProvidersRepository';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '../../../shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '@modules/moduleUsers/infra/typeorm/entities/User';


interface IRequest {
  except_provider_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ){}

  public async execute({ except_provider_id }: IRequest): Promise<Provider[] | undefined> {
    let providers = await this.cacheProvider.recover<Provider[]>(`providers-list:${except_provider_id}`,);

    if (!providers) {
      providers = await this.providersRepository.findAllProviders({
        except_provider_id: except_provider_id,
      });

      console.log('Query foi feita');

      await this.cacheProvider.save(`providers-list:${except_provider_id}`, providers)
    }

    return providers;
  }

}

export default ListProvidersService;
