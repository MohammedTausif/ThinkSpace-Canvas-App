"use client"
import { HTTP_URL } from "@/config";
import axios from "axios";
import { Search } from "lucide-react";


export default function DashboardHeader({ searchQuery, setSearchQuery }: any) {


  const handleSearch = (s: any) => {
    if(!searchQuery){
      return
    }
   const response = axios.post(`${HTTP_URL}/api/v1/search/slug=${s}`,{

    })
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className=" bg-transparent flex items-center justify-center ">
      <div className="w-full min-w-3xl max-w-5xl">
        <div className="flex  gap-0 bg-transparent p-3  shadow-g">

          {/* Search Bar */}
          <div className=" flex items-center relative mx-4 flex-1 max-w-lg">
            <Search className="absolute left-3 h-5 w-4 cursor-pointer  text-blue-600" onClick={handleSearch} />
            <input
              type="text"
              placeholder="Search Rooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="lg:w-[50rem] md:w-[35rem] sm:w-[26rem] flex-1 pl-10 pr-4 py-2.5 w-full rounded-full bg-gray-100 border-transparent focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 text-sm transition-all duration-200"
            />
          </div>

        </div>
      </div>
    </div>
  );
}