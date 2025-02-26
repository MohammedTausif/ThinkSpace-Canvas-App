import { ArrowRight, Binary, Calendar, Delete, DeleteIcon, Drumstick, Edit, Edit2, Edit3, Edit3Icon, EditIcon, FileEdit, FolderEdit, Link, Link2, Link2Off, LinkIcon, LucideDelete, PaintBucket, Pencil, PencilIcon, PencilLine, PencilOffIcon, Trash, Trash2, Users } from "lucide-react";

interface CardProps{
    id: number,
    slug: string,
    createdAt: string,
    adminId: number,
    name : string,
    photo? : any,
    onClick: (id: any)=>void,
    Invite : (id: any)=> void,
    DeleteRoom : (id:any)=> void
}

export default function RoomCard({id, slug ,createdAt,  name, photo, adminId, onClick, Invite, DeleteRoom }: CardProps){
    return <div
                key={id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4 ">
                    <h2 className=" text-xl font-semibold text-gray-900 flex-1">
                      {slug.toLocaleUpperCase()}
                    </h2>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                        {photo? <img className="rounded-full size-5  relative"
                        src={photo} alt="" /> : <Users className="w-5 h-5 text-blue-600 mr-2" />}
                      
                      <span className="text-sm ">Created By: {name}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                      <h1 className="text-sm">Created: {new Date(createdAt).getDate()}-{new Date(createdAt).getMonth()+1}-{new Date(createdAt).getFullYear()}</h1>
                    </div>
  
                    <div className="flex items-center text-gray-600">
                      {/* <Users className="w-5 h-5 text-blue-600 mr-2" /> */}
                      <Trash2 className="w-5 h-5 text-blue-600"/>
                    <button onClick={DeleteRoom}>
                       <span className="text-sm pl-2 cursor-pointer hover:text-blue-600 hover:underline"
                      > Delete Room </span>
                      </button> 
                    </div>
                  </div>
                  <div className="mt-7 flex space-x-4">

                    <button
                    onClick={onClick}
                     className="w-[6rem] bg-blue-600  font-medium text-white py-2 px-4 rounded-sm hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-1 overflow-hidden">
                      <span>Room</span>
                      <ArrowRight className="w-4 h-4 " />
                    </button>

                    <button
                    onClick={Invite}
                     className="w-[6rem] bg-white border-[1px] text-blue-600 border-blue-600  font-medium py-2  px-4 rounded-sm hover:text-white hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center space-x-1 overflow-hidden">
                      <Link className="size-4 "/>
                      <span>Invite</span>
                    </button>

                  </div>
                </div>
              </div>
    
}