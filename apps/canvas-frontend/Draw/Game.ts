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
} | {
    type: "text";                  
    text: string;                   
    x: number;                    
    y: number;  
    // fontSize: number                    
} | {
    type : "arrow";
    startX : number;
    startY: number;
    endX: number;
    endY: number;
} | { 
    // RHOMBUS: New rhombus shape type.
    type: "rhombus";
    x: number;       // Top-left corner of bounding box.
    y: number;
    width: number;   // Width of bounding box.
    height: number;  // Height of bounding box.
}

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private roomId: string;
    private clicked: boolean;
    private startX = 0;
    private startY = 0;
    private selectedTool: Tool = "select";
    private currentPencilPoints: { x: number, y: number }[] = [];
    
    socket: WebSocket;

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.clicked = false;
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
        this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
    }

    setTool(tool: Tool) {
        this.selectedTool = tool;
    }

    async init() {
        this.existingShapes = await getExistingShapes(this.roomId);
        console.log(this.existingShapes);
        this.clearCanvas();
    }

    initHandlers() {
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type == "chat") {
                const parsedData = JSON.parse(data.message);
                this.existingShapes.push(parsedData.shape);
                this.clearCanvas();
            }
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0,0,0)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.existingShapes.forEach((shape) => {
            if (shape.type == "rect") {
                this.ctx.strokeStyle = "rgba(255, 255, 255)";
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "circle") {
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            } else if (shape.type === "pencil") {
                if (shape.points && shape.points.length > 0) {
                    this.ctx.strokeStyle = "rgba(255,255,255)";
                    this.drawSmoothLine(shape.points);
                }
            } else if (shape.type === "text") {
                this.ctx.fillStyle = "rgba(255,255,255)";
                this.ctx.font = "16px Arial";
                this.ctx.fillText(shape.text, shape.x, shape.y);
            } else if (shape.type === "arrow") {
                this.ctx.strokeStyle = "rgba(255,255,255)";
                this.drawArrow(shape.startX, shape.startY, shape.endX, shape.endY);
            }
           
            // RHOMBUS: Render rhombus shape.
            else if (shape.type === "rhombus") {
                this.ctx.strokeStyle = "rgba(255,255,255)";
                this.drawRhombus(shape.x, shape.y, shape.width, shape.height);
            }
        });
    }
    
    private drawSmoothLine(points: { x: number, y: number }[]) {
        if (points.length < 2) return;
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        for (let i = 0; i < points.length - 1; i++) {
            const midX = (points[i].x + points[i + 1].x) / 2;
            const midY = (points[i].y + points[i + 1].y) / 2;
            this.ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
        }
        this.ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    private drawArrow(startX: number, startY: number, endX: number, endY: number) {
        // Draw main line.
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();

        // Calculate the angle of the line.
        const angle = Math.atan2(endY - startY, endX - startX);
        const headLength = 10;
        const arrowX1 = endX - headLength * Math.cos(angle - Math.PI / 6);
        const arrowY1 = endY - headLength * Math.sin(angle - Math.PI / 6);
        const arrowX2 = endX - headLength * Math.cos(angle + Math.PI / 6);
        const arrowY2 = endY - headLength * Math.sin(angle + Math.PI / 6);

        this.ctx.beginPath();
        this.ctx.moveTo(endX, endY);
        this.ctx.lineTo(arrowX1, arrowY1);
        this.ctx.moveTo(endX, endY);
        this.ctx.lineTo(arrowX2, arrowY2);
        this.ctx.stroke();
    }
    
    private drawRhombus(x: number, y: number, width: number, height: number) {
        const topX = x + width / 2;
        const topY = y;
        const rightX = x + width;
        const rightY = y + height / 2;
        const bottomX = x + width / 2;
        const bottomY = y + height;
        const leftX = x;
        const leftY = y + height / 2;
        
        this.ctx.beginPath();
        this.ctx.moveTo(topX, topY);
        this.ctx.lineTo(rightX, rightY);
        this.ctx.lineTo(bottomX, bottomY);
        this.ctx.lineTo(leftX, leftY);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    mouseDownHandler = (e: any) => {
                this.clicked = true;
                const rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                if (this.selectedTool === "rhombus"){
                    this.startX = x;
                    this.startY = y;
                }
                if (this.selectedTool === "arrow") {
                    this.startX = e.clientX;
                    this.startY = e.clientY;
                }
                if (this.selectedTool === "text") {
                    this.startX = e.clientX;
                    this.startY = e.clientY;
                } else if (this.selectedTool === "pencil") {
                    this.currentPencilPoints = [{ x: e.clientX, y: e.clientY }]
                }
                this.startX = e.clientX;
                this.startY = e.clientY;
            }

    mouseUpHandler = (e: any) => {
        this.clicked = false;
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const selectedTool = this.selectedTool;
        let shape: Shape | null = null;
        if (selectedTool === "rect") {
            const width = x - this.startX;
            const height = y - this.startY;
            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                height,
                width
            };
        } else if (selectedTool === "circle") {
            const width = x - this.startX;
            const height = y - this.startY;
            const radius = Math.max(width, height) / 2;
            shape = {
                type: "circle",
                radius: radius,
                centerX: this.startX + radius,
                centerY: this.startY + radius,
            };
        } else if (selectedTool === "pencil") {
            shape = {
                type: "pencil",
                points: this.currentPencilPoints
            };
        } else if (selectedTool === "text") {
            const userText = prompt("Enter text:");
            if (userText && userText.trim() !== "") {
                shape = {
                    type: "text",
                    text: userText,
                    x: this.startX,
                    y: this.startY
                };
            }
        } else if (selectedTool === "arrow") {
            shape = {
                type: "arrow",
                startX: this.startX,
                startY: this.startY,
                endX: x,
                endY: y
            };
        }
        
        // RHOMBUS: New branch for rhombus.
        else if (selectedTool === "rhombus") {
            // Use the bounding box defined by start and current point.
            const width = x - this.startX;
            const height = y - this.startY;
            shape = {
                type: "rhombus",
                x: this.startX,
                y: this.startY,
                width,
                height
            };
        }
        if (!shape) {
            return;
        }
        this.existingShapes.push(shape);
        
        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({ shape }),
            roomId: this.roomId
        }));
        this.clearCanvas();
    };

    mouseMoveHandler = (e: any) => {
        if (this.clicked) {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (this.selectedTool === "pencil") {
                this.currentPencilPoints.push({ x, y });
                this.clearCanvas();
                this.ctx.strokeStyle = "rgba(255,255,255)";
                this.drawSmoothLine(this.currentPencilPoints);
            } else {
                this.clearCanvas();
                this.ctx.strokeStyle = "rgba(255, 255, 255)";
                const width = x - this.startX;
                const height = y - this.startY;
                if (this.selectedTool === "rect") {
                    this.ctx.strokeRect(this.startX, this.startY, width, height);
                } else if (this.selectedTool === "circle") {
                    const radius = Math.max(width, height) / 2;
                    const centerX = this.startX + radius;
                    const centerY = this.startY + radius;
                    this.ctx.beginPath();
                    this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
                    this.ctx.stroke();
                    this.ctx.closePath();
                }
                else if (this.selectedTool === "arrow") {
                    this.drawArrow(this.startX, this.startY, x, y);
                }
                
                // RHOMBUS: Preview drawing of a rhombus.
                else if (this.selectedTool === "rhombus") {
                    this.drawRhombus(this.startX, this.startY, width, height);
                }
                else if(this.selectedTool === "text"){
                    this.ctx.fillStyle = "rgba(255,255,255)";
                    this.ctx.font = "16px Arial";
                    this.ctx.fillText("Your Text Here", this.startX, this.startY);
                }
            }
        }
    };

    initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandler);
        this.canvas.addEventListener("mouseup", this.mouseUpHandler);
        this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
    }
}
