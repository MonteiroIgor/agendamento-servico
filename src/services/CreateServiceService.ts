import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Services from "../models/Services";
import ServiceRepository from '../repositories/ServiceRepository';



interface Request {
  name: string;
  description: string;
  price: number;
  date: Date;

}

class CreateServicesService {
  public async execute({ name, description, price, date }: Request): Promise<Services> {
    const serviceRepository = getCustomRepository(ServiceRepository);

    const checkServiceExists = await serviceRepository.findByName(name);

    const serviceDate = startOfHour(date);

    if(checkServiceExists){
      throw new Error('Already registered service.');
    }

    const service = serviceRepository.create({
      name,
      description,
      price,
      date: serviceDate,
    });

    await serviceRepository.save(service);

    return service;

  }
}

export default CreateServicesService;
