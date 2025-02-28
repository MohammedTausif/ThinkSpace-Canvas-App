import { initDraw } from "@/Draw/draw";
import { useEffect, useRef, useState } from "react";
import Topbar, { getCursorStyle } from "../Topbar/Toolbar";
import { Game } from "@/Draw/Game";

interface CanvasProps{
    roomId: string,
    socket: WebSocket
}

export type Tool= "circle" | "rect" | "pencil" | "text" | "eraser"| "select"| "arrow";

export function Canvas({ roomId, socket }: CanvasProps){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame]= useState<Game>();
    const [selectedTool, setSelectedTool] = useState<Tool>("select")


    useEffect(()=>{
      game?.setTool(selectedTool)
    },[selectedTool, game])

  useEffect(()=>{
    if(canvasRef.current){
        const draw = new Game(canvasRef.current, roomId, socket)   
        setGame(draw);

        return()=>{
          draw.destroy();
        }
    }
  },[canvasRef])




    return <div className=" h-[100vh] overflow-hidden  ">
        <canvas className="flex justify-center " ref={canvasRef} width={window.innerWidth} height={window.innerHeight} style={{ cursor: getCursorStyle({selectedTool})}} ></canvas>
        <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
    </div>

}