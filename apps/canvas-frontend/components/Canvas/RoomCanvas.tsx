"use client"
import { HTTP_URL, WS_URL } from "@/config";
import { CanvasHTMLAttributes, useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";
import FindRoom from './FindRoom'
import axios from "axios";

export  function RoomCanvas(
    {roomId}:{roomId: string
}){
    const [socket, setSocket] = useState<WebSocket | null>(null);

    
    useEffect(()=>{
        let token;
        
        if(!localStorage.getItem('token')){
            const FindRoom =async (roomId: string)=>{

                const response = await axios.get(`${HTTP_URL}/api/v1/room/${roomId}`)
                const token = response.data.token
                console.log("response : ", response.data.token)
                const tooken = localStorage.setItem('token', token)
                return token
        
            }
             
            
        }

             token = localStorage.getItem('token')
        
       
        const ws = new WebSocket(`${WS_URL}?token=${token}`)

        ws.onopen=()=>{
            setSocket(ws);
            ws.send(JSON.stringify({
                type : "join_room",
                roomId
            }))
           
        }
        
    },[roomId])
    
    if(!socket){
        return <div> 
            connecting to server
        </div>
    }

    return <div>
    <Canvas roomId={roomId} socket={socket}/>
    </div>



}