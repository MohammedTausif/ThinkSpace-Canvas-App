import { Baseline, Circle, CircleArrowDown, EraserIcon, MousePointerClickIcon, MoveDown, Pencil, PencilIcon, RectangleHorizontalIcon, Text } from "lucide-react"
import { Tool } from "../Canvas/Canvas"
import { IconModal } from "../ui/Icons"

interface TopbarProps {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void
}

export default function Topbar({ selectedTool, setSelectedTool }: TopbarProps) {
    return <div className="fixed w-full  p-1 top-1 flex justify-center   rounded-lg">
        <div className="flex justify-center items-center gap-3 text-white bg-blue-600 rounded-lg ">
          <IconModal icon={<Pencil/>} onClick={()=>setSelectedTool("pencil")}/> 
          <IconModal icon={<RectangleHorizontalIcon/>} onClick={()=> setSelectedTool("rect")} />
          <IconModal icon={<Circle/>} onClick={()=> setSelectedTool("circle")} />
          <IconModal icon={<Baseline/>} onClick={()=>setSelectedTool("text")} />
          <IconModal icon={<EraserIcon/>} onClick={()=>setSelectedTool("eraser")} />
          <IconModal icon={<MousePointerClickIcon/>} onClick={()=>setSelectedTool("select")} className={`${selectedTool ==="select"? "bg-gray-700 rounded-[10px]": ""}`} />
          <IconModal icon={<MoveDown className="w-6 h-5"/>} onClick={()=>setSelectedTool("select")} className={`${selectedTool ==="text"? "bg-gray-700 rounded-[10px]": ""}`} />
        </div>
    </div>
}

