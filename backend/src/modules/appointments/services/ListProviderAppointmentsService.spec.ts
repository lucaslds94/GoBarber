import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to list the appoitments from a provider on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 9, 14, 10, 0, 0),
      provider_id: 'provider_id',
      user_id: 'user_id',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date(2020, 9, 14, 12, 0, 0),
      provider_id: 'provider_id',
      user_id: 'user_id',
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider_id',
      day: 14,
      month: 10,
      year: 2020,
    });

    expect(appointments).toEqual(
      expect.arrayContaining([appointment1, appointment2]),
    );
  });
});
