import express, {Router} from 'express';
import { deleteShape, getChats } from '../controllers/chats';

const router:Router = express.Router()

router.get('/:roomId', getChats)
router.delete('/delete', deleteShape)

export default router