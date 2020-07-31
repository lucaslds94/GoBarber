import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '../../../services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { day, month, year } = req.body;
    const { provider_id } = req.params;

    const dayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availability = await dayAvailability.execute({
      day,
      month,
      year,
      provider_id,
    });

    return res.json(availability);
  }
}
