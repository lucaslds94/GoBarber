import { Router } from 'express';

import AppointmentsController from '../controllers/AppointmentsController';
import ProvidersAppointmentsController from '../controllers/ProvidersAppointmentsController';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providersAppointmentsController = new ProvidersAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/me', providersAppointmentsController.index);

export default appointmentsRouter;
