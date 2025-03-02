import axios from 'axios';
import { HTTP_URL } from '@/config';
import getExistingShapes from './FetchShapes';

type Shape = {
    type: "rect",
    x: number,
    y: number,
    height: number,
    width: number
} | {
    type: "circle",
    centerX: number,
    centerY: number,
    radius: number,
} | {
    type: "pencil",
    startX: number,
    startY: number,
    endX: number,
    endY: number,
}



//Logic for drawing Rectangle Shape
export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {

    const ctx = canvas.getContext("2d");
    let existingShapes: Shape[] = await getExistingShapes(roomId)

    if (!ctx) {
        return
    }
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data)

        if (data.type == "chat") {
            const parsedShapes = JSON.parse(data.message)
            existingShapes.push(parsedShapes)
            clearCanvas(existingShapes, canvas, ctx);
        }

    }


    ctx.fillStyle = "rgba(0, 0, 0)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    clearCanvas(existingShapes, canvas, ctx)
    let clicked = false;
    let startX = 0;
    let startY = 0;

    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    })

    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;

        //@ts-ignore
        const selectedTool = window.selectedTool
        let shape: Shape | null = null
        if (selectedTool === "rect") {
            shape = {
                type: "rect",
                x: startX,
                y: startY,
                height,
                width
            }
        } else if (selectedTool === "circle") {
            const radius = Math.max(width, height) / 2
            shape = {
                type: "circle",
                radius: radius,
                centerX: startX + radius,
                centerY: startY + radius,
            }
        }
        if (!shape) {
            return;
        }
        existingShapes.push(shape)

        socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            })
        }))

    })

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            clearCanvas(existingShapes, canvas, ctx);
            ctx.strokeStyle = "rgba(255, 255, 255)"
            //@ts-ignore
            const selectedTool = window.selectedTool;
            if (selectedTool === "rect") {
                ctx.strokeRect(startX, startY, width, height)
            } else if (selectedTool === "circle") {
                const radius = Math.max(width, height) / 2
                const centerX = startX + radius;
                const centerY = startY + radius;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.closePath();

            }
        }
    })
}

// clearing canvas after drawing one rectangle => to allow access for drawing multiple rectangles
function clearCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    existingShapes.map((shape) => {
        if (shape.type == "rect") {
            ctx.strokeStyle = "rgba(255, 255, 255)";
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
        } else if (shape.type === "circle") {
            ctx.beginPath();
            ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2)
            ctx.stroke();
            ctx.closePath()
        }
    })

}

