import User from '../infra/typeorm/entities/User';

import AppError from '../../../shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { SupportInfo } from 'prettier';


interface IRequest {
  user_id: string;
  user_name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

  ){}

  public async execute({ user_id, user_name, email,old_password, password }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if(!user) {
      throw new AppError('User not found');
    }


    const userWithUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user_id) {
      throw new AppError('E-mail already in use.')
    }

    user.user_name = user_name;
    user.email = email;

    if(password && !old_password) {
      throw new AppError('You need to inform the old password to set a new password.')
    }

    if(password && old_password) {
      const checkoldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password
      );

      if(!checkoldPassword) {
        throw new AppError('Old password does not match.')
      }


      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }

}

export default UpdateProfileService;
