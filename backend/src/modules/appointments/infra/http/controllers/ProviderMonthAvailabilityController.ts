import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '../../../services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { month, year } = req.body;
    const { provider_id } = req.params;

    const monthAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const availability = await monthAvailability.execute({
      month,
      year,
      provider_id,
    });

    return res.json(availability);
  }
}
