import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '../../../repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '../../../dtos/ICreateAppointmentDTO';


import Appointment from '../entities/Appointment';

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
    }

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
