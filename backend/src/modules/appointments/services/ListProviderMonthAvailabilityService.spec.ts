// import AppError from '../../../shared/errors/AppError';
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
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 9, 13, 11, 0, 0),
      provider_id: 'user',
    });
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 9, 14, 9, 0, 0),
      provider_id: 'user',
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      month: 10,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 12, availability: true },
        { day: 13, availability: false },
        { day: 14, availability: false },
        { day: 14, availability: false },
      ]),
    );
  });
});
