import { Router } from 'express';
import ensureAuthenticated from '../../../../moduleUsers/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsContoller = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsContoller.create);
//appointmentsRouter.get('/')

export default appointmentsRouter;
