import jwt, { } from 'jsonwebtoken'
import { WebSocketServer, WebSocket } from 'ws'
import { JWT_SECRET } from '@repo/backend-common/config'
import { prismaClient } from "@repo/db/client"




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

        // for chatting / sending messafe
        if (parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;
            try {
                // if (!roomId || isNaN(Number(roomId))) {
                //     console.error("Invalid roomId:", roomId);
                //     return; // Stop execution if roomId is invalid 
                // }
                
                await prismaClient.shape.create({
                    data: {
                        roomId: Number(roomId),
                        message,
                        userId
                    }
                });
                console.log("shape saved in DB ")
            
            } catch (error) {
                console.error("error sending message :", error)
            }
            users.forEach(user => {
                if (user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId
                    }))
                }
            })
        }
    });

});