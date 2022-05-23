import {Router} from 'express';
import userController from '../controllers/userController';
import  authMiddleware  from "../middleware/authMiddleware";

const router = Router();

//router.post('/add',userController.addUser);
router.get("/all",authMiddleware,userController.getAllUsers);
router.delete('/delete/:u_email',authMiddleware,userController.deleteUsers);
router.get('/get/:id',authMiddleware,userController.getOneUser);
router.put('/update/:id',authMiddleware,userController.updateUsers);


export default router;