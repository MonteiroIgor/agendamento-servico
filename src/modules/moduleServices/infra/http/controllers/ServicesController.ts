import { Request, Response } from 'express';
import { parseISO } from 'date-fns'
import { container } from 'tsyringe';

import CreateServiceService from '../../../services/CreateServiceService';
import ListAllServicesService from '../../../services/ListAllServicesService';



export default class ServicesController {
public async index(request: Request, response: Response): Promise<Response> {

    const listServices = container.resolve(ListAllServicesService);

    const providers = await listServices.execute();

    return response.json(providers);
  };



public async create(request:Request , response: Response): Promise<Response> {
  const {
    name,
    description,
    price,
    date } = request.body;


  const parsedDate = parseISO(date);

  const createService = container.resolve(CreateServiceService);

  const user = await createService.execute({
    name,
    description,
    price,
    date: parsedDate,
  })
  return response.json(user);
  };

}
