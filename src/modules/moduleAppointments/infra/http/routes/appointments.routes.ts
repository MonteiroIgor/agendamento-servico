import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../moduleUsers/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsContoller = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', celebrate({
  [Segments.BODY]: {
    client_name: Joi.string().required(),
    client_id: Joi.string().uuid().required(),
    date: Joi.date().required(),
    provider_id: Joi.string().uuid().required(),
    service_id: Joi.string().uuid().required(),
    service_name: Joi.string().required(),
    advancePayment: Joi.boolean().required(),
    advance_payment: Joi.number(),
    remainder_payment: Joi.number(),
    price: Joi.number().required(),
    status: Joi.string().required()
  }
}),appointmentsContoller.create);
appointmentsRouter.get('/:provider_id/provider-appointments', providerAppointmentsController.index);

export default appointmentsRouter;
