import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ClientRepository from '../repositories/ClientRepository';
import CreateClientService from '../services/CreateClientService';

const clientsRouter = Router();

clientsRouter.get('/', async (request, response) => {
  const clientRepository = getCustomRepository(ClientRepository);
  const client = await clientRepository.find();

  return response.json(client);
})

clientsRouter.post('/', async (request, response) => {
  try {
    const {
      name,
      cpf,
      email,
      phone,
      dtBirth,
      credit } = request.body;

    const createClient = new CreateClientService();

    const client = await createClient.execute({
      name,
      cpf,
      email,
      phone,
      dtBirth,
      credit,
    })

    return response.json(client);
  }catch(err) {
    return response.status(400).json({ error: err.message })
  }

});


export default clientsRouter;
