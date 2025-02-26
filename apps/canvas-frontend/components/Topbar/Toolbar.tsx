import { Baseline, Circle, CircleArrowDown, EraserIcon, MousePointerClickIcon, MoveDown, Pencil, PencilIcon, RectangleHorizontalIcon, Text } from "lucide-react"
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
   
    return <div className="fixed w-full  p-1 top-1 flex justify-center   rounded-lg">
        <div className="flex justify-center items-center gap-3 text-white bg-blue-600 rounded-lg ">
          <IconModal icon={<Pencil className={`${selectedTool === "pencil"? "text-black": ""}`}/>} onClick={()=>setSelectedTool("pencil")} /> 
          <IconModal icon={<RectangleHorizontalIcon  className={`${selectedTool === "rect"? "text-black": ""}`}/>} onClick={()=> setSelectedTool("rect")} />
          <IconModal icon={<Circle  className={`${selectedTool === "circle"? "text-black": ""}`}/>} onClick={()=> setSelectedTool("circle")} />
          <IconModal icon={<Baseline  className={`${selectedTool === "text"? "text-black": ""}`}/>} onClick={()=>setSelectedTool("text")}  />
          <IconModal icon={<EraserIcon className={`${selectedTool === "eraser"? "text-black": ""}`} />} onClick={()=>setSelectedTool("eraser")} />
          <IconModal icon={<MousePointerClickIcon className={`${selectedTool === "pencil"? "text-black": ""}`} />} onClick={()=>setSelectedTool("select")}  />
          <IconModal icon={<MoveDown  className={`${selectedTool === "pencil"? "text-black": ""}`}/>} onClick={()=>setSelectedTool("select")}  />
        </div>
    </div>
}

