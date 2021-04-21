import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { InvitationController } from './controllers/InvitationController';
import { AuthenticationController } from './controllers/AuthenticationController';
import { NewsController } from './controllers/NewsController';

const router = Router();

const userController = new UserController();
const invitationController = new InvitationController();
const authenticationController = new AuthenticationController();
const newsController = new NewsController();

router.post('/users', userController.create);
router.post('/invitation', invitationController.create);
router.get('/invitation/:id', invitationController.validade);
router.post('/authentication', authenticationController.authenticate);
router.post('/news', newsController.create);

export { router };
