import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '../../../repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '../../../dtos/ICreateAppointmentDTO';


import Appointment from '../entities/Appointment';
import IFindAllInMonthFromProviderDTO from '@modules/moduleAppointments/dtos/IFindAllInMonthFromProvidersDTO';
import IFindAllInDayFromProviderDTO from '@modules/moduleAppointments/dtos/IFindAllInDayFromProvidersDTO';

class AppointmentsRepository implements IAppointmentsRepository{
    private ormRepository: Repository<Appointment>;

    constructor() {
      this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
          where: { date },
        });

        return findAppointment;
    };

    public async findAllInMonthFromProviders({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
      const parsedMonth = String(month).padStart(2, '0');

      const appoinments = await this.ormRepository.find({
        where: {
          provider_id,
          date: Raw(dateFieldName =>
              `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
            ),
        }
      });

      return appoinments;
    };

    public async findAllInDayFromProviders({ provider_id, month, year, day }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
      const parsedMonth = String(month).padStart(2, '0');
      const parsedDay = String(day).padStart(2, '0');

      const appoinments = await this.ormRepository.find({
        where: {
          provider_id,
          date: Raw(dateFieldName =>
              `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
            ),
        }
      });

      return appoinments;
    };

    public async create({
      date,
      provider_id,
      service_id,
      service_name,
      advancePayment,
      advance_payment,
      remainder_payment,
      price,
      status,
      client_id,
      client_name }: ICreateAppointmentDTO): Promise<Appointment> {

      const appointment = this.ormRepository.create({
        date,
        provider_id,
        service_id,
        service_name,
        advancePayment,
        advance_payment,
        remainder_payment,
        price,
        status,
        client_id,
        client_name});

      await this.ormRepository.save(appointment);

      return appointment;
    }

}

export default AppointmentsRepository;
