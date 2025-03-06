import { CircleUser, Layers, LogOut, Moon, Sun, UserPen, } from "lucide-react";
import Link from "next/link";
interface DashboardNavProps {
    Signout: () => void
}

export default function NavbarDashboard({ Signout }: DashboardNavProps) {
    return <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
                <h1 className="text-lg md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                    <Layers className="h-8 w-8 text-blue-600" />
                    Workspace Rooms
                </h1>

                {/* Account Button with Dropdown */}
                <div className="relative flex space-x-4 group">
                    <button className="flex gap-1 items-center cursor-pointer hover:text-gray-600 focus:outline-none"
                    >
                        <CircleUser className="w-6 h-6 bg-gray-100 rounded-lg stroke-2" />
                    </button>
                    <button className="cursor-pointer">
                        <Sun className="size-5" />
                    </button>

                    {/* Dropdown Menu */}
                    <div
                        className="absolute right-12 mt-7  w-52  bg-white border border-gray-200 rounded-md shadow-lg 
                       opacity-0 transform -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 
                       transition-all duration-300 ease-out z-10"
                    >
                        <ul className="py-4">
                            <li>
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    <UserPen className="size-4" />
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={Signout}
                                    className=" flex items-center gap-1 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    <LogOut className="size-4" />
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </header>
}

