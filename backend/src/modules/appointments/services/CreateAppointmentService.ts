import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';

import AppError from '../../../shared/errors/AppError';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';

interface IRequest {
  user_id: string;
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject(AppointmentsRepository)
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      date,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      user_id,
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
