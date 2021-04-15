import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { InvitationController } from './controllers/InvitationController';

const router = Router();

const userController = new UserController();
const invitationController = new InvitationController();

router.post('/users', userController.create);
router.post('/invitation', invitationController.create);
router.get('/invitation/:id', invitationController.validade);

export { router };
