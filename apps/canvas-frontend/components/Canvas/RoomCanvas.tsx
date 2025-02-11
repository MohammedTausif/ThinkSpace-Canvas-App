"use client"
import { WS_URL } from "@/config";
import { CanvasHTMLAttributes, useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";


export function RoomCanvas(
    {roomId}:{roomId: string
}){
    const [socket, setSocket] = useState<WebSocket | null>(null);
   

    useEffect(()=>{
        const token = localStorage.getItem('token')
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiMThiNTQ5Ny1lYTU1LTQ2NDgtODI3Mi02MDdjZWM4ZjQyZGYiLCJpYXQiOjE3MzkyNzMyNTV9.foSxrrq1KGWfbW0L66Dg406pZD0jnngpL5tpC5qHWBE`)

        ws.onopen=()=>{
            setSocket(ws);
            ws.send(JSON.stringify({
                type : "join_room",
                roomId
            }))
        }
        
    },[])
    
    if(!socket){
        return <div> 
            connecting to server
        </div>
    }

    return <div>
    <Canvas roomId={roomId} socket={socket}></Canvas>
    </div>



}