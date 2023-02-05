import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateProviderService from '../../../services/CreateProviderService';
import { container } from 'tsyringe';

import ProviderRepository from '../../typeorm/repositories/ProviderRepository';


const providerRouter = Router();


providerRouter.get('/', async (request, response) => {
  const providerRepository = getCustomRepository(ProviderRepository);
  const provider = await providerRepository.findAllProvider();

  return response.json(provider);
})


providerRouter.post('/', async (request, response) => {
      const {
        name,
        cpf,
        email,
        phone,
        dtBirth } = request.body;


      const createProvider = container.resolve(CreateProviderService);

      const provider = await createProvider.execute({
        name,
        cpf,
        email,
        phone,
        dtBirth
      })

      return response.json(provider);
});


export default providerRouter;
