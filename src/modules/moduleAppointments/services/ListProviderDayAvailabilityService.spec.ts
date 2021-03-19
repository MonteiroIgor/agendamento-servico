import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listDayAvailability: ListProviderDayAvailabilityService;

describe('List Provider Day Availability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listDayAvailability = new ListProviderDayAvailabilityService(fakeAppointmentsRepository);

  });
  it('should be able to list the Day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      service_id: "12349878",
      service_name: "Corte Simples",
      advancePayment: true,
      advance_payment: 10,
      remainder_payment: 10,
      price: 20,
      status: "A",
      client_id: 'client-id',
      client_name: "Cliente Name",
      date: new Date(2021, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      service_id: "12349878",
      service_name: "Corte Simples",
      advancePayment: true,
      advance_payment: 10,
      remainder_payment: 10,
      price: 20,
      status: "A",
      client_id: 'client-id',
      client_name: "Cliente Name",
      date: new Date(2021, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      service_id: "12349878",
      service_name: "Corte Simples",
      advancePayment: true,
      advance_payment: 10,
      remainder_payment: 10,
      price: 20,
      status: "A",
      client_id: 'client-id',
      client_name: "Cliente Name",
      date: new Date(2021, 4, 20, 11, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });


    const availability = await listDayAvailability.execute({
      provider_id: 'user',
      year: 2021,
      month: 4,
      day: 20,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: true },
      { hour: 10, available: false },
      { hour: 11, available: false },
    ]))

    // expect(availability).toEqual([appointment1, appointment2, appointment3]);
  });

});
