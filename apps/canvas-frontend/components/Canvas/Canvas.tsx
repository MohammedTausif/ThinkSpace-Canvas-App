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
    if(canvasRef.current){
        
        initDraw(canvasRef.current, roomId, socket)
        
    }
  },[canvasRef.current])




    return <div className=" h-[100vh] overflow-hidden">
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
        <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
    </div>

}