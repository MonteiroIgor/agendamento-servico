import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '../../../services/ListProviderDayAvailabilityService';


export default class ProvidersDayAvailabilityController {

public async index(request: Request, response: Response): Promise<Response> {
  const { provider_id } = request.params;
  const { month, year, day } = request.body;

  const listProviderDayAvailabilityService = container.resolve(ListProviderDayAvailabilityService);

  const availability = await listProviderDayAvailabilityService.execute({
    provider_id,
    month,
    year,
    day
  });

  return response.json(availability);
  };

}
