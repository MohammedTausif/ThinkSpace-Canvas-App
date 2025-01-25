import { CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";

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