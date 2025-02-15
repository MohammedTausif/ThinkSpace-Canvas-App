import { initDraw } from "@/Draw/draw";
import { useEffect, useRef } from "react";



export function Canvas({
    roomId,
    socket
}: {
    roomId : string,
    socket : WebSocket
}){
    const canvasRef = useRef<HTMLCanvasElement>(null);


  useEffect(()=>{
    if(canvasRef.current){
        
        initDraw(canvasRef.current, roomId, socket)
    }
  },[canvasRef.current])




    return <div className=" h-[100vh] overflow-hidden">
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
    </div>


}