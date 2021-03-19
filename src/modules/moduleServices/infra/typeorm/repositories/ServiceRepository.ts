import { getRepository, Repository } from 'typeorm';

import IServicesRepository from '../../../repositories/IServicesRepository';
import ICreateServiceDTI from '../../../dtos/ICreateServiceDTO';

import Services from '../entities/Services';
import ICreateServiceDTO from '../../../dtos/ICreateServiceDTO';


class ServiceRepository implements IServicesRepository{
    private ormRepository: Repository<Services>;

    constructor() {
      this.ormRepository = getRepository(Services);
    }

    public async findAllServices(): Promise<Services[] | undefined> {
      let services: Services[];

      services = await this.ormRepository.find();

      return services;
    }

    public async findByName(name: string): Promise<Services | undefined> {
        const findService = await this.ormRepository.findOne({
          where: { name },
        });

        return findService;
    }

    public async create({
      name,
      description,
      price,
      date}: ICreateServiceDTO): Promise<Services> {

    const service = this.ormRepository.create({
      name,
      description,
      price,
      date});

    await this.ormRepository.save(service);

    return service;
  }

}

export default ServiceRepository;
