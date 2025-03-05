import jwt, { JwtPayload } from 'jsonwebtoken'
import { WebSocketServer, WebSocket } from 'ws'
import { JWT_SECRET } from '@repo/backend-common/config'
import { prismaClient } from "@repo/db/client"
import { parse } from 'path'




const wss = new WebSocketServer({ port: 8080 })

interface User {
    ws: WebSocket,
    userId: string,
    rooms: string[]
}
//Storing users for state management
const users: User[] = [];

function checkUser(token: string): string | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        if (typeof decoded == "string") {
            return null
        }
        if (!decoded || !decoded.userId) {
            return null
        }
        return decoded.userId;
    } catch (error) {
        return null;
    }
}
wss.on('connection', function connection(ws, request) {
    const url = request.url;
    if (!url) {
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1])
    const token = queryParams.get('token') || "";
    const userId = checkUser(token)

    if (userId == null) {
        ws.close();
        return null;
    }
    //pushing users info in users table
    users.push({
        userId,
        rooms: [],
        ws
    })

    ws.on('message', async function message(data) {
        let parsedData;
        if (typeof data !== "string") {
            parsedData = JSON.parse(data.toString())
        }
        else {
            parsedData = JSON.parse(data)
        }
        // for Joining a Room
        if (parsedData.type === "join_room") {
            const user = users.find(x => x.ws === ws);
            user?.rooms.push(parsedData.roomId);
        }
        // for exiting a joined Room
        if (parsedData.type === "leave_room") {
            const user = users.find(x => x.ws === ws)
            if (!user) {
                return;
            }
            user.rooms = user?.rooms.filter(x => x === parsedData.room)
        }

        // Deleteing Shape Logic
        if(parsedData.type === "delete"){
            const roomId = parsedData.roomId;
            const shapeId = parsedData.shapeId
            console.log("aari shape id :" , shapeId)
            try{
                await prismaClient.shape.delete({
                    where: {id: Number(shapeId)}
                });
                console.log("shape erased with id: ", shapeId);

            }catch(error){
                console.error("Error Erasing Shape", error)
            }

            // Broadcast the delete event to all users in the workspace room
            users.forEach(user=>{
                if(user.rooms.includes(roomId)){
                    user.ws.send(JSON.stringify({
                        type: "delete",
                        shapeId,
                        roomId
                    }))
                }
            })
        }

        // for sending shapes messages
        if (parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;
            //for creating shape events
            try {
                await prismaClient.shape.create({
                    data: {
                        roomId: Number(roomId),
                        message,
                        userId
                    }
                });
                console.log("shape saved in DB ")
                users.forEach(user => {
                    if (user.rooms.includes(roomId)) {
                        user.ws.send(JSON.stringify({
                            type: "chat",
                            message: message,
                            roomId
                        }))
                    }
                })
            } catch (error) {
                console.error("error sending message :", error)
            }

            if(parsedData.type === "update"){
                const roomId = parsedData.roomId;
                const {shape, shapeId} = parsedData;
                try{
                    await prismaClient.shape.update({
                        where: {id: Number(shapeId)},
                        data : {
                            message: JSON.stringify(shape)
                        }
                    })
                    console.log("shape updated in DB")
                    users.forEach(user=> {
                        if(user.rooms.includes(roomId)){
                            user.ws.send(JSON.stringify({
                                type: "update",
                                message: JSON.stringify({shape, shapeId}),
                                roomId
                            }))
                        }
                    })
                } catch(error){
                    console.error("Error Updating Shape :", error)

                }
            }
        }
    });

});