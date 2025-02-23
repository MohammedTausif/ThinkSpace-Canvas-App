"use client"
import { Search } from "lucide-react";
import { useState } from "react";

export default function DashboardHeader(){
    const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className=" bg-transparent flex items-center justify-center ">
      <div className="w-full max-w-2xl">
        <div className="flex gap-2 bg-transparent p-2 rounded-xl shadow-lg">
          <input
            type="text"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2.5 text-gray-700 bg-transparent border border-blue-100 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2 font-medium"
          >
            <Search size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}