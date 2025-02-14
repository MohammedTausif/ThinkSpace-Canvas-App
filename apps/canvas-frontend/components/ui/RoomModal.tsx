"use client"
import { ChangeEvent, useState } from 'react';
import { Plus, X } from 'lucide-react';
import axios from 'axios';
import { HTTP_URL } from '@/config';
import { CreateRoomInput, CreateRoomSchema } from '@repo/common/types';
import {motion} from 'framer-motion'
interface CreateRoomModalProps {
    isOpen: boolean;
    onClose?: () => void;
    onSubmit: (title: string) => void;
}

export default function CreateRoomModal({ isOpen, onClose, onSubmit }: CreateRoomModalProps) {
    const [error, setError] = useState<Record<string, string>>({})
    const [newRoomTitle, setNewRoomTitle] = useState<CreateRoomInput > ({
        name: ""
    });

    const roomName = CreateRoomSchema.safeParse(newRoomTitle).toString()

    function handleChange(e: ChangeEvent<HTMLInputElement>){
           setNewRoomTitle({...newRoomTitle, [e.target.name]: [e.target.value]})
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(roomName);
        setNewRoomTitle({name:""});
    };



    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
                initial={{  y: -80``~~~~~~~~~~, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                    type: 'spring',
                    damping: 10
                }}
                className='flex w-full flex-col   rounded-2xl bg-gray-400/15   sm:max-w-[26rem]'
            >
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Room</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="roomTitle" className="block text-sm font-medium text-gray-700 mb-2">
                            Room Title
                        </label>
                        <input
                            type="text"
                            id="roomTitle"
                            name='name'
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter room title"
                            required
                        />
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
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Create Room
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
        </div>
    );
}