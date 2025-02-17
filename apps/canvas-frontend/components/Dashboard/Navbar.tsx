import { Plus } from "lucide-react";
interface DashboardNavProps {
    onClick: () => void
}
export default function NavbarDashboard({ onClick }: DashboardNavProps) {
    return <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 ">Workspace Rooms</h1>
                <button
                    onClick={onClick}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm">
                    <Plus className="w-5 h-5 mr-2" />
                    Create Room
                </button>
            </div>
        </div>
    </header>
}