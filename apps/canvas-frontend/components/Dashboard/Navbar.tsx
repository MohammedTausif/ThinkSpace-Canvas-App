import { LogOut, } from "lucide-react";
interface DashboardNavProps {
    Signout: () => void
}

export default function NavbarDashboard({ Signout }: DashboardNavProps) {
    return <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">

                <h1 className="text-3xl font-bold text-gray-900 flex items-center "> 
                    <img className="size-6" src="https://9to5google.com/wp-content/uploads/sites/4/2021/09/google-currents-logo-icon-new.png" alt="" />
                     Workspace Rooms</h1>  

                <button className="flex gap-1 items-center cursor-pointer hover:text-gray-600"
                    onClick={Signout} >
                    Signout
                    <LogOut className="size-[18px] " />
                </button>

            </div>
        </div>
    </header>
}

