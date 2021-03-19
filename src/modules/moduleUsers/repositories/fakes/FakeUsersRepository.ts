import { uuid } from 'uuidv4';

import IUsersRepository from '../../../moduleUsers/repositories/IUsersRepository';
import ICreateUserDTO from '../../../moduleUsers/dtos/ICreateUserDTO';

import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async findByUserName(user_name: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.user_name === user_name);

    return findUser;
  }

  public async findByProviderId(provider_id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.provider_id === provider_id);

    return findUser;
  }
}

export default FakeUsersRepository;
