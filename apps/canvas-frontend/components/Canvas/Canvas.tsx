import { initDraw } from "@/Draw/draw";
import { useEffect, useRef, useState } from "react";
import Topbar, { getCursorStyle } from "../Topbar/Toolbar";
import { Game } from "@/Draw/Game";
import ShareButton from "../Topbar/Share.Button";
import Menubar from "../Topbar/Menubar";

interface CanvasProps{
    roomId: string,
    socket: WebSocket
}

export type Tool= "circle" | "rect" | "pencil" | "text" | "eraser"| "select"| "arrow" | "triangle" | "rhombus"| "line" | "move";

export function Canvas({ roomId, socket }: CanvasProps){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame]= useState<Game>();
    const [selectedTool, setSelectedTool] = useState<Tool>("move")


    useEffect(()=>{
      game?.setTool(selectedTool)
    },[selectedTool, game])

  useEffect(()=>{
    if(canvasRef.current){
        const draw = new Game(canvasRef.current, roomId, socket)   
        draw.onShapeDrawn=()=> setSelectedTool("move")
        setGame(draw);
 
        return()=>{
          draw.destroy();
        }
    }
  },[canvasRef, roomId, socket])

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.cursor = getCursorStyle({ selectedTool });
    }
  }, [selectedTool]);

  function Handle(){
    console.log("clicked")
    return alert("feature coming soon")
  }


    return <div className=" h-[100vh] overflow-hidden  ">
        <canvas className="flex justify-center " ref={canvasRef} width={window.innerWidth} height={window.innerHeight} 
         ></canvas>
         <Menubar/>
        <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
        <ShareButton onClick={Handle}/>

    </div>

}