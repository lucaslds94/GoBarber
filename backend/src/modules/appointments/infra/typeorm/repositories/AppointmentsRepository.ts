import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '../../../repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '../../../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProvidersDTO from '../../../dtos/IFindAllInMonthFromProvidersDTO';
import IFindAllInDayFromProvidersDTO from '../../../dtos/IFindAllInDayFromProvidersDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date,
      },
    });
    return findAppointment || undefined;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProvidersDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = ${parsedMonth}-${year}`,
        ),
      },
    });
    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProvidersDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = ${parsedDay}-${parsedMonth}-${year}`,
        ),
      },
    });
    return appointments;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
