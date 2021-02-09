import { EntityRepository, Repository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
    public async findByProviderId(provider_id: string): Promise<User | null> {
        const findUser = await this.findOne({
          where: { provider_id },
        });

        return findUser || null;
    }

}

export default UserRepository;
