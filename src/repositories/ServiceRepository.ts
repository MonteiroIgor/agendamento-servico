import { EntityRepository, Repository } from 'typeorm';

import Services from '../models/Services';

@EntityRepository(Services)
class ServiceRepository extends Repository<Services> {
    public async findByName(name: string): Promise<Services | null> {
        const findService = await this.findOne({
          where: { name },
        });

        return findService || null;
    }

}

export default ServiceRepository;
