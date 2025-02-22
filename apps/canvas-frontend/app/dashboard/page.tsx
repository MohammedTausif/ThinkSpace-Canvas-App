"use client"
import CreateRoomModal from '@/components/ui/RoomModal';
import { FE_URL, HTTP_URL } from '@/config';
import axios from 'axios';
import NavbarDashboard, {  } from '@/components/Dashboard/Navbar';
import { useEffect, useState } from 'react';
import RoomCard from '@/components/ui/Card';
import { useRouter } from 'next/navigation';
import {motion} from 'framer-motion'

interface room {
  id: number,
  slug: string,
  createdAt: any,
  adminId: number,
  admin: {
    name: string,
    photo?: string,
  }
}
export default function DashboardPage() {
  const router = useRouter();
  const [roomModal, setRoomModal] = useState<boolean>(false)
  const [rooms, setRooms] = useState<room[]>([])

   const GotoRoom= (id: number)=>{
    if(isNaN (id)){
      console.log("roomId is NaN")
      return 
    }
    const roomId= id;
    router.push(`canvas/${roomId}`)
  }

   function Logout() {
    const token = localStorage.getItem('token')
    try {
      localStorage.removeItem('token')
        router.push("/signin")
    } catch (error) {
        console.error("logout Failed", error)
    }
}

const editRoom = async (id: number)=>{
  axios.put(`${HTTP_URL}/api/v1/room/update`,{
    data: {
      slug: ""
    }
  })


}

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${HTTP_URL}/api/v1/rooms`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      setRooms(response.data.rooms)
    } catch (error) {
      console.error("Error fetchung rooms: ", error)
    }

  }

  function CreateInviteLink (id: number){
    const roomId = id
    alert(`${FE_URL}/canvas/${roomId}`)
    return
  }
  const deleteRoom = (id:number)=>{
    const roomId = id
    axios.delete(`${HTTP_URL}/api/v1/room/delete`, {
      data:{
        id: roomId
      }
    })
  }
  
  useEffect(() => {
    fetchRooms()
  }, [roomModal])

  return (
    <div className="min-h-screen bg-gray-50">
       <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 1,
                    ease: 'easeInOut',
                    type: 'spring',
                    damping: 10
                }}
            >
      <NavbarDashboard
      Signout={Logout}
      />
      <CreateRoomModal
        isOpen={roomModal}
        onClose={() => setRoomModal(!roomModal)}
      />

      </motion.div>
      <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 1,
                    ease: 'easeInOut',
                    type: 'spring',
                    damping: 10
                }}
            >
      <main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.length > 0 && rooms.map((room: room) => (
            <RoomCard key={room.id} id={room.id} photo={room.admin.photo} slug={room.slug} adminId={room.adminId} createdAt={room.createdAt} name={room.admin.name} 
            Invite={()=>CreateInviteLink(room.id)} 
            onClick={()=>GotoRoom(room.id)} 
            updateRoom={()=>editRoom(room.id)}
            />
          ))}
        </div>
      </main>
      </motion.div>
    </div>
  )
}