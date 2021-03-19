import { startOfHour } from 'date-fns';

import Services from "../infra/typeorm/entities/Services";
import ServiceRepository from '../infra/typeorm/repositories/ServiceRepository';

import AppError from '../../../shared/errors/AppError';
import IServicesRepository from '../repositories/IServicesRepository';
import { inject, injectable } from 'tsyringe';



@injectable()
class ListAllServicesService {
  constructor(
    @inject(ServiceRepository)
    private serviceRepository: IServicesRepository) {}

  public async execute(): Promise<Services[] | undefined> {

    const services = await this.serviceRepository.findAllServices();

    if(!services){
      throw new AppError('Not exists services registry.');
    }

    return services;

  }
}

export default ListAllServicesService;
