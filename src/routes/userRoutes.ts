import {Router} from 'express';
import userController from '../controllers/userController';
import  authMiddleware  from "../middleware/authMiddleware";

const router = Router();

router.post('/add',userController.addUser);
router.get("/all",authMiddleware,userController.getAllUsers);
router.delete('/delete/:u_email',userController.deleteUsers);
router.get('/:id',userController.getOneUser);
router.put('/update/:id',userController.updateUsers);


export default router;