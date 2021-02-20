import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import providerRouter from './providers.routes';
import serviceRouter from './service.routes';
import clientsRouter from './clients.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/provider', providerRouter);
routes.use('/services', serviceRouter);
routes.use('/clients', clientsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
