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
    const appointment = await createAppointmentService.execute({
      date: new Date(),
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

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '8889',
        user_id: '777',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
