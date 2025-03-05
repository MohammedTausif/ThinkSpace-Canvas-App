import { Menu } from "lucide-react"

interface MenuButtonProps{
    onClick: ()=> void;
}
export default function MenuButton({onClick}: MenuButtonProps) {
  return (
    <div>
        <button className=" bg-transparent absolute top-5 left-4" onClick={onClick}>
            <Menu className="size-5 text-white cursor-pointer"/>
        </button>
      
    </div>
  )
}

