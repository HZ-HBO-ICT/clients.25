import Express, { Router } from 'express';
import clientsController from './controllers/clientsController.ts';
const router: Router = Express.Router();

// Router sends all requests to '/clients' route to be handled by clientsController
router.use('/clients',clientsController);

export default router;
