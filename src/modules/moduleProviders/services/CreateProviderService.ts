import Provider from '../infra/typeorm/entities/Provider';
import ProviderRepository from '../infra/typeorm/repositories/ProviderRepository';

import AppError from '../../../shared/errors/AppError';
import IProvidersRepository from '../repositories/IProvidersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    name: string;
    cpf: string;
    email: string;
    phone: string;
    dtBirth: Date
}

@injectable()
class CreateProviderService {
    constructor(
      @inject(ProviderRepository)
      private providerRepository: IProvidersRepository) {}

    public async execute({name, cpf, email, phone, dtBirth}: IRequest): Promise<Provider> {

    const providerCheck = await this.providerRepository.findByCpf(cpf);

    if (providerCheck) {
        throw new AppError('This provider is already existis')
    }

    const provider = this.providerRepository.create({
      name,
      cpf,
      email,
      phone,
      dtBirth
    });

    return provider;
    }
}

export default CreateProviderService;
