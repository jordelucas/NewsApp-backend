import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { InvitationController } from './controllers/InvitationController';
import { AuthenticationController } from './controllers/AuthenticationController';

const router = Router();

const userController = new UserController();
const invitationController = new InvitationController();
const authencicationController = new AuthenticationController();

router.post('/users', userController.create);
router.post('/invitation', invitationController.create);
router.get('/invitation/:id', invitationController.validade);
router.post('/authentication', authencicationController.authenticate);

export { router };
