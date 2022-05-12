import { Router } from 'express';

import ExecmdController from '../controllers/execmd.controller';

const execmdRouter: Router = Router();

execmdRouter.get('/', ExecmdController.runCommand);

export default execmdRouter;
