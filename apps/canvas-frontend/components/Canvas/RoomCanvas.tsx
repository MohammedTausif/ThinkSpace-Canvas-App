"use client"
import { HTTP_URL, WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function RoomCanvas(
    { roomId }: { roomId: string }
) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const router = useRouter()
    const [room, setRoom] = useState(false)
    // const [token, setToken] = useState<string>("")

    async function FindRoom(roomId: string) {
        const response = await axios.get(`${HTTP_URL}/api/v1/room/${roomId}`)
        const token = await response.data.token
        localStorage.setItem('token', token)
        return token
    }
    const checkRoom = async (roomId: string) => {
        const room = await axios.get(`${HTTP_URL}/api/v1/room/${roomId}`)
        console.log(room)
        console.log("req reached here")
        if (!room.data.room ) {
            // return router.push('/')
            setRoom(false)
        }
        else if(room.data.room){
            setRoom(true)
        }
    }

    useEffect(() => {
        checkRoom(roomId)
    }, [roomId])

    useEffect(() => {
        let token;
        if (!localStorage.getItem('token')) {
            token = FindRoom(roomId)
            console.log("token 1 :", token)

        }
        const jwt = localStorage.getItem('token')
        const ws = new WebSocket(`${WS_URL}?token=${jwt || token}`)

        ws.onopen = () => {
            setRoom(true)
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId
            }))

        }

    }, [roomId])

    if (!socket) {
        return <div>
            connecting to server
        </div>
    }

    if(!room){
        return <div className="h-screen flex justify-center  items-center text-2xl font-medium  gap-5">No Room Exist
        <br />
            <Link href="/">  <button className="bg-blue-600 text-white cursor-pointer rounded-md p-2">Click here for redirect</button></Link>
        </div>
    }

    return <div>
        <Canvas roomId={roomId} socket={socket} />
    </div>



}