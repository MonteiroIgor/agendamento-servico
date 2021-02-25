import { startOfHour } from 'date-fns';

import Services from "../infra/typeorm/entities/Services";
import ServiceRepository from '../infra/typeorm/repositories/ServiceRepository';

import AppError from '../../../shared/errors/AppError';
import IServicesRepository from '../repositories/IServicesRepository';
import { inject, injectable } from 'tsyringe';



interface IRequest {
  name: string;
  description: string;
  price: number;
  date: Date;

}

@injectable()
class CreateServicesService {
  constructor(
    @inject(ServiceRepository)
    private serviceRepository: IServicesRepository) {}

  public async execute({ name, description, price, date }: IRequest): Promise<Services> {

    const checkServiceExists = await this.serviceRepository.findByName(name);

    const serviceDate = startOfHour(date);

    if(checkServiceExists){
      throw new AppError('Already registered service.');
    }

    const service = this.serviceRepository.create({
      name,
      description,
      price,
      date: serviceDate,
    });

    return service;

  }
}

export default CreateServicesService;
