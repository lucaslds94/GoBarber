import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '../../../services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { provider_id, date } = req.body;

    const user_id = req.user.id;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      user_id,
      provider_id,
      date: parsedDate,
    });

    return res.json(appointment);
  }
}
