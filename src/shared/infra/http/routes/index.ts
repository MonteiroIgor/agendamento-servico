import { Router } from 'express';
import appointmentsRouter from '../../../../modules/moduleAppointments/infra/http/routes/appointments.routes';
import usersRouter from '../../../../modules/moduleUsers/infra/http/routes/users.routes';
import providerRouter from '../../../../modules/moduleProviders/infra/http/routes/providers.routes';
import serviceRouter from '../../../../modules/moduleServices/infra/http/routes/service.routes';
import clientsRouter from '../../../../modules/moduleClients/infra/http/routes/clients.routes';
import sessionsRouter from '../../../../modules/moduleUsers/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/provider', providerRouter);
routes.use('/services', serviceRouter);
routes.use('/clients', clientsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
