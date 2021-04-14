import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listproviderAppointment: ListProviderAppointmentsService;

describe('List Provider Appointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listproviderAppointment = new ListProviderAppointmentsService(fakeAppointmentsRepository);

  });
  it('should be able to list appointment on a specific day', async () => {
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
      date: new Date(2021, 4, 14, 8, 0, 0),
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
      date: new Date(2021, 4, 14, 10, 0, 0),
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
      date: new Date(2021, 4, 14, 12, 0, 0),
    });


    const availability = await listproviderAppointment.execute({
      provider_id: 'user',
      day: 14,
      year: 2021,
      month: 4,
    });

    expect(availability).toEqual([appointment1, appointment2, appointment3]);
  });
});
