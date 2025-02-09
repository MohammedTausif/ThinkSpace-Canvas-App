import { CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";

//http://localhost:4000/api/v1/room => POST (Req for Creating a Room)
export const CreateRoom = async (req: Request, res: Response) => {

    const parsedData = CreateRoomSchema.safeParse(req.body)

    const userId = req.userId
    if (!parsedData.success) {
        console.log(parsedData.error)
        return
    }
    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data?.name,
                adminId: userId as string,
            }
        })
        res.json({
            roomId: room.id
        })
    } catch (e) {
        res.status(411).json({
            message: "Room already exists with this name"
        })

    }

}

//http://localhost:4000/api/v1/room/:slug => GET (Req for accessing Rooms)

export const GetRooms = async(req:Request, res:Response)=>{
    const slug = req.params.slug
    const room = await prismaClient.room.findFirst({
        where: {
            slug
        }
    })
    res.json({
        room
    })

}