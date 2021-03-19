import Provider from '../../moduleProviders/infra/typeorm/entities/Provider';

import AppError from '../../../shared/errors/AppError';
import IProvidersRepository from '../../moduleProviders/repositories/IProvidersRepository';
import { inject, injectable } from 'tsyringe';


interface IRequest {
  except_provider_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,

  ){}

  public async execute({ except_provider_id }: IRequest): Promise<Provider[] | undefined> {
    const providers = await this.providersRepository.findAllProviders({
      except_provider_id: except_provider_id,
    });

    return providers;
  }

}

export default ListProvidersService;
