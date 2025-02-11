import express,{ Router } from "express";
import { UserMiddleware } from "../middlewares/UserAuth";
import { CreateRoom, GetRooms, joinRoom, removeUser } from "../controllers/room";

const router:Router = express.Router()

router.post('/room', UserMiddleware, CreateRoom)
router.get('/room/:slug',GetRooms)
router.post('/room/join/:roomId',UserMiddleware,joinRoom)
router.put('/room/update', UserMiddleware, removeUser)
export default router;
