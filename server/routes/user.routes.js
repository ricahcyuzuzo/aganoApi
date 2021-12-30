import Router from 'express';
import UserController from '../controllers/user.controller';

const routes = Router();

routes.post('/member', UserController.addMember);
routes.get('/member', UserController.getMembers);
routes.post('/user', UserController.addUser);
routes.post('/login', UserController.login);

export default routes;
