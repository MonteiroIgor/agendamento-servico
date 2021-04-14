import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';


interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
};


@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ){}

  public async execute({
     provider_id,
     day,
     year,
     month
    }: IRequest): Promise<Appointment[]> {
      const appointments = await this.appointmentsRepository.findAllInDayFromProviders({
        provider_id,
        day,
        year,
        month
      });

      return appointments;
  }

}

export default ListProviderAppointmentsService;