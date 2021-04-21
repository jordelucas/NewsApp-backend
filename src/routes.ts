import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { InvitationController } from './controllers/InvitationController';
import { AuthenticationController } from './controllers/AuthenticationController';
import { NewsController } from './controllers/NewsController';
import { UserNewsController } from './controllers/UserNewsController';

const router = Router();

const userController = new UserController();
const invitationController = new InvitationController();
const authenticationController = new AuthenticationController();
const newsController = new NewsController();
const userNewsController = new UserNewsController();

router.post('/users', userController.create);
router.post('/invitation', invitationController.create);
router.get('/invitation/:id', invitationController.validade);
router.post('/authentication', authenticationController.authenticate);
router.post('/news', newsController.create);
router.get('/news', newsController.show);
router.get('/news/:id', newsController.showByID);
router.post('/read', userNewsController.create);

export { router };
