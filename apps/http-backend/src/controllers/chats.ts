import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";

export const getChats= async (req:Request, res:Response)=>{

    try{
        const roomId = Number (req.params.roomId)
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy :{
                id: "desc"
            },
            take: 500
        });
        res.json({
            messages
        })
        
    }catch(error){
        console.log(error)
        res.json({
            messages : []
        })

    }

}