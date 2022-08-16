import { container } from 'tsyringe';

import IAppointmentsRepository from '../../modules/moduleAppointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '../../modules/moduleAppointments/infra/typeorm/repositories/AppointmentsRepository';

import IClientsRepository from '../../modules/moduleClients/repositories/IClientsRepository';
import ClientRepository from '../../modules/moduleClients/infra/typeorm/repositories/ClientRepository';

import IProvidersRepository from '../../modules/moduleProviders/repositories/IProvidersRepository';
import ProviderRepository from '../../modules/moduleProviders/infra/typeorm/repositories/ProviderRepository';

import IServicesRepository from '../../modules/moduleServices/repositories/IServicesRepository';
import ServicesRepository from '../../modules/moduleServices/infra/typeorm/repositories/ServiceRepository';

import IUsersRepository from '../../modules/moduleUsers/repositories/IUsersRepository';
import UserRepository from '../../modules/moduleUsers/infra/typeorm/repositories/UserRepository';




container.registerSingleton<IUsersRepository>(
  'UserRepository',
  UserRepository,
)

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
)

container.registerSingleton<IClientsRepository>(
  'ClientRepository',
  ClientRepository,
)

container.registerSingleton<IProvidersRepository>(
  'ProviderRepository',
  ProviderRepository,
)

container.registerSingleton<IServicesRepository>(
  'ServicesRepository',
  ServicesRepository,
)


// container.registerSingleton<IUserTokensRepository>(
//   'UserTokensRepository',
//   UserTokensRepository,
// )

// container.registerSingleton<INotificationsRepository>(
//   'NotificationsRepository',
//   NotificationsRepository,

// )
