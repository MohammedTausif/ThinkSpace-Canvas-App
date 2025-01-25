import express,{ Router } from "express";
import { UserMiddleware } from "../middlewares/UserAuth";
import { CreateRoom, GetRooms } from "../controllers/room";

const router:Router = express.Router()

router.post('/room', UserMiddleware, CreateRoom)
router.get('/room/:slug',GetRooms)

export default router;
