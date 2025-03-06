import { Tool } from "@/components/Canvas/Canvas";
import getExistingShapes from "./FetchShapes";

type Shape = {
    id?: number,
    type: "rect",
    x: number,
    y: number,
    width: number,
    height: number
} | {
    id?: number
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;

} | {
    id?: number
    type: "pencil";
    points: { x: number, y: number }[];

} | {
    id?: number
    type: "text";
    text: string;
    x: number;
    y: number;

} | {
    id?: number
    type: "arrow";
    startX: number;
    startY: number;
    endX: number;
    endY: number;

} | {
    id?: number
        type: "rhombus";
        x: number;
        y: number;
        width: number;
        height: number;
} | {
    // TRIANGLE: New triangle shape type.
    id?: number

    type: "triangle";
    topX: number;
    topY: number;
    bottomLeftX: number;
    bottomLeftY: number;
    bottomRightX: number;
    bottomRightY: number;

} | {
    id?: number
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
    // private id?  = Number; 
    private selectedTool: Tool = "select";
    private currentPencilPoints: { x: number, y: number }[] = [];
    public onShapeDrawn?: () => void;

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
        this.initShapes();
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
        if (this.selectedTool !== "move") return;

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
        if (this.selectedTool !== "move") return;
        else {
            this.isPanning = true;
            this.panStartX = event.clientX - this.offsetX;
            this.panStartY = event.clientY - this.offsetY;
        }
    };

    private panCanvas = (event: MouseEvent) => {
        if (!this.isPanning) return;
        // Only pan if selected tool is active.
        if (this.selectedTool !== "move") return;
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

    async initShapes(){
      this.existingShapes = await getExistingShapes(this.roomId)
    }

    initHandlers() {
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type == "chat") {
                const parsedData = JSON.parse(data.message);
                this.existingShapes.push(parsedData.shape);
                this.clearCanvas();
            }
            else if(data.type === "delete"){
              const shapeId = data.shapeId;
              this.existingShapes = this.existingShapes.filter(s=>s.id !== shapeId)
              this.clearCanvas();
            }
            else if(data.type === "update"){
              const parsedData = JSON.parse(data.message)
              const {shape, shapeId} = parsedData
              const idx = this.existingShapes.findIndex(s => s.id === shapeId)
              if(idx >= 0){
                this.existingShapes[idx] = shape;
              }
              this.clearCanvas();
            }
        }
    }

    // get shape details for editing: eraser etc...
    private hitTest(x: number, y: number): Shape | null {
      for (let i = this.existingShapes.length - 1; i >= 0; i--) {
        const shape = this.existingShapes[i];
        if (shape.type === "rect") {
          if (x >= shape.x && x <= shape.x + shape.width &&
              y >= shape.y && y <= shape.y + shape.height) return shape;
        } else if (shape.type === "circle") {
          const dx = x - shape.centerX;
          const dy = y - shape.centerY;
          if (Math.sqrt(dx * dx + dy * dy) <= shape.radius) return shape;
        } else if (shape.type === "pencil") {
          for (let pt of shape.points) {
            const dx = x - pt.x;
            const dy = y - pt.y;
            if (Math.sqrt(dx * dx + dy * dy) <= 5) return shape;
          }
        } else if (shape.type === "text") {
          if (x >= shape.x && x <= shape.x + 100 && y >= shape.y - 16 && y <= shape.y) return shape;
        } else if (shape.type === "arrow") {
          const minX = Math.min(shape.startX, shape.endX);
          const maxX = Math.max(shape.startX, shape.endX);
          const minY = Math.min(shape.startY, shape.endY);
          const maxY = Math.max(shape.startY, shape.endY);
          if (x >= minX && x <= maxX && y >= minY && y <= maxY) return shape;
        } else if (shape.type === "rhombus") {
          if (x >= shape.x && x <= shape.x + shape.width &&
              y >= shape.y && y <= shape.y + shape.height) return shape;
        } else if (shape.type === "triangle") {
          const minX = Math.min(shape.topX, shape.bottomLeftX, shape.bottomRightX);
          const maxX = Math.max(shape.topX, shape.bottomLeftX, shape.bottomRightX);
          const minY = Math.min(shape.topY, shape.bottomLeftY, shape.bottomRightY);
          const maxY = Math.max(shape.topY, shape.bottomLeftY, shape.bottomRightY);
          if (x >= minX && x <= maxX && y >= minY && y <= maxY) return shape;
        } else if (shape.type === "line") {
          const minX = Math.min(shape.startX, shape.endX);
          const maxX = Math.max(shape.startX, shape.endX);
          const minY = Math.min(shape.startY, shape.endY);
          const maxY = Math.max(shape.startY, shape.endY);
          if (x >= minX && x <= maxX && y >= minY && y <= maxY) return shape;
        }
      }
      return null;
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
            if (shape.type === "rect") {
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
        const { x, y } = this.getWorldCoordinates(e); // COORD FIX
        if(this.selectedTool ==="eraser"){
          this.clearCanvas()
          this.initShapes()
          const hitShape = this.hitTest(x,y)
          if(hitShape && hitShape.id !== undefined){
            console.log("shaped id came")
            // Remove shape By its Id
            this.existingShapes = this.existingShapes.filter(s => s.id !== hitShape.id);
            // Send delete shape message with shape id to websocket server
            this.socket.send(JSON.stringify({
              type: "delete",
              shapeId : hitShape.id,
              roomId: this.roomId
            }));
            this.clearCanvas();
          } 
          console.log("shape id:" , hitShape?.id)
          // if(this.onShapeDrawn){ this.onShapeDrawn() }
          this.clicked = false;
          return
        }
       // For tools such as pencil etc ..
        this.clicked = true;
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
        this.initShapes();
        
        
        if (this.onShapeDrawn) {
            this.onShapeDrawn();
        }

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