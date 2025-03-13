import { Github, Linkedin } from "lucide-react"
import Link from "next/link"


function Footer() {
  return (
    <footer className="border-t">
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © 2025 CollabxCanvas. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <Link
            href={'https://github.com/MohammedTausif/ThinkSpace-Canvas-App.git'}
            target="_blank"
            className="text-muted-foreground hover:text-primary"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link href={'https://www.linkedin.com/in/tausif-ahmed-01a416253/'} target="_blank" className="text-muted-foreground hover:text-primary">
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer
