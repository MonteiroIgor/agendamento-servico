import { Router } from 'express';

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
providerRouter.post('/', providersController.create);
providerRouter.get('/:provider_id/day-availability', providersDayAvailabilityController.index);
providerRouter.get('/:provider_/month-availability', providersMonthAvailabilityController.index);


export default providerRouter;
