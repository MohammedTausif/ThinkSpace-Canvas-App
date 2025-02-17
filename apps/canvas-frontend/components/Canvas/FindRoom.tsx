import axios from 'axios'
import { HTTP_URL, WS_URL } from "../../config";
import { useState } from 'react'

import { useRouter } from "next/navigation";

export default async function FindRoom( {roomId} : { roomId: string }) {
    const [room, setRoom] = useState(false)
    const router = useRouter()


    const response = await axios.get(`${HTTP_URL}/api/v1/room/${roomId}`, {
        data: { id: Number(roomId) }
    })
    const data = response.data 
     if(data){
        setRoom(true)
     }else if(!data){
        setRoom(false)
     }
     
     return data
   }