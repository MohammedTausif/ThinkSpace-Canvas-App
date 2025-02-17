import { ArrowRight, Calendar, Users } from "lucide-react";

interface CardProps{
    id: number,
    name: string,
    createdAt: any,
    adminId?: string,
    owner: string,
    photo? : string

}
export default function Card({id, name,createdAt, adminId, owner, photo }: CardProps){
    return <div
                key={id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 flex-1">
                      {name}
                    </h2>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                        <img src={photo} alt="" />
                      <Users className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm">Owner: {owner}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm">Created: {createdAt}</span>
                    </div>
  
                    <div className="flex items-center text-gray-600">
                      <Users className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm"> participants</span>
                    </div>
                  </div>
  
                  <div className="mt-6">
                    <button
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <span>Enter Room</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
    
}