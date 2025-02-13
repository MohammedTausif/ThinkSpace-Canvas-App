"use client"
import { Users, ArrowRight, Calendar, Plus } from 'lucide-react';
import CreateRoomModal from '../createroom/page';
import { useState } from 'react';
export default function DashboardPage(){
  const [roomModal, setRoomModal] = useState<boolean>(false)
    const rooms = [
        {
          id: 1,
          title: 'Product Strategy Meeting',
          owner: 'Sarah Johnson',
          createdAt: '2024-03-15',
          participants: 8
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
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Workspace Rooms</h1>
              <button
                onClick={()=> setRoomModal(!roomModal)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm">
                <Plus className="w-5 h-5 mr-2" />
                Create Room
              </button>
            </div>
          </div>
        </header>
        <CreateRoomModal isOpen={roomModal} onSubmit={()=>setRoomModal} onClose={()=>setRoomModal(!roomModal)} />
  
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 flex-1">
                      {room.title}
                    </h2>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Users className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm">Owner: {room.owner}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm">Created: {room.createdAt}</span>
                    </div>
  
                    <div className="flex items-center text-gray-600">
                      <Users className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm">{room.participants} participants</span>
                    </div>
                  </div>
  
                  <div className="mt-6">
                    <button
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <span>Enter Room</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    )
}