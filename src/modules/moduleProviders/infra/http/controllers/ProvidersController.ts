import { Request, Response } from 'express';
import { parseISO } from 'date-fns'
import { container } from 'tsyringe';

import CreateProviderService from '../../../services/CreateProviderService';
import ListProvidersService from '../../../../moduleProviders/services/ListProvidersService';


export default class ProvidersController {


public async index(request: Request, response: Response): Promise<Response> {
  const except_provider_id = request.user.id;

  const listProviders = container.resolve(ListProvidersService);

  const providers = await listProviders.execute({
    except_provider_id,
  });

  return response.json(providers);
};

public async create(request: Request, response: Response): Promise<Response> {
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
};

}
