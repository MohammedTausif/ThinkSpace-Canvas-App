import { Menu } from "lucide-react"

function Menubar() {
  return (
    <div>
        <button className=" bg-transparent absolute top-5 left-4">
            <Menu className="size-5 text-white cursor-pointer"/>
        </button>
      
    </div>
  )
}

export default Menubar
