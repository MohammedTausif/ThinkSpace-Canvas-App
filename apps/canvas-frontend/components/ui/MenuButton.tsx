import { CrossIcon, Menu, MenuIcon, X } from "lucide-react"

interface MenuButtonProps {
  onClick: () => void;
  isOpen: boolean
}
export default function MenuButton({ onClick, isOpen }: MenuButtonProps) {
  return (
    <div>
      <button className=" bg-transparent absolute top-5 left-4 transform transition-all duration-300" onClick={onClick}>
        {
          isOpen && <X className="text-white size-5 cursor-pointer" />
        }
        {
          !isOpen && <Menu className="text-white size-5 cursor-pointer" />
        }
      </button>

    </div>
  )
}

