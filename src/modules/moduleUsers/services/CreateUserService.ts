import User from "../infra/typeorm/entities/User";
import { inject, injectable } from "tsyringe";

import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../../moduleUsers/providers/HashProvider/models/IHashProvider';
import IProvidersRepository from '../../moduleProviders/repositories/IProvidersRepository';
import UserRepository from "../infra/typeorm/repositories/UserRepository";
import ProviderRepository from "../../moduleProviders/infra/typeorm/repositories/ProviderRepository";
import ICacheProvider from "../../../shared/container/providers/CacheProvider/models/ICacheProvider";



interface IRequest {
  provider_id?: string;
  email: string;
  password: string;
  user_name: string;

}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,

    @inject(ProviderRepository)
    private providersRepository: IProvidersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    ){}

  public async execute({ email, password, user_name}: IRequest): Promise<User> {

    const checkUsersExists = await this.usersRepository.findByUserName(user_name);
    const checkProviderExists = await this.providersRepository.findByEmail(email);


    if(checkProviderExists?.id || checkUsersExists){
      throw new AppError('Already registered user.');
    }


    const hashPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      provider_id: checkProviderExists?.id,
      email,
      password: hashPassword,
      user_name,
    });


    return user;

  }
}

export default CreateUserService;
