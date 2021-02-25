import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import authConfig from '../../../config/auth';

import AppError from '../../../shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import UserRepository from '../infra/typeorm/repositories/UserRepository';
import IUsersRepository from '../repositories/IUsersRepository';


interface IRequest {
  user_name: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject(UserRepository)
    private usersRepository: IUsersRepository
  ){}


  public async execute({ user_name, password }: IRequest): Promise<Response> {
    const user = await this.usersRepository.findByUserName(user_name);

    if(!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };

  };

}

export default AuthenticateUserService;
