import {Router} from 'express';
import issuesController from '../controllers/issuesController';
import counterController from '../controllers/CounterController';
import  authMiddleware  from "../middleware/authMiddleware";

const router = Router();

router.post('/add',authMiddleware,issuesController.addIssue);
router.get('/all',authMiddleware,issuesController.getAllIssues);
//router.delete('/delete/:u_email',issuesController.deleteIssues);
router.get('get/:id',authMiddleware,issuesController.getOneIssue);
router.put('/update/:id',authMiddleware,issuesController.updateIssues);


router.get('/c',counterController.getCounter);


export default router;