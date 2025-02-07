import { ReactNode } from "react"
import { type JSX } from "react"


interface CardProps {
    className?: string,
    title?: string,
    children?: ReactNode,
    href?: string

}


const Card = ({className, title, children, href }: CardProps): JSX.Element=> {
  return (  <a
    className={className}
    href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
    rel="noopener noreferrer"
    target="_blank"
  >
    <h2>
      {title} <span>-&gt;</span>
    </h2>
    <div>{children}</div>
  </a>
  )

}

export {Card}