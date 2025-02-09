import axios from 'axios';
import { HTTP_URL } from '@/config';

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

// to get all the previous existing shapes
async function getExistingShapes(roomId:string) {
    // const res = await axios.get(`${HTTP_URL}/api/v1/chats/${roomId}`);
    // const messages = res.data.messages;
    // const shapes = messages.map((x: {message : string})=>{
    //     const messageData = JSON.parse(x.message)
    //     return messageData.shape;
    // })
    // return shapes;
    return JSON.parse(roomId)
}

//Logic for drawing Rectangle Shape
export async function initDraw(canvas: HTMLCanvasElement, roomId:string) {

    let existingShapes: Shape[] =[]
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return
    }

    ctx.fillStyle = "rgba(0, 0, 0)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)


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
        existingShapes.push({
            type: "rect",
            x: startX,
            y: startY,
            height,
            width
        })

    })

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            clearCanvas(existingShapes, canvas, ctx);
            ctx.strokeStyle = "rgba(255, 255, 255)"
            ctx.strokeRect(startX, startY, width, height)

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
        }
    })

}

