import { uuid } from 'uuidv4';
import { isEqual, getMonth, getDate, getYear } from 'date-fns';

import IAppointmentsRepository from '../../../moduleAppointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '../../../moduleAppointments/dtos/ICreateAppointmentDTO';


import Appointment from '../../infra/typeorm/entities/Appointment';
import IFindAllInMonthFromProviderDTO from '@modules/moduleAppointments/dtos/IFindAllInMonthFromProvidersDTO';
import IFindAllInDayFromProviderDTO from '@modules/moduleAppointments/dtos/IFindAllInDayFromProvidersDTO';

class AppointmentsRepository implements IAppointmentsRepository{
    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
      const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date));

      return findAppointment;
    };

    public async findAllInMonthFromProviders({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
      const appoinments = await this.appointments.filter(appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
        );

      return appoinments;
    };

    public async findAllInDayFromProviders({ provider_id, month, year, day }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
      const appoinments = await this.appointments.filter(appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year &&
        getDate(appointment.date) === day,
        );

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

      const appointment = new Appointment();

      Object.assign(appointment, {
        id: uuid(),
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
        client_name })


        this.appointments.push(appointment);

        return appointment;

    }

}

export default AppointmentsRepository;
