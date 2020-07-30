import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProvidersMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('Should be able to list the month availability from providers', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 9, 13, 8, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 9, 13, 9, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 9, 13, 10, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 9, 13, 11, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 9, 13, 12, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 9, 13, 13, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 9, 13, 14, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 9, 13, 15, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 9, 13, 16, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 9, 13, 17, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 9, 14, 10, 0, 0),
      provider_id: 'user',
      user_id: 'user',
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      month: 10,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 13, available: false },
        { day: 14, available: true },
      ]),
    );
  });
});
