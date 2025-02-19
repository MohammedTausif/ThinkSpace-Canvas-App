import { ArrowRight, Calendar, Link, Users } from "lucide-react";

interface CardProps{
    id: number,
    slug: string,
    createdAt: string,
    adminId: number,
    name : string,
    photo? : any,
    onClick: (id: any)=>void,
    Invite : (id: any)=> void,

}
export default function RoomCard({id, slug ,createdAt,  name, photo, adminId, onClick, Invite }: CardProps){
    return <div
                key={id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 flex-1">
                      {slug.toLocaleUpperCase()}
                    </h2>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                        <img src={photo} alt="" />
                      <Users className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm">Owner: {name}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                      <h1 className="text-sm">Created: {new Date(createdAt).getDate()}-{new Date(createdAt).getMonth()+1}-{new Date(createdAt).getFullYear()}</h1>
                    </div>
  
                    <div className="flex items-center text-gray-600">
                      {/* <Users className="w-5 h-5 text-blue-600 mr-2" /> */}
                      <Link className="w-5 h-5 text-blue-600"/>
                    <button onClick={Invite}>
                       <span className="text-sm pl-2 cursor-pointer hover:text-blue-600 hover:underline"
                      > Invite to Collaborate</span>
                      </button> 
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                    onClick={onClick}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <span>Enter Room</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
    
}