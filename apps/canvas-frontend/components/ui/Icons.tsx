
import { ReactNode } from "react";

export interface IconProps{
    icon: ReactNode,
    onClick: ()=> void,
    className?: any
}
export function IconModal ({icon, onClick, className}: IconProps){

    return <div className={`pointer rounded-full  p-2.5 ,${className}`} onClick={onClick}>
            {icon}
    </div>

}