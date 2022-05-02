import {Router} from 'express';
import postController from '../controllers/postController';

const router = Router();

router.post('/post',postController.postPost);

export default router;