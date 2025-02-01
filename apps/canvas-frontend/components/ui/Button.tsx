"use client"
import * as React from 'react'
interface ButtonProps
extends React.ButtonHTMLAttributes<HTMLButtonElement>
{

}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
 ({title, className} , ref)=>{
    return(
        <button className={` bg-gradient-to-b from-blue-400 to-blue-700 font-medium hover:opacity-80 transition-all duration-300 text-white h-11 px-8  rounded-md ${className} `}
        ref={ref}>
         {title}     
        </button>
    );
},
);

Button.displayName = 'Button'
export {Button}