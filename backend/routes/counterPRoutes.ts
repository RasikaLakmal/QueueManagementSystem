import {Router} from 'express';
import counterPController from '../controllers/counterPController';
import  authMiddleware  from "../middleware/authCMiddleware";
import counterController from '../controllers/CounterController';

const router = Router();

//counter person routes

//router.post('/add',counterPController.addCP);
router.get('/all',authMiddleware,counterPController.getAllCPs);
//router.delete('/delete/:u_email',authMiddleware,counterPController.deleteCPs);
router.get('/get/:id',authMiddleware,counterPController.getOneCP);
router.put('/update/:id',authMiddleware,counterPController.updateCPs);

//counter routes

//router.get('/call',counterPController.getAllCPs);
router.put('/counter/close',authMiddleware, counterController.closeCounter); 
router.get('/queuenum',authMiddleware,counterController.queueNum)
router.post('/doneandnxt/:id',authMiddleware,counterController.doneNNext)
router.put('/doneissue',authMiddleware,counterController.doneIssue)



export default router;