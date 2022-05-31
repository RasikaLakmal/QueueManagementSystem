import {Router} from 'express';
import issuesController from '../controllers/issuesController';
import counterController from '../controllers/CounterController';
import  authMiddleware  from "../middleware/authMiddleware";
import  authCMiddleware  from "../middleware/authCMiddleware";

const router = Router();

router.post('/add',authMiddleware,issuesController.addIssue);
router.get('/all',authCMiddleware,issuesController.getAllIssues);
router.get('/get/:id',authCMiddleware,issuesController.getOneIssues);
router.put('/cancel/:id',authCMiddleware,issuesController.cancelIssue);


router.get('/c',counterController.getCounter);
 router.get('/counterid',authCMiddleware,issuesController.getCounterId)
 router.get('/username',authMiddleware,issuesController.getUserName)

export default router;