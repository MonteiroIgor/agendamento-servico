import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import { parseISO } from 'date-fns'

import CreateAppointmentService from '../../../services/CreateAppointmentService';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';

import ensureAuthenticated from '../../../../moduleUsers/infra/http/middlewares/ensureAuthenticated';
import { container } from 'tsyringe';


const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);


appointmentsRouter.get('/', async (request, response) => {
    const appointments = getCustomRepository(AppointmentsRepository);

    return response.json(appointments);
})

appointmentsRouter.post('/', async (request, response) => {
        const { date, client_id, client_name, provider_id, service_id, service_name, advancePayment, price, advance_payment, remainder_payment, status } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({
          date: parsedDate, client_id, client_name, provider_id, service_id, service_name, price, advancePayment, advance_payment, remainder_payment, status
        });

        return response.json(appointment);
});


export default appointmentsRouter;
