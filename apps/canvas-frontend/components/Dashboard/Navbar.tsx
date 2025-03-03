import { Layers, LogOut, } from "lucide-react";
interface DashboardNavProps {
    Signout: () => void
}

export default function NavbarDashboard({ Signout }: DashboardNavProps) {
    return <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">

                <h1 className=" text-lg md:text-3xl font-bold text-gray-900 flex items-center gap-2 "> 
                    <Layers className="h-8 w-8 text-blue-600" />
                     Workspace Rooms</h1>  
                <button className="flex gap-1 items-center cursor-pointer hover:text-gray-600"
                    onClick={Signout} >
                   <h1 className="hidden md:flex">Signout</h1> 
                    <LogOut className="size-[18px] " />
                </button>

            </div>
        </div>
    </header>
}

