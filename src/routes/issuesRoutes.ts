import {Router} from 'express';
import issuesController from '../controllers/issuesController';

const router = Router();

router.post('/add',issuesController.addIssue);
router.get('/all',issuesController.getAllIssues);
//router.delete('/delete/:u_email',issuesController.deleteIssues);
router.get('/:id',issuesController.getOneIssue);
router.put('/update/:id',issuesController.updateIssues);


export default router;