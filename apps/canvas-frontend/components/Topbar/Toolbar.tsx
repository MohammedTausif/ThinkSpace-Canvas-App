import { Baseline, Circle, CircleArrowDown, EraserIcon, Minus, MousePointerClickIcon, MoveDown, Pencil, PencilIcon, RectangleHorizontalIcon, Square, Text, Triangle, TriangleRight } from "lucide-react"
import { Tool } from "../Canvas/Canvas"
import { IconModal } from "../ui/Icons"
import { Plus } from "lucide-react"
interface TopbarProps {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void
}
export const getCursorStyle = ({selectedTool}: any) => {
    if (selectedTool === 'pencil') {
      return 'url("/images/brush_cursor.png") 16 16, auto';
    } else if (selectedTool === 'eraser') {
      return `${<Plus className="size-3"/>}`
    //    'url("/images/eraser_cursor.png") 16 16, auto';
    } else if (selectedTool === 'rect') {
      return 'nwse-resize';
    } else {
      return 'default';
    }
  };

export default function Topbar({ selectedTool, setSelectedTool }: TopbarProps) {
   
    return <div className="fixed top-4 left-[50%] right-[50%] p-1  flex justify-center  items-center rounded-lg shadow-2xl">
        <div className="flex justify-center items-center gap-1.5 text-white bg-blue-600 rounded-lg ">
          <IconModal icon={<Pencil className={`${selectedTool === "pencil"? "text-black": ""}`}/>} onClick={()=>setSelectedTool("pencil")} /> 
          <IconModal icon={<RectangleHorizontalIcon  className={`${selectedTool === "rect"? "text-black": ""}`}/>} onClick={()=> setSelectedTool("rect")} />
          <IconModal icon={<Triangle  className={`${selectedTool === "triangle"? "text-black": ""}`}/>} onClick={()=> setSelectedTool("triangle")} />
          <IconModal icon={<Circle  className={`${selectedTool === "circle"? "text-black": ""}`}/>} onClick={()=> setSelectedTool("circle")} />
          <IconModal icon={<Baseline  className={`${selectedTool === "text"? "text-black": ""}`}/>} onClick={()=>setSelectedTool("text")}  />
          <IconModal icon={<EraserIcon className={`${selectedTool === "eraser"? "text-black": ""}`} />} onClick={()=>setSelectedTool("eraser")} />
          <IconModal icon={<MousePointerClickIcon className={`${selectedTool === "select"? "text-black": ""}`} />} onClick={()=>setSelectedTool("select")}  />
          <IconModal icon={<Minus  className={`${selectedTool === "line"? "text-black": ""}`}/>} onClick={()=>setSelectedTool("line")}  />
          <IconModal icon={<MoveDown  className={`${selectedTool === "arrow"? "text-black": ""}`}/>} onClick={()=>setSelectedTool("arrow")}  />
          <IconModal icon={<Square  className={` rotate-45 ${selectedTool === "rhombus"? "text-black": ""}`}/>} onClick={()=>setSelectedTool("rhombus")}  />
        </div>
    </div>
}

