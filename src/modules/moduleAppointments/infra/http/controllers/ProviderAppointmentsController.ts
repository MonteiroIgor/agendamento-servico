import { Request, Response } from 'express';
import { parseISO } from 'date-fns'
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '../../../../../modules/moduleAppointments/services/ListProviderAppointmentsService';



export default class ProviderAppointmentsController {

  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year, day } = request.body;

    const listProviderAppointmentsService = container.resolve(ListProviderAppointmentsService);

    const appointments = await listProviderAppointmentsService.execute({
      provider_id,
      month,
      year,
      day
    });

    return response.json(appointments);
    };


}
