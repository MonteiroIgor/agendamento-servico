import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listMonthAvailability: ListProviderMonthAvailabilityService;

describe('List Provider Month Availability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listMonthAvailability = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);

  });
  it('should be able to list the month availability from provider', async () => {
    const appointment3 = await fakeAppointmentsRepository.create({
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

    const appointment2 = await fakeAppointmentsRepository.create({
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

    const appointment1 = await fakeAppointmentsRepository.create({
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
      date: new Date(2021, 4, 21, 8, 0, 0),
    });


    const availability = await listMonthAvailability.execute({
      provider_id: 'user',
      year: 2021,
      month: 4,
    });

    // expect(availability).toEqual(expect.arrayContaining([
    //   { day: 20, available: true },
    //   { day: 16, available: false },
    //   { day: 17, available: false },
    //   { day: 18, available: false },
    // ]))

    // expect(availability).toEqual([appointment1, appointment2, appointment3]);
  });

});
