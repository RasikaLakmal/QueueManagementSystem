import {Router} from 'express';
import authUserController from '../controllers/authUserController'
import authCPController from '../controllers/authCPController'

const router = Router();

//auth user
router.post('/user/login',authUserController.login);
router.post('/user/register',authUserController.register);



//auth counter person
router.post('/cp/login',authCPController.login);
router.post('/cp/register',authCPController.register);


export default router;