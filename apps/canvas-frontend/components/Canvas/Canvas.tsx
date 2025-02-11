import { useRef } from "react";



export function Canvas({
    roomId,
    socket
}: {
    roomId : string,
    socket : WebSocket
}){
    const canvasRef = useRef<HTMLCanvasElement>(null);







    return <div>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
    </div>


}