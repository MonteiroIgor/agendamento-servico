import User from "../infra/typeorm/entities/User";
import { hash } from 'bcryptjs'

import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IProvidersRepository from '../../moduleProviders/repositories/IProvidersRepository';
import { inject, injectable } from "tsyringe";
import UserRepository from "../infra/typeorm/repositories/UserRepository";
import ProviderRepository from "../../moduleProviders/infra/typeorm/repositories/ProviderRepository";



interface IRequest {
  provider_id: string;
  email: string;
  password: string;
  user_name: string;

}

@injectable()
class CreateUserService {
  constructor(
    @inject(UserRepository)
    private usersRepository: IUsersRepository,
    @inject(ProviderRepository)
    private providersRepository: IProvidersRepository,
    ){}

  public async execute({ provider_id, email, password, user_name}: IRequest): Promise<User> {

    const checkUsersExists = await this.usersRepository.findByProviderId(provider_id);
    const checkProviderExists = await this.providersRepository.findById(provider_id);

    console.log(checkProviderExists)
    if(checkUsersExists){
      throw new AppError('Already registered user.');
    }
    if (checkProviderExists === null) {
      throw new AppError('Provider not Exist.')
    }

    const hashPassword = await hash(password, 6);

    const user = await this.usersRepository.create({
      provider_id,
      email,
      password: hashPassword,
      user_name,
    });


    return user;

  }
}

export default CreateUserService;
