import { initDraw } from "@/Draw/draw";
import { useEffect, useRef, useState } from "react";
import Topbar from "../Topbar/Toolbar";

interface CanvasProps{
    roomId: string,
    socket: WebSocket
}

export type Tool= "circle" | "rect" | "pencil";

export function Canvas({ roomId, socket }: CanvasProps){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool] = useState<Tool>("circle")


    useEffect(()=>{
      //@ts-ignore
      window.selectedTool = selectedTool
    },[selectedTool])

  useEffect(()=>{
    if(canvasRef.current){
        initDraw(canvasRef.current, roomId, socket)   
    }
  },[canvasRef])




    return <div className=" h-[100vh] overflow-hidden  ">
        <canvas className="flex justify-center " ref={canvasRef} width={window.innerWidth} height={window.innerHeight} ></canvas>
        <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
    </div>

}