import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProvidersDTO from '../dtos/IFindAllInMonthFromProvidersDTO';
import IFindAllInDayFromProvidersDTO from '../dtos/IFindAllInDayFromProvidersDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProvidersDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllInDayFromProvidersDTO,
  ): Promise<Appointment[]>;
}
