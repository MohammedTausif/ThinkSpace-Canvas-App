import { Card } from '@repo/ui/card'
import { Share2, Sparkles, Users2 } from 'lucide-react'

function Features() {
    return (
        <section className="py-24 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                    <Card className="p-6 border-2 hover:border-primary transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Share2 className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold">Real-time Collaboration</h3>
                        </div>
                        <div className="mt-4 text-muted-foreground">
                            Work together with your team in real-time. Share your drawings instantly with a simple link.
                        </div>
                    </Card>

                    <Card className="p-6 border-2 hover:border-primary transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Users2 className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold">Multiplayer Editing</h3>
                        </div>
                        <div className="mt-4 text-muted-foreground">
                            Multiple users can edit the same canvas simultaneously. See who's drawing what in real-time.
                        </div>
                    </Card>

                    <Card className="p-6 border-2 hover:border-primary transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Sparkles className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold">Smart Drawing</h3>
                        </div>
                        <div className="mt-4 text-muted-foreground">
                            Intelligent shape recognition and drawing assistance helps you create perfect diagrams.
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default Features
