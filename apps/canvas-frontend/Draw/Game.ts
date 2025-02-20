import { Tool } from "@/components/Canvas/Canvas";
import getExistingShapes from "./FetchShapes";

type Shape = {
    type: "rect",
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: "pencil";
    points: { x: number, y: number }[];
}
export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[]
    private roomId: string;
    private clicked: boolean;
    private startX = 0;
    private startY = 0;
    private selectedTool: Tool = "circle";
    private currentPencilPoints: { x: number, y: number }[] = []

    socket: WebSocket;

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = []
        this.roomId = roomId
        this.socket = socket;
        this.clicked = false
        this.init()
        this.initHandlers();
        this.initMouseHandlers();
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler)

        this.canvas.removeEventListener("mouseup", this.mouseUpHandler)

        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler)
    }

    setTool(tool: Tool) {
        this.selectedTool = tool;
    }


    async init() {
        this.existingShapes = await getExistingShapes(this.roomId)
        console.log(this.existingShapes)
        this.clearCanvas();
    }

    initHandlers() {
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data)

            if (data.type == "chat") {
                const parsedData = JSON.parse(data.message)
                this.existingShapes.push(parsedData.shape)
                this.clearCanvas()
            }
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0,0,0)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.existingShapes.map((shape) => {
            if (shape.type == "rect") {
                this.ctx.strokeStyle = "rgba(255, 255, 255)";
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
            } else if (shape.type === "circle") {
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2)
                this.ctx.stroke();
                this.ctx.closePath()
            } else if (shape.type === "pencil") {
                if (shape.points && shape.points.length > 0) {
                    this.ctx.strokeStyle = "rgba(255, 255,255";
                    this.ctx.beginPath();
                    this.ctx.moveTo(shape.points[0].x, shape.points[0].y);
                    for (let i = 1; i < shape.points.length; i++) {
                        this.ctx.lineTo(shape.points[i].x, shape.points[i].y)
                    }
                    this.ctx.stroke();
                    this.ctx.closePath();
                }
            }
        })

    }
    mouseDownHandler = (e: any) => {
        this.clicked = true
        if (this.selectedTool === "pencil") {
            this.currentPencilPoints = [{ x: e.clientX, y: e.clientY }]
        }
        this.startX = e.clientX;
        this.startY = e.clientY;
    }

    mouseUpHandler = (e: any) => {
        this.clicked = false;
        const width = e.clientX - this.startX
        const height = e.clientY - this.startY;

        const selectedTool = this.selectedTool;
        let shape: Shape | null = null;
        if (selectedTool === "rect") {

            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                height,
                width

            }
        } else if (selectedTool === "circle") {
            const radius = Math.max(width, height) / 2;
            shape = {
                type: "circle",
                radius: radius,
                centerX: this.startX + radius,
                centerY: this.startY + radius,
            }
        } else if (selectedTool === "pencil") {
            shape = {
                type: "pencil",
                points: this.currentPencilPoints
            }
        }
        if (!shape) {
            return
        }
        this.existingShapes.push(shape);
        this.clearCanvas();

        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({ shape }),
            roomId: this.roomId
        }))
    }

    mouseMoveHandler = (e: any) => {

        if (this.clicked) {
            const selectedTool = this.selectedTool;

            if (selectedTool === "pencil") {
                this.currentPencilPoints.push({ x: e.clientX, y: e.clientY });
                // Clear the canvas and redraw all finalized shapes...
                this.clearCanvas();
                // ...then redraw the in-progress pencil stroke from currentPencilPoints
                if (this.currentPencilPoints.length > 0) {
                    this.ctx.strokeStyle = "rgba(255, 255, 255)";
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.currentPencilPoints[0].x, this.currentPencilPoints[0].y);
                    for (let i = 1; i < this.currentPencilPoints.length; i++) {
                        this.ctx.lineTo(this.currentPencilPoints[i].x, this.currentPencilPoints[i].y);
                    }
                    this.ctx.stroke();
                    this.ctx.closePath();
                }

            }
            this.clearCanvas();
            this.ctx.strokeStyle = "rgba(255, 255, 255)"
            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;

            console.log(selectedTool)

            if (selectedTool === "rect") {
                this.ctx.strokeRect(this.startX, this.startY, width, height);
            } else if (selectedTool === "circle") {
                const radius = Math.max(width, height) / 2;
                const centerX = this.startX + radius;
                const centerY = this.startY + radius;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        }
    }


    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler);
        this.canvas.addEventListener("mouseup", this.mouseUpHandler);
        this.canvas.addEventListener("mousemove", this.mouseMoveHandler)
    }


}