
import { ReactNode } from "react";

export interface IconProps{
    icon: ReactNode,
    onClick: ()=> void
}
export function IconModal ({icon, onClick}: {icon: ReactNode,onClick: ()=> void }){

    return <div className="pointer rounded-full boer p-2" onClick={onClick}>
            {icon}
    </div>

}