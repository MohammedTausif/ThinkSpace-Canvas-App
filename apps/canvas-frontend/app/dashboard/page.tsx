"use client"
import CreateRoomModal from '@/components/ui/RoomModal';
import { HTTP_URL } from '@/config';
import axios from 'axios';
import { Users, ArrowRight, Calendar, Plus } from 'lucide-react';
import NavbarDashboard from '@/components/Dashboard/Navbar';
import { useState } from 'react';
import Card from '@/components/ui/Card';
export default function DashboardPage() {
  const [roomModal, setRoomModal] = useState<boolean>(false)
  const rooms =
    [
      {
        id: 1,
        title: 'Product Strategy Meeting',
        owner: 'Sarah Johnson',
        createdAt: '2024-03-15',
        participants: 8,
        photo: ""
      },
      {
        id: 2,
        title: 'Design Review Session',
        owner: 'Michael Chen',
        createdAt: '2024-03-14',
        participants: 5
      },
      {
        id: 3,
        title: 'Sprint Planning',
        owner: 'Alex Rodriguez',
        createdAt: '2024-03-13',
        participants: 12
      },
      {
        id: 4,
        title: 'Client Presentation',
        owner: 'Emily Watson',
        createdAt: '2024-03-12',
        participants: 6
      }
    ];

 


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
          {rooms.length > 0 && rooms.map((room) => (
            <Card key={room.id} id={room.id} photo={room.photo} name={room.title} adminId={room.owner} createdAt={room.createdAt} owner={room.owner} />
                     
          ))}
        </div>
      </main>
    </div>
  )
}