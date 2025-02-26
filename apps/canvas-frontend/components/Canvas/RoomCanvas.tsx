"use client"
import { HTTP_URL, WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";
import axios from "axios";

export  function RoomCanvas(
    {roomId}:{roomId: string
}){
    const [socket, setSocket] = useState<WebSocket | null>(null);
    // const [token, setToken] = useState<any>(null)

    async function FindRoom  (roomId: string){
        const response = await axios.get(`${HTTP_URL}/api/v1/room/${roomId}`)
        const token =await response.data.token
        console.log("response : ", response.data.token)
        localStorage.setItem('token', token)
        return  token
 } 

    
    useEffect(()=>{
        let token;
        if(!localStorage.getItem('token')){
            token =  FindRoom(roomId)
           console.log("token 1 :" , token)
           
       }
        const jwt = localStorage.getItem('token')
        const ws = new WebSocket(`${WS_URL}?token=${jwt || token}`)

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