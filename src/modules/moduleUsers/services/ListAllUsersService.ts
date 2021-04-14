import { startOfHour } from 'date-fns';


import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import UserRepository from '../infra/typeorm/repositories/UserRepository';
import User from '../infra/typeorm/entities/User';



@injectable()
class ListAllUsersService {
  constructor(
    @inject(UserRepository)
    private usersRepository: IUsersRepository) {}

  public async execute(): Promise<User[] | undefined> {

    const users = await this.usersRepository.findAllUsers();

    if(!users){
      throw new AppError('Not exists users registry.');
    }

    return users;

  }
}

export default ListAllUsersService;
