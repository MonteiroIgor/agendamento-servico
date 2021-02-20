import { getCustomRepository } from 'typeorm';

import User from "../models/User";
import UserRepository from '../repositories/UserRepository';
import ProviderRepository from '../repositories/ProviderRepository';
import { hash } from 'bcryptjs'

import AppError from '../errors/AppError';



interface Request {
  provider_id: string;
  email: string;
  password: string;
  user_name: string;

}

class CreateUserService {
  public async execute({ provider_id, email, password, user_name}: Request): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const providersRepository = getCustomRepository(ProviderRepository);

    const checkUsersExists = await usersRepository.findByProviderId(provider_id);
    const checkProviderExists = await providersRepository.findById(provider_id);

    console.log(checkProviderExists)
    if(checkUsersExists){
      throw new AppError('Already registered user.');
    }
    if (checkProviderExists === null) {
      throw new AppError('Provider not Exist.')
    }

    const hashPassword = await hash(password, 6);

    const user = usersRepository.create({
      provider_id,
      email,
      password: hashPassword,
      user_name,
    });

    await usersRepository.save(user);

    return user;

  }
}

export default CreateUserService;
