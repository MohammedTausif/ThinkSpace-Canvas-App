import { useRouter } from 'next/navigation'
import { Github, HelpCircle, LayoutDashboard, LogOut, Moon, Sun, Trash, Trash2, Twitter, User, Users } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import collabLink from '../Canvas Features/Collab.Link'


interface MenuPageProps {
    isOpen: boolean
    onclose?: () => void
    resetCanvas: ()=> void
}

export default function Menubar({ isOpen, onclose , resetCanvas}: MenuPageProps) {
  
    const router = useRouter()

    function Logout() {
        try {
            localStorage.removeItem('token')
            router.push("/")
        } catch (error) {
            console.error("logout Failed", error)
        }
    }

    return <div>
        <div className={`fixed top-[7%]  h-[60%vh] md:h-[] w-60 bg-[#232329] shadow rounded-[8px] transform transition-transform duration-300 ${isOpen ? 'translate-x-1 left-[1%]' : '-translate-x-full'}`}>

            <div className='grid px-4 py-3'>
                <ul className='text-white text-sm  '>
                    <Link href={'/dashboard'} className='flex items-center gap-1 cursor-pointer hover:bg-gray-700 p-3 rounded'> <LayoutDashboard className='size-4 ' />Back to Dashboard</Link>
                    <li className='flex items-center gap-1 cursor-pointer hover:bg-gray-700 p-3 rounded' ><Users className='size-4' />Live Collaboration</li>
                    <li className='flex items-center gap-1 cursor-pointer hover:bg-gray-700 p-3 rounded' onClick={resetCanvas}> <Trash2 className='size-4' />Reset Canvas</li>
                    <li className='flex items-center gap-1 cursor-pointer hover:bg-gray-700 p-3 rounded'> <User className='size-4' />Account</li>
                    <li className='flex items-center gap-1 cursor-help   hover:bg-gray-700 p-3 rounded'><HelpCircle className='size-4 text-white' /> Help</li>
                </ul>

                <div className='border-[0.5px] border-t-0 border-gray-500 mt-2'></div>

                <ul className='text-white text-sm'>
                    <Link href={'https://github.com/MohammedTausif/ThinkSpace-Canvas-App.git'} target='_blank' className='flex items-center gap-1 cursor-pointer   hover:bg-gray-700 p-3 rounded'><Github className='size-4 text-white' /> GitHub</Link>
                    <Link href={'https://x.com/mohd_Tauseefx'} target='_blank' className='flex items-center gap-1 cursor-pointer  hover:bg-gray-700 p-3 rounded'><Twitter className='size-4 text-white' />  Twitter</Link>
                    <li className=' w-full flex items-center gap-1 cursor-pointer hover:bg-gray-700 p-3 rounded' onClick={Logout}> <LogOut className='size-4' /> Logout</li>

                </ul>
                <div className='border-[0.5px] border-t-0 border-gray-500 mt-2'></div>
                
                <div className='flex px-3 py-1.5 gap-4 text-white text-sm w-full   rounded'>
                    <h1 className='flex items-center  rounded'>Theme</h1>
                    <div className='flex justify-around items-center border-[0.5px] border-gray-500 rounded h-10 w-24'>
                        <span className='flex items-center justify-center bg-blue-600 gray-500/45  hover:bg-gray-500/45  rounded-md w-[50%] h-[88%] cursor-pointer'><Moon className='size-5 ' /> </span>
                        <span className='flex items-center justify-center hover:bg-gray-500/45 rounded-md w-[50%] h-[88%] cursor-pointer' ><Sun className='size-5 ' /></span>
                    </div>

                </div>
                

            </div>
        </div>
    </div>

}

