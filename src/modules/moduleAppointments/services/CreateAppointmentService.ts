import { startOfHour, isBefore, getHours } from 'date-fns'

import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from '../../../shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IProvidersRepository from '../../moduleProviders/repositories/IProvidersRepository';
import IClientsRepository from '../../moduleClients/repositories/IClientsRepository';
import { inject, injectable } from 'tsyringe'
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';
import ProviderRepository from '../../../modules/moduleProviders/infra/typeorm/repositories/ProviderRepository';
import ClientRepository from '../../moduleClients/infra/typeorm/repositories/ClientRepository';


interface IRequest {
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

@injectable()
class CreateAppointmentService {
    constructor(
      @inject(AppointmentsRepository)
      private appointmentsRepository: IAppointmentsRepository,
      @inject(ProviderRepository)
      private providerRepository: IProvidersRepository,
      @inject(ClientRepository)
      private clientRepository: IClientsRepository,
      ) {}


    public async execute(
      {date, client_id, client_name, service_id, provider_id, service_name, price, advancePayment, advance_payment, remainder_payment, status}: IRequest): Promise<Appointment> {


    remainder_payment = (price - advance_payment);

    const appointmentDate = startOfHour(date);

    if(isBefore(appointmentDate, Date.now())){
      throw new AppError("You can't create an appointment on apast date.");
    }

    // if(user_id === provider_id) {
    //   throw new AppError("You can't create an appointment with yourself.");
    // }

    if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17){
      throw new AppError('You can only create appointments between 8am and 5pm');

    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

    const checkProvider = await this.providerRepository.findById(provider_id);
    const checkClient = await this.clientRepository.findById(client_id);

    if (findAppointmentInSameDate) {
        throw new AppError('This appointment is already booked')
    }
    if (checkProvider && checkClient) {

    const appointment = await this.appointmentsRepository.create({
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

    await this.clientRepository.insertCredit(advance_payment, client_id)

    return appointment;

  } else {
    throw new AppError('This provider or client not is registred')
   }
  }
}

export default CreateAppointmentService;
