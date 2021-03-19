import { Request, Response } from 'express';
import { parseISO } from 'date-fns'
import { container } from 'tsyringe';

import CreateClientService from '../../../services/CreateClientService';
import ListAllClientService from '../../../services/ListAllClientsServices';

export default class ClientsController {

  public async index(request: Request, response: Response): Promise<Response> {

    const listClients = container.resolve(ListAllClientService);

    const clients = await listClients.execute();

    return response.json(clients);
  };


  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      cpf,
      email,
      phone,
      dtBirth,
      credit } = request.body;

    const createClient = container.resolve(CreateClientService);

    const client = await createClient.execute({
      name,
      cpf,
      email,
      phone,
      dtBirth,
      credit,
    })

    return response.json(client);
  }

}
