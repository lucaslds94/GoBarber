import AppError from '../../../shared/errors/AppError';

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('Appointments', () => {
  it('Should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '888',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('888');
  });

  it('Should not be able to create appointments at the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const appointmentDate = new Date(2020, 7, 9, 17);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '8888',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '8889',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
