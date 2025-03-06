import { Baseline, Circle, CircleArrowDown, EraserIcon, Hand, Minus, MousePointerClickIcon, MoveDown, Pencil, PencilIcon, RectangleHorizontalIcon, Square, Text, Triangle, TriangleRight } from "lucide-react"
import { Tool } from "../Canvas/Canvas"
import { IconModal } from "../ui/Icons"
import { useEffect } from "react";

interface TopbarProps {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void
}
export const getCursorStyle = ({selectedTool}: {selectedTool : Tool}) => {
    if (selectedTool === "move"){
      return 'grab'
    }
    if (selectedTool === "select"){
      return 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/9632/heart.svg), auto;'
    }
     else {
      return 'cell';
    }
  };

export default function Topbar({ selectedTool, setSelectedTool }: TopbarProps) {
  
    return <div className="fixed top-4 left-[50%] right-[50%] p-1  flex justify-center  items-center rounded-lg shadow-2xl">
        <div className="flex justify-center items-center gap-1.5 text-white bg-blue-600 rounded-lg ">
          <IconModal icon={<Hand   className={` rotate-45 ${selectedTool === "move"? "text-black": ""}`}/>}  onClick={()=>setSelectedTool("move")}  />
          <IconModal icon={<Pencil className={`${selectedTool === "pencil"? "text-black": ""}`}/>} onClick={()=>setSelectedTool("pencil")} /> 
          <IconModal icon={<RectangleHorizontalIcon  className={`${selectedTool === "rect"? "text-black": ""}`}/>} onClick={()=> setSelectedTool("rect")} />
          <IconModal icon={<Triangle  className={`${selectedTool === "triangle"? "text-black": ""}`}/>} onClick={()=> setSelectedTool("triangle")} />
          <IconModal icon={<Circle  className={`${selectedTool === "circle"? "text-black": ""}`}/>} onClick={()=> setSelectedTool("circle")} />
          <IconModal icon={<Baseline  className={`${selectedTool === "text"? "text-black": ""}`}/>} onClick={()=>setSelectedTool("text")}  />
          <IconModal icon={<EraserIcon className={`${selectedTool === "eraser"? "text-black": ""}`} />} onClick={()=>setSelectedTool("eraser")} />
          <IconModal icon={<MousePointerClickIcon className={`${selectedTool === "select"? "text-black": ""}`} />} onClick={()=>setSelectedTool("select")}  />
          <IconModal icon={<Minus  className={`${selectedTool === "line"? "text-black": ""}`}/>} onClick={()=>setSelectedTool("line")}  />
          <IconModal icon={<MoveDown  className={`${selectedTool === "arrow"? "text-black": ""}`}/>} onClick={()=>setSelectedTool("arrow")}  />
          <IconModal icon={<Square   className={` rotate-45 ${selectedTool === "rhombus"? "text-black": ""}`}/>}  onClick={()=>setSelectedTool("rhombus")}  />
        </div>
    </div>
}

