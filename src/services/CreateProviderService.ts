import { getCustomRepository, getRepository } from 'typeorm';

import Provider from '../models/Provider';
import ProviderRepository from '../repositories/ProviderRepository';

import AppError from '../errors/AppError';

interface Request {
    name: string;
    cpf: string;
    email: string;
    phone: string;
    dtBirth: Date
}

class CreateProviderService {
    public async execute({name, cpf, email, phone, dtBirth}: Request): Promise<Provider> {
    const providerRepository = getCustomRepository(ProviderRepository);

    const providerCheck = await providerRepository.findByCpf(cpf);

    if (providerCheck) {
        throw new AppError('This provider is already existis')
    }

    const provider = providerRepository.create({
      name,
      cpf,
      email,
      phone,
      dtBirth
    });

    await providerRepository.save(provider);

    return provider;
    }
}

export default CreateProviderService;
