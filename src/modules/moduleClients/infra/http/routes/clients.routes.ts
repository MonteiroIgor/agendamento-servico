import { Router } from 'express';
import ClientRepository from '../../typeorm/repositories/ClientRepository';
import CreateClientService from '../../../services/CreateClientService';
import { container } from 'tsyringe';

import { getCustomRepository } from 'typeorm';


const clientsRouter = Router();

clientsRouter.get('/', async (request, response) => {
  const clientRepository = getCustomRepository(ClientRepository);
  const client = await clientRepository.findAll();

  return response.json(client);
})

clientsRouter.post('/', async (request, response) => {
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

});


export default clientsRouter;
