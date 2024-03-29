import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '../../../services/ListProviderMonthAvailabilityService';


export default class ProvidersMonthAvailabilityController {

public async index(request: Request, response: Response): Promise<Response> {
  const { provider_id } = request.params;
  const { month, year } = request.body;

  const listProviderMonthAvailabilityService = container.resolve(ListProviderMonthAvailabilityService);

  const availability = await listProviderMonthAvailabilityService.execute({
    provider_id,
    month,
    year
  });

  return response.json(availability);
  };

}
