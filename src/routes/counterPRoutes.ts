import {Router} from 'express';
import counterPController from '../controllers/counterPController';

const router = Router();

router.post('/add',counterPController.addCP);
router.get('/all',counterPController.getAllCPs);
router.delete('/delete/:u_email',counterPController.deleteCPs);
router.get('/:id',counterPController.getOneCP);
router.put('/update/:id',counterPController.updateCPs);


export default router;