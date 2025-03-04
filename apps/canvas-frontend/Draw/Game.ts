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
} | {
    type: "arrow";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
} | {
    type: "rhombus";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    // TRIANGLE: New triangle shape type.
    type: "triangle";
    topX: number;
    topY: number;
    bottomLeftX: number;
    bottomLeftY: number;
    bottomRightX: number;
    bottomRightY: number;
} | {
    type: "line";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
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

    //  Panning & Zooming Variables 
    private offsetX = 0;
    private offsetY = 0;
    private scale = 1;
    private isPanning = false;
    private panStartX = 0;
    private panStartY = 0;

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
        this.initPanZoomHandlers();
    }


    private initPanZoomHandlers() {
        this.canvas.addEventListener("wheel", this.handleZoom);
        this.canvas.addEventListener("mousedown", this.startPan);
        this.canvas.addEventListener("mousemove", this.panCanvas);
        this.canvas.addEventListener("mouseup", this.stopPan);
        this.canvas.addEventListener("mouseleave", this.stopPan);
    }

    private handleZoom = (event: WheelEvent) => {
        //Only zoom if select tool is active.
        if (this.selectedTool !== "select") return;

        event.preventDefault();
        const zoomSpeed = 0.05;
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const zoomFactor = event.deltaY < 0 ? 1 + zoomSpeed : 1 - zoomSpeed;
        const newScale = this.scale * zoomFactor;
        if (newScale < 0.5 || newScale > 3) return;
        this.offsetX = mouseX - ((mouseX - this.offsetX) * zoomFactor);
        this.offsetY = mouseY - ((mouseY - this.offsetY) * zoomFactor);
        this.scale = newScale;
        this.clearCanvas();
    };

    private startPan = (event: MouseEvent) => {
        //  Only pan if select tool is active.
        if (this.selectedTool !== "select") return;
        else {
            this.isPanning = true;
            this.panStartX = event.clientX - this.offsetX;
            this.panStartY = event.clientY - this.offsetY;
        }
    };

    private panCanvas = (event: MouseEvent) => {
        if (!this.isPanning) return;
        // Only pan if selected tool is active.
        if (this.selectedTool !== "select") return;
        this.offsetX = event.clientX - this.panStartX;
        this.offsetY = event.clientY - this.panStartY;
        this.clearCanvas();
    };

    private stopPan = () => {
        this.isPanning = false;
    };

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
        if (this.ctx.resetTransform) {
            this.ctx.resetTransform();
        } else {
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0,0,0)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.setTransform(this.scale, 0, 0, this.scale, this.offsetX, this.offsetY);

        this.existingShapes.forEach((shape) => {
            this.ctx.strokeStyle = "rgba(255,255,255)";
            if (shape.type == "rect") {
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "circle") {
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            } else if (shape.type === "pencil") {
                this.drawSmoothLine(shape.points);
            } else if (shape.type === "text") {
                this.ctx.fillStyle = "rgba(255,255,255)";
                this.ctx.font = "16px Arial";
                this.ctx.fillText(shape.text, shape.x, shape.y);
            } else if (shape.type === "arrow") {
                this.drawArrow(shape.startX, shape.startY, shape.endX, shape.endY);
            } else if (shape.type === "rhombus") {
                this.drawRhombus(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "triangle") {
                this.ctx.beginPath();
                this.ctx.moveTo(shape.topX, shape.topY);
                this.ctx.lineTo(shape.bottomRightX, shape.bottomRightY);
                this.ctx.lineTo(shape.bottomLeftX, shape.bottomLeftY);
                this.ctx.closePath();
                this.ctx.stroke();
            }
            else if (shape.type === "line") {
                this.ctx.beginPath();
                this.ctx.moveTo(shape.startX, shape.startY);
                this.ctx.lineTo(shape.endX, shape.endY);
                this.ctx.stroke();
                this.ctx.closePath();
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
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();

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

    // Convert World Coordinate  
    private getWorldCoordinates(e: any): { x: number, y: number } {
        const rect = this.canvas.getBoundingClientRect();
        const canvasX = e.clientX - rect.left;
        const canvasY = e.clientY - rect.top;
        return {
            x: (canvasX - this.offsetX) / this.scale,
            y: (canvasY - this.offsetY) / this.scale
        };
    }

    // Always update start coordinates using world coordinates.
    mouseDownHandler = (e: any) => {
        this.clicked = true;
        const { x, y } = this.getWorldCoordinates(e); // COORD FIX
        this.startX = x;
        this.startY = y;
        if (this.selectedTool === "pencil") {
            this.currentPencilPoints = [{ x, y }];  // Clear pencil points for new stroke.
        }
    };

    mouseUpHandler = (e: any) => {
        this.clicked = false;
        const { x, y } = this.getWorldCoordinates(e); // COORD FIX
        const selectedTool = this.selectedTool;
        let shape: Shape | null = null;
        if (selectedTool === "rect") {
            const width = x - this.startX;
            const height = y - this.startY;
            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                width,
                height
            };
        } else if (selectedTool === "circle") {
            const width = x - this.startX;
            const height = y - this.startY;
            const radius = Math.max(width, height) / 2;
            shape = {
                type: "circle",
                radius,
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
        } else if (selectedTool === "rhombus") {
            const width = x - this.startX;
            const height = y - this.startY;
            shape = {
                type: "rhombus",
                x: this.startX,
                y: this.startY,
                width,
                height
            };
        } else if (selectedTool === "line") {
            shape = {
                type: "line",
                startX: this.startX,
                startY: this.startY,
                endX: x,
                endY: y
            }
        }
        else if (selectedTool === "triangle") {
            // Create triangle using bounding box.
            const boxX = Math.min(this.startX, x);
            const boxY = Math.min(this.startY, y);
            const boxWidth = Math.abs(x - this.startX);
            const boxHeight = Math.abs(y - this.startY);
            shape = {
                type: "triangle",
                topX: boxX + boxWidth / 2,
                topY: boxY,
                bottomLeftX: boxX,
                bottomLeftY: boxY + boxHeight,
                bottomRightX: boxX + boxWidth,
                bottomRightY: boxY + boxHeight
            };
        }
        if (!shape) return;
        this.existingShapes.push(shape);
        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({ shape }),
            roomId: this.roomId
        }));
        this.clearCanvas();
        this.selectedTool= "select"
    };

    mouseMoveHandler = (e: any) => {
        if (this.clicked) {
            const { x, y } = this.getWorldCoordinates(e); // COORD FIX
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
                } else if (this.selectedTool === "arrow") {
                    this.drawArrow(this.startX, this.startY, x, y);
                } else if (this.selectedTool === "rhombus") {
                    this.drawRhombus(this.startX, this.startY, width, height);
                } else if (this.selectedTool === "line") {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.startX, this.startY);
                    this.ctx.lineTo(x, y);
                    this.ctx.stroke();
                    this.ctx.closePath();
                } else if (this.selectedTool === "triangle") {
                    const boxX = Math.min(this.startX, x);
                    const boxY = Math.min(this.startY, y);
                    const boxWidth = Math.abs(x - this.startX);
                    const boxHeight = Math.abs(y - this.startY);
                    this.ctx.beginPath();
                    this.ctx.moveTo(boxX + boxWidth / 2, boxY);
                    this.ctx.lineTo(boxX, boxY + boxHeight);
                    this.ctx.lineTo(boxX + boxWidth, boxY + boxHeight);
                    this.ctx.closePath();
                    this.ctx.stroke();
                } else if (this.selectedTool === "text") {
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
