import express, {Router} from 'express';
import { getChats } from '../controllers/chats';

const router:Router = express.Router()

router.get('/:roomId', getChats)

export default router