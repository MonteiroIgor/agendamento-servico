import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeProvidersRepository from '../../moduleProviders/repositories/fakes/FakeProvidersRepository';
import FakeClientsRepository from '../../moduleClients/repositories/fakes/FakeClientsRepository';

import CreateAppointmentService from './CreateAppointmentService';
import CreateClienteService from '../../moduleClients/services/CreateClientService';
import CreateProviderService from '../../moduleProviders/services/CreateProviderService';
import { create } from 'handlebars';
import AppError from '../../../shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeProvidersRepository: FakeProvidersRepository;
let fakeClientsRepository: FakeClientsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeProvidersRepository = new FakeProvidersRepository();
    fakeClientsRepository = new FakeClientsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository, fakeProvidersRepository,fakeClientsRepository
    );
  });
  it('should be able to create a new appoinment', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 10, 13),
      provider_id: '135465',
      service_id: "12349878",
      service_name: "Corte Simples",
      advancePayment: true,
      advance_payment: 10,
      remainder_payment: 10,
      price: 20,
      status: "A",
      client_id: 'client-id',
      client_name: "Cliente Name",
    });


  expect(appointment).toHaveProperty('id');
  expect(appointment.provider_id).toBe('135465');

  });

  it('should bot be able to create two appoinments on the same time', async () => {
    const appoinmentDate = new Date(2020, 4, 10, 11)

    await expect(
      fakeAppointmentsRepository.create({
        date: appoinmentDate,
        provider_id: '135465',
        service_id: "12349878",
        service_name: "Corte Simples",
        advancePayment: true,
        advance_payment: 10,
        remainder_payment: 10,
        price: 20,
        status: "A",
        client_id: 'client-id',
        client_name: "Cliente Name",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      fakeAppointmentsRepository.create({
        date: new Date(2020, 4, 10, 11),
        provider_id: '135465',
        service_id: "12349878",
        service_name: "Corte Simples",
        advancePayment: true,
        advance_payment: 10,
        remainder_payment: 10,
        price: 20,
        status: "A",
        client_id: 'client-id',
        client_name: "Cliente Name",
      }),
  );
});

it('should not be able to create an appointment with same user as provider', async () => {
  jest.spyOn(Date, 'now').mockImplementationOnce(() => {
    return new Date(2020, 4, 10, 12).getTime();
  });

  await expect(
    fakeAppointmentsRepository.create({
      date: new Date(2021, 4, 10, 11),
      provider_id: '135465',
      service_id: "12349878",
      service_name: "Corte Simples",
      advancePayment: true,
      advance_payment: 10,
      remainder_payment: 10,
      price: 20,
      status: "A",
      client_id: 'client-id',
      client_name: "Cliente Name",
    }),
);
});

it('should not be able to create an appointment before 8am an after 5pm', async () => {
  jest.spyOn(Date, 'now').mockImplementationOnce(() => {
    return new Date(2021, 2, 17, 12).getTime();
  });

  await expect(
    fakeAppointmentsRepository.create({
      date: new Date(2021, 2, 18, 7),
      provider_id: '135465',
      service_id: "12349878",
      service_name: "Corte Simples",
      advancePayment: true,
      advance_payment: 10,
      remainder_payment: 10,
      price: 20,
      status: "A",
      client_id: 'client-id',
      client_name: "Cliente Name",
    }),
);

await expect(
  fakeAppointmentsRepository.create({
    date: new Date(2021, 2, 18, 19),
    provider_id: '135465',
    service_id: "12349878",
    service_name: "Corte Simples",
    advancePayment: true,
    advance_payment: 10,
    remainder_payment: 10,
    price: 20,
    status: "A",
    client_id: 'client-id',
    client_name: "Cliente Name",
  }),
);

});

});
