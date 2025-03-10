import { HTTP_URL } from "@/config";
import { Button } from "@repo/ui/button";
import axios from "axios";
interface ResetFormProps{
    isOpen: boolean,
    onClose: ()=> void,
    roomId : string
}

export default function ResetForm({ isOpen, onClose, roomId }: ResetFormProps) {
    function ResetCanvas(id : string) {
        axios.delete(`${HTTP_URL}/api/v1/shapes/delete`)
        
        onClose()
    }
    function Resetcancel (){
            onClose()
    }
  if(!isOpen){
    return
  }
    return (
        <div className=" absolute bg-gray-800/50 w-full h h-screen flex justify-center items-center " onClick={Resetcancel} >
            <div className="absolute   bg-[#232329] w-[90%] md:w-[40%] lg:w-[37%]  h-auto rounded-sm p-4 text-white">
                <div className="">

                    <h1 className="flex justify-center text-lg font-semibold">Are you absolutely sure ? </h1>
                    <p className="p-2 w-full text-sm">This action cannot be undone. This will permanently delete your drawings from our servers.</p>
                </div>
                <div className="flex justify-center md:justify-end gap-2 flex-wrap px-2">

                    <Button
                        className=" bg-white rounded px-6 py-3 text-black text-sm w-full md:w-auto hover:bg-gray-200"
                        children="Cancel"
                        variant="secondary"
                        onClick={Resetcancel}
                        size="lg"
                    />
                    <Button
                        className="bg-blue-600 text-white rounded-sm py-3 px-6 text-sm w-full md:w-auto hover:bg-blue-700"
                        children="Continue"
                        variant="secondary"
                        onClick={()=>ResetCanvas(roomId)}
                        size="lg"
                    />
                </div>
            </div>

            </div>

        
    )
}

