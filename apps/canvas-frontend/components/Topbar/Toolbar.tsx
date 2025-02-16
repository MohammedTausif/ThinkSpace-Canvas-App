import { Circle, CircleArrowDown, Pencil, PencilIcon, RectangleHorizontalIcon } from "lucide-react"
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
        </div>
    </div>
}

