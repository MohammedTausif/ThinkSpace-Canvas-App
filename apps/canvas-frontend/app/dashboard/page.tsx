"use client"
import CreateRoomModal from '@/components/ui/RoomModal';
import { HTTP_URL } from '@/config';
import axios from 'axios';
import { Users, ArrowRight, Calendar, Plus } from 'lucide-react';
import NavbarDashboard from '@/components/Dashboard/Navbar';
import { useEffect, useState } from 'react';
import RoomCard from '@/components/ui/Card';
import { div } from 'framer-motion/client';
import { error } from 'console';

interface room {
  id: number,
  slug: string,
  createdAt: any,
  adminId: number,
  admin : {
    name: string,
    photo?: string,
  }
}
export default function DashboardPage() {
  const [roomModal, setRoomModal] = useState<boolean>(false)
  const [roomss, setRoomss] = useState<room[]>([])

  const rooms: room[] = []
  const fetchRooms = async () => {
   
    try{
    const response = await axios.get(`${HTTP_URL}/api/v1/rooms`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    setRoomss(response.data)
    console.log("response.data : ", roomss)
  }catch(error){
   console.error("Error fetchung rooms: ", error)
  }

  }
  useEffect(() => {
   fetchRooms()
  }, [roomModal])

  return (
    <div className="min-h-screen bg-gray-50">

      <NavbarDashboard
        openForm={() => setRoomModal(!roomModal)}
      />
      <CreateRoomModal
        isOpen={roomModal}
        onClose={() => setRoomModal(!roomModal)}
      />

      <main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
              <div>
                
              </div>
            
          {roomss.length > 0 && roomss.map((room) => (
            <RoomCard key={room.id} id={room.id} photo={room.admin.photo}  slug={room.slug} adminId={room.adminId} createdAt={room.createdAt} name={room.admin.name} />
          ))}
        </div>
      </main>
    </div>
  )
}