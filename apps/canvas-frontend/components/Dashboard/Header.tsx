"use client"
import { Search } from "lucide-react";


export default function DashboardHeader({searchQuery, setSearchQuery}: any){
    // const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className=" bg-transparent flex items-center justify-center ">
      <div className="w-full min-w-3xl max-w-5xl">
        <div className="flex  gap-0 bg-transparent p-3  shadow-g">
        <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg rounded-r-none hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2 font-medium"
          >
            <Search size={20} />
          </button>
          <input
            type="text"
            placeholder="Search Rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[26rem] flex-1 bg-white px-3  py-1.5 text-gray-700 bg-transparent border border-l-0 border-blue-100 rounded-lg rounded-l-none focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
          />
         
        </div>
      </div>
     </div>
  );
}