import {Router} from 'express';
import issuesController from '../controllers/issuesController';
import counterController from '../controllers/CounterController';
import  authMiddleware  from "../middleware/authMiddleware";
import  authCMiddleware  from "../middleware/authCMiddleware";

const router = Router();

router.post('/add',authMiddleware,issuesController.addIssue);
router.get('/all',authCMiddleware,issuesController.getAllIssues);
router.get('/get/:id',authCMiddleware,issuesController.getOneIssues);


router.get('/c',counterController.getCounter);


export default router;