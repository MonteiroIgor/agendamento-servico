import { Router } from 'express';
import ensureAuthenticated from '../../../../moduleUsers/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsContoller = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsContoller.create);
appointmentsRouter.get('/:provider_id/provider-appointments', providerAppointmentsController.index);

export default appointmentsRouter;
