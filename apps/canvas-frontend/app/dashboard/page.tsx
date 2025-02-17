"use client"
import CreateRoomModal from '@/components/ui/RoomModal';
import { HTTP_URL } from '@/config';
import axios from 'axios';
import { Users, ArrowRight, Calendar, Plus } from 'lucide-react';
import NavbarDashboard from '@/components/Dashboard/Navbar';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';

interface room {
  id: number,
  slug: string,
  createdAt: any,
  adminId: number,
  admin : {
    name: string,
    photo: string,
  }


}
export default function DashboardPage() {
  const [roomModal, setRoomModal] = useState<boolean>(false)

  let rooms: room[] = []
  const fetchRooms = async () => {

    const response = await axios.get(`${HTTP_URL}/api/v1/rooms`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    // console.log("response :" , response)
    rooms.push(response.data.rooms)
    console.log("response: ", response.data.rooms)

    return rooms 

  }
  useEffect(() => {
   fetchRooms()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">

      <NavbarDashboard
        onClick={() => setRoomModal(!roomModal)}
      />
      <CreateRoomModal
        isOpen={roomModal}
        onClose={() => setRoomModal(!roomModal)}
      />

      <main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.length > 0 && rooms.map((room: any) => (
            <Card key={room.id} id={room.id} photo={room.admin.photo} name={room.title} adminId={room.owner} createdAt={room.createdAt} owner={room.owner} />

          ))}
        </div>
      </main>
    </div>
  )
}