import { Circle, CircleArrowDown, Pencil, PencilIcon, RectangleHorizontalIcon } from "lucide-react"
import { Tool } from "../Canvas/Canvas"
import { IconModal } from "../ui/Icons"

interface TopbarProps {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void
}

export default function Topbar({ selectedTool, setSelectedTool }: TopbarProps) {
    return <div className="fixed top-1 p-1 left-[50%] bg-blue-700 rounded-lg">
        <div className="flex gap-3 text-white">
          <IconModal icon={<Pencil/>} onClick={()=>setSelectedTool("pencil")}/> 
          <IconModal icon={<RectangleHorizontalIcon/>} onClick={()=> setSelectedTool("rect")} />
          <IconModal icon={<Circle/>} onClick={()=> setSelectedTool("circle")} />
        </div>
    </div>
}

