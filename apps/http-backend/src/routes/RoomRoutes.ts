import express,{ Router } from "express";
import { UserMiddleware } from "../middlewares/UserAuth";
import { CreateRoom,  FetchRooms, getRoomByAdminId, GetRooms, UpdateRoom, } from "../controllers/room";

const router:Router = express.Router()

router.post('/room', UserMiddleware, CreateRoom)
router.post('/room/update', UserMiddleware, UpdateRoom)
router.get('/rooms',UserMiddleware,getRoomByAdminId)
router.get('/room/:roomId',FetchRooms)
// router.post('/room/join/:roomId',UserMiddleware,joinRoom)

export default router;
