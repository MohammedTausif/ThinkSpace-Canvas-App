import { Button } from '@repo/ui/button'


function Cta() {
  return (
    <section className="py-24">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-primary rounded-3xl p-8 sm:p-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to start creating?
          </h2>
          <div className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
            Join thousands of users who are already creating amazing diagrams and sketches.
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" variant="secondary" className="h-12 px-6 hover:bg-primary-foreground flex justify-center items-center text-white border rounded hover:text-primary">
              Open Canvas
              {/* <Pencil className="ml-2 h-4 w-4" /> */}
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-6 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary rounded">
              View Gallery
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>

  )
}

export default Cta
