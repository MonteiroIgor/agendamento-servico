import { Router } from 'express';
import { getCustomRepository } from 'typeorm';


import ProviderRepository from '../repositories/ProviderRepository';
import CreateProviderService from '../services/CreateProviderService';


const providerRouter = Router();


providerRouter.get('/', async (request, response) => {
  const providerRepository = getCustomRepository(ProviderRepository);
  const provider = await providerRepository.find();

  return response.json(provider);
})


providerRouter.post('/', async (request, response) => {
    try {
      const {
        name,
        cpf,
        email,
        phone,
        dtBirth } = request.body;

      const createProvider = new CreateProviderService();

      const provider = await createProvider.execute({
        name,
        cpf,
        email,
        phone,
        dtBirth
      })

      return response.json(provider);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});


export default providerRouter;
