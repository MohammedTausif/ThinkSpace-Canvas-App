"use client"
import { ChangeEvent, useState } from 'react';
import { Plus, X } from 'lucide-react';
import axios from 'axios';
import { HTTP_URL } from '@/config';
import { CreateRoomInput, CreateRoomSchema } from '@repo/common/types';
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation';

interface CreateRoomModalProps {
    isOpen: boolean;
    onClose?: () => void;
}
export default function CreateRoomModal({ isOpen, onClose }: CreateRoomModalProps) {
    const router = useRouter()
    const [error, setError] = useState<Record<string, string>>({})
    const [newRoomTitle, setNewRoomTitle] = useState<CreateRoomInput>({
        name: ""
    });


    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setNewRoomTitle({ ...newRoomTitle, [e.target.name]: e.target.value })
    }

    const createRoom = CreateRoomSchema.safeParse(newRoomTitle)

    async function handleSubmit() {
        if (!createRoom.success) {
            const formatErrors = createRoom.error.format()
            setError({
                name: formatErrors.name?._errors[0] || "",
            })
            return

        }
        setError({})
        try {
            const roomName = createRoom.data.name
            const response = await axios.post(`${HTTP_URL}/api/v1/room`, 
                { name: roomName },
                 {
                    headers: {
                        Authorization: localStorage.getItem('token')
                },
            })
            // alert("Room Created")
            if(onClose){
                onClose()
            };

        } catch (error) {
            console.error(error)
        }
    };



    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                    type: 'spring',
                    damping: 10
                }}
                className='flex w-full flex-col   rounded-2xl bg-gay-400/15   sm:max-w-[26rem]'
            >
                <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Room</h2>

                    <div>
                        <div className="mb-6">
                            <label htmlFor="roomTitle" className="block text-sm font-medium text-gray-900 mb-2">
                                Room Title
                            </label>
                            <input
                                type="text"
                                id="name"
                                name='name'
                                onChange={handleChange}
                                value={newRoomTitle.name}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter room title"
                                required
                            />
                            {error && <p className='absolute mt-1 text-sm text-red-600'>{error.name}</p>}
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Create Room
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}