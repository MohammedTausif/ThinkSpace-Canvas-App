import { CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import { error } from "console";
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
                role: ["admin"],
                members : {},
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

export const GetRooms = async (req: Request, res: Response) => {
    const slug = req.params.slug
    try {
        const room = await prismaClient.room.findFirst({
            where: {
                slug
            }
        })
        res.json({
            room
        })
    }catch(error){
        console.error("Error Getting Rooms :", error)
    }

}

//http://localhost:4000/api/v1/room/join/:roomId => POST (joinig room)
export const joinRoom = async (req: Request, res: Response)=>{
    const roomId = req.params.roomId ;
    const userId = req.userId

    try{
        const room = await prismaClient.room.update({
            where:{
                id: Number(roomId)
            },
            data: {
                members : {
                    connect: [{id: userId}]
                }
            }
        })
        res.json({
            message: "User Joined Successfully .",
            Room_Name: room.slug
        })

    }catch(e){
        console.log(e)
      res.json({
        message: "Error Joining Room",
        error: e
      })
    }

}
//http:localhost:4000/ap1/v1/room/update => PUT ()  
export const removeUser = async(req: Request, res:Response)=>{
    const memberId = req.body.memberId;
    const roomId = req.body.roomId
    const adminId = req.body.userId;

// first check if the requesting user is the admin of that room
try{
   const room =  await prismaClient.room.findUnique({
        where: {
            id: roomId
        },
        select: {adminId :adminId }
    });
    if(!room){
        res.json({
            message: "Room not found"
        })
    }
    if(room?.adminId !==adminId){
        res.json({
            message: "Unauthorized: Only the admin can remove members."
        })
    }

    // Now if the user is admin he can remove the members of that room

    const removeUser = await prismaClient.room.update({
        where: {
            id: roomId
        },
        data : {
            members : {
                disconnect : [{id: memberId}]
            }
        }
    });
    res.json({
        message: "User removed from the room successfully ."
    })

}catch(error){
    res.json({
        message: "Error removing user",
        error: error
    })
}

}