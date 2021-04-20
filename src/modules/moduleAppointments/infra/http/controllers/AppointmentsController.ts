import { Request, Response } from 'express';
import { parseISO } from 'date-fns'
import { container } from 'tsyringe';

import CreateAppointmentService from '../../../services/CreateAppointmentService';



export default class AppointmentsController {

  // public async index(request: Request, response: Response): Promise<Response> {
  //   const except_provider_id = request.user.id;

  //   const listProviders = container.resolve(ListProvidersService);

  //   const providers = await listProviders.execute({
  //     except_provider_id,
  //   });

  //   return response.json(providers);
  // };

public async create(request: Request, response: Response): Promise<Response> {
  const { date, client_id, client_name, provider_id, service_id, service_name, advancePayment, price, advance_payment, remainder_payment, status } = request.body;

  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({
    date: date, client_id, client_name, provider_id, service_id, service_name, price, advancePayment, advance_payment, remainder_payment, status
  });

  return response.json(appointment);
  };

}
