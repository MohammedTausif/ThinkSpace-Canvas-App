"use client"
import CreateRoomModal from '@/components/ui/RoomModal';
import { FE_URL, HTTP_URL } from '@/config';
import axios from 'axios';
import NavbarDashboard from '@/components/Dashboard/Navbar';
import { useEffect, useState } from 'react';
import RoomCard from '@/components/ui/Card';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'
import {  Plus, ServerOff } from 'lucide-react';
import DashboardHeader from '@/components/Dashboard/Header';

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
  const [searchQuery, setSearchQuery] = useState("")

  const GotoRoom = (id: number) => {
    if (isNaN(id)) {
      console.log("roomId is NaN")
      return
    }
    const roomId = id;
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

  function CreateInviteLink(id: number) {
    const roomId = id
    alert(`${FE_URL}/canvas/${roomId}`)
    return
  }

  async function deleteRoom(id: number) {
    const roomId = id
    try{
      const response = await axios.delete(`${HTTP_URL}/api/v1/room/delete`, {
        data: { roomId },
        headers: { Authorization: localStorage.getItem("token") },
      })
      setRooms(rooms.filter((room) => room.id !== id))
    }catch(error) {
      console.error(error)
    }
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
        <div className='flex justify-around bg-transparent  items-center py-4'>
          <div>
            <DashboardHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div>
            <button
              onClick={() => setRoomModal(true)}
              className="inline-flex items-center md:px-4 px-2 lg:px-4  py-1.5 md:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm">
              <Plus className="w-5 h-5 mr-1" />
              Create Room
            </button>
          </div>
        </div>
        {
          rooms.length == 0 && <div className=' mt-[15%] w-full flex items-center justify-center text-gray-300  text-3xl font-bold gap-2'> No Rooms Exist <ServerOff className='size-6'/></div>
        }
        <main
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {rooms.length > 0 && rooms.map((room: room) => (
              <RoomCard key={room.id} id={room.id} photo={room.admin.photo} slug={room.slug} adminId={room.adminId} createdAt={room.createdAt} name={room.admin.name}
                Invite={() => CreateInviteLink(room.id)}
                onClick={() => GotoRoom(room.id)}
                DeleteRoom={() => deleteRoom(room.id)}
              />
            ))}
          </div>

        </main>
      </motion.div>
    </div>
  )
}