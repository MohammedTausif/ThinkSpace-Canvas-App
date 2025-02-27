import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import jwt from 'jsonwebtoken'
import { Request, Response } from "express";
import { error } from "console";
import { json } from "stream/consumers";


//http://localhost:4000/api/v1/rooms
export const getRoomByAdminId = async (req: Request, res: Response) => {
    const userId = req.userId
    try {
        const rooms = await prismaClient.room.findMany({
            where: {
                adminId: userId
            },
            include: {
                admin: {
                    select: {
                        id: true,
                        name: true,
                        photo: true
                    },
                },
            },
        })

        res.status(200).json({
            message: "Rooms fetched Successfully",
            status: 'success',
            rooms: rooms,
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: "Error Fetching Rooms",
            error: error,
        })
    }
}

//http://localhost:4000/api/v1/room => POST (Req for Creating a Room)
export const CreateRoom = async (req: Request, res: Response) => {

    const parsedData = CreateRoomSchema.safeParse(req.body)
    const userId = req.userId;

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
            message: "Room already exists with this name",
            error: e
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
    } catch (error) {
        console.error("Error Getting Rooms :", error)
    }

}

//http//localhost:4000/api/v1/room/update  => POST 
export const UpdateRoom = async (req: Request, res: Response) => {
    const { name, roomId } = req.body;
    const userId = req.userId;

    try {
        const response = await prismaClient.room.update({
            where: {
                id: roomId,
                adminId: userId
            },
            data: {
                slug: name
            }
        })
        res.status(200).json({
            message: "Successfully Updated Name",
            name: response.slug
        })
    } catch (error) {
        res.json({
            message: "Error Updating Room",
            error: error
        })
    }
}

//http//localhost:4000/api/v1/room/delete  => POST
export const DeleteRoom = async (req: Request, res: Response) => {
   const roomId = req.body.roomId;
   const userId = req.userId;
   debugger;
   try{
   if(!roomId && isNaN(roomId)){
    res.status(403).json({
        message: "No a number or room id is missing"
    })

   }
    const response = await prismaClient.room.delete({
        where: {
            id: roomId,
            adminId: userId
        }
    })
    console.log("response", response)
    res.status(200).json({
        message: "deleted successfully"
    })
  
   }catch(error){
    console.error(error)
    res.json({
        message: "Error deleting room",
        error: error,
    })

   }
}

//http://localhost:4000/api/v1/room/:roomId => GET (Req for accessing Rooms using roomId)
export const FetchRooms = async (req: Request, res: Response) => {
    const roomId = req.params.roomId
    try {
        const room = await prismaClient.room.findUnique({
            where: {
                id: Number(roomId)
            }
        })

        const token = await jwt.sign({
            id: room?.adminId
        }, JWT_SECRET)

        res.json({
            room: room,
            token: token
        })
    } catch (error) {
        console.error("Error Getting Rooms :", error)
    }

}



// End points for the features to be added in future  ====>

//http://localhost:4000/api/v1/room/join/:roomId => POST (joinig room)
// export const joinRoom = async (req: Request, res: Response)=>{
//     const roomId = req.params.roomId ;
//     const userId = req.userId
// 
//     try{
//         const room = await prismaClient..create({
//             data: {
//                 userId :String (userId) ,
//                 roomId: Number(roomId),
//                 role: "MEMBER",
//             }
//         })
//         res.json({
//             message: "User Joined Successfully .",
//             Room_Name: room
//         })
// 
//     }catch(e){
//         console.log(e)
//       res.json({
//         message: "Room Doesn't Exist",
//         error: e
//       })
//     }
// 
// }
//http:localhost:4000/ap1/v1/room/update => PUT ()  
// export const removeUser = async(req: Request, res:Response)=>{
//     const memberId = req.body.memberId;
//     const roomId = req.body.roomId
//     const adminId = req.userId;
// 
// // first check if the requesting user is the admin of that room
// try{
//    const room =  await prismaClient.room.findUnique({
//         where: {
//             id: roomId
//         },
//         select: {adminId :true }
//     });
//     if(!room){
//         res.json({
//             message: "Room not found"
//         })
//     }
//     if(room?.adminId !==adminId){
//         res.json({
//             message: "Unauthorized: Only the admin can remove members."
//         })
//     }
// 
//     // Now if the user is admin he can remove the members of that room
// 
//     const removeUser = await prismaClient.roomMember.deleteMany({
//         where:{
//             roomId: Number(roomId),
//             userId: String(memberId)
//         }
//     });
//     
//     res.json({
//         message: "User removed from the room successfully ."
//     })
// 
// }catch(error){
//     console.error(error)
//     res.json({
//         message: "Error removing user",
//         error: error
//     })
// }
// 
// }