import { startOfHour} from 'date-fns'
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import Provider from '../models/Provider';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import ProviderRepository from '../repositories/ProviderRepository';
import ClientRepository from '../repositories/ClientRepository';
import Client from '../models/Client';

import AppError from '../errors/AppError';

interface Request {
    date: Date;
    provider_id: string;
    service_id: string;
    service_name: string;
    advancePayment: boolean;
    advance_payment: number;
    remainder_payment: number;
    price: number;
    status: string;
    client_id: string;
    client_name: string;
}

class CreateAppointmentService {
    public async execute(
      {date, client_id, client_name, service_id, provider_id, service_name, price, advancePayment, advance_payment, remainder_payment, status}: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const providerRepository = getCustomRepository(ProviderRepository);
    const clientRepository = getCustomRepository(ClientRepository);

    remainder_payment = (price - advance_payment);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    const checkProvider = await providerRepository.findById(provider_id);
    const checkClient = await clientRepository.findById(client_id);

    if (findAppointmentInSameDate) {
        throw new AppError('This appointment is already booked')
    }
    if (checkProvider && checkClient) {

    const appointment = appointmentsRepository.create({
      date: appointmentDate,
      client_id,
      client_name,
      provider_id,
      service_id,
      service_name,
      advancePayment,
      advance_payment,
      remainder_payment,
      price,
      status
    });

    await appointmentsRepository.save(appointment);
    await clientRepository.inserCredit(advance_payment, client_id)

    return appointment;

  } else {
    throw new AppError('This provider or client not is registred')
   }
  }
}

export default CreateAppointmentService;
