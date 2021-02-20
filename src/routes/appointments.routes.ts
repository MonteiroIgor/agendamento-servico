import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);


appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
})

appointmentsRouter.post('/', async (request, response) => {
        const { date, client_id, client_name, provider_id, service_id, service_name, advancePayment, price, advance_payment, remainder_payment, status } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
          date: parsedDate, client_id, client_name, provider_id, service_id, service_name, price, advancePayment, advance_payment, remainder_payment, status
        });

        return response.json(appointment);
});


export default appointmentsRouter;
