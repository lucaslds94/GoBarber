import AppError from '../../../shared/errors/AppError';

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;

let createAppointmentService: CreateAppointmentService;

describe('Appointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
  });
  it('Should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: '888',
      user_id: '777',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('888');
  });

  it('Should not be able to create appointments at the same time', async () => {
    const appointmentDate = new Date(2020, 7, 9, 17);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '8888',
      user_id: '777',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '8889',
        user_id: '777',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: '8889',
        user_id: '777',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create appointments with the same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: '777',
        user_id: '777',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create appointments outside the time available range', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 11, 7),
        provider_id: 'provider-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 11, 18),
        provider_id: 'provider-id',
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
