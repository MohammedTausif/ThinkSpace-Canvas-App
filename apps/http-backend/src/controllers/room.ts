import { CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";



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

//http://localhost:4000/api/v1/room/:roomId => GET (Req for accessing Rooms using roomId)
export const FetchRooms = async (req: Request, res: Response) => {
    const roomId = req.params.roomId
    try {
        const room = await prismaClient.room.findFirst({
            where: {
                id: Number(roomId)
            }
        })
        res.json({
            room
        })
    }catch(error){
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