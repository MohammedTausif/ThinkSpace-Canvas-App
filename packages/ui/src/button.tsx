"use client"

import { ReactNode } from "react";

interface ButtonProps{
  variant : "primary" | "outline" | "secondary",
  size : "lg" | "sm" ,
  className? : string,
  onClick? : ()=> void
  children : ReactNode
}

const variantStyles = {
  variants: {
    primary : {
      "bg": ""

    }
  }
}

const Button = ({size, className, onClick, variant, children}: ButtonProps)=>{
    return(
        <button 
        className={`${className }
        ${variant === "primary"? "bg-primary" : variant == "secondary" ? " text-secondary-foreground shadow-sm hover:bg-secondary/80" : "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"}
        ${size === "lg" ? "px-4 py-2": "px-2 py-1"}
                 `}
        onClick={onClick}
        
        >
         {children}     
        </button>
    );
}


export {Button}