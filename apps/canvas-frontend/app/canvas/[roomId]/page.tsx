"use client"
import { initDraw } from "@/Draw/draw";
import { useEffect, useRef } from "react"

function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {

        if (canvasRef.current) {
            const canvas = canvasRef.current;
            initDraw(canvas, "roomId")
        }

    }, [canvasRef])

    return <div>

        <canvas ref={canvasRef} width={2000} height={1080}> </canvas>

    </div>

}

export default Canvas
