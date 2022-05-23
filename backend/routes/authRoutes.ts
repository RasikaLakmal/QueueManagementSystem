import {Router} from 'express';
import authUserController from '../controllers/authUserController'
import authCPController from '../controllers/authCPController'

const router = Router();

router.post('/user/login',authUserController.login);
router.post('/user/register',authUserController.register);
//router.get('/all',authController.getAllUsers);
//router.delete('/delete/:u_email',authController.deleteUsers);





router.post('/cp/login',authCPController.login);
router.post('/cp/register',authCPController.register);


export default router;