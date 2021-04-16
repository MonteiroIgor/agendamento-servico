import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../moduleUsers/infra/http/middlewares/ensureAuthenticated';
import CreateProviderService from '../../../services/CreateProviderService';
import { container } from 'tsyringe';
import ProvidersController from '../controllers/ProvidersController';
import ProvidersDayAvailabilityController from '../../../../moduleAppointments/infra/http/controllers/ProvidersDayAvailabilityController';
import ProvidersMonthAvailabilityController from '../../../../moduleAppointments/infra/http/controllers/ProvidersMonthAvailabilityController';

const providerRouter = Router();
const providersController = new ProvidersController();
const providersDayAvailabilityController = new ProvidersDayAvailabilityController();
const providersMonthAvailabilityController = new ProvidersMonthAvailabilityController();

providerRouter.use(ensureAuthenticated);

providerRouter.get('/', providersController.index);
providerRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    cpf: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    dtBirth: Joi.date().required(),
  }
}),providersController.create);
providerRouter.get('/:provider_id/day-availability', celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required(),
  }
}),providersDayAvailabilityController.index);
providerRouter.get('/:provider_id/month-availability', celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required(),
  }
}),providersMonthAvailabilityController.index);


export default providerRouter;
