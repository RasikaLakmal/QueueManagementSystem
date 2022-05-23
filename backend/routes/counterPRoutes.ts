import {Router} from 'express';
import counterPController from '../controllers/counterPController';
import  authMiddleware  from "../middleware/authCMiddleware";

const router = Router();

//router.post('/add',counterPController.addCP);
router.get('/all',authMiddleware,counterPController.getAllCPs);
//router.delete('/delete/:u_email',authMiddleware,counterPController.deleteCPs);
router.get('/get/:id',authMiddleware,counterPController.getOneCP);
router.put('/update/:id',authMiddleware,counterPController.updateCPs);

router.get('/call',counterPController.getAllCPs);


export default router;