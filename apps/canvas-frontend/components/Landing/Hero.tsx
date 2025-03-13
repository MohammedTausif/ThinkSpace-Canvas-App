import Link from "next/link"
import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import { Pencil, Share2, Users2, Sparkles, Github, Download, Linkedin, ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen bg-background mt-5">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
              Collaborative Whiteboarding
              <span className="text-primary block">Made Simple</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Create, collaborate, and share beautiful diagrams and sketches with our intuitive drawing tool.
              No sign-up required.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href={"/signin"}>
              <Button variant={"primary"} size="lg" className="h-12 px-6 flex  justify-center items-center rounded-full outline-none text-white font-semibold text-sm">
                  Get Started  <ChevronRight className="ml-1 h-4 w-4 " />
              </Button>
                </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg" className="flex justify-center items-center font-semibold text-sm h-12 px-6  rounded-full bg-transparent border border-gray-200 hover:bg-gray-100">
                  Star on GitHub
                  <Github className="ml-2 h-4 w-4"/>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Hero
