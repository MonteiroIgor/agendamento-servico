import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '../../../repositories/IUsersRepository';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

import User from '../entities/User';


class UserRepository implements IUsersRepository{
    private ormRepository: Repository<User>;

    constructor() {
      this.ormRepository = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined>{
      const user = await this.ormRepository.findOne(id);

      return user;

    }

    public async findByEmail(email: string): Promise<User | undefined>{
      const user = await this.ormRepository.findOne({
        where: { email }
      });

      return user;
    }

    public async findByUserName(user_name: string): Promise<User | undefined>{
      const user = await this.ormRepository.findOne({
        where: { user_name }
      });

      return user;
    }

    public async findByProviderId(provider_id: string): Promise<User | undefined> {
        const findUser = await this.ormRepository.findOne({
          where: { provider_id },
        });

        return findUser || undefined;
    }

    public async create({
      provider_id,
      email,
      password,
      user_name }: ICreateUserDTO): Promise<User> {


    const user = this.ormRepository.create({
      provider_id,
      email,
      password,
      user_name});

    await this.ormRepository.save(user);

    return user;
    }

    public async save(user: User): Promise<User>{
      return this.ormRepository.save(user);
    }
}

export default UserRepository;
