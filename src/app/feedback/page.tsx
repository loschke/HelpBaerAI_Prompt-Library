import { Suspense } from 'react'
import FeedbackForm from '@/components/feedback-form'
import RoadmapSection from '@/components/roadmap-section'
import FullWidthImageStrip from '@/components/full-width-image-strip'
import { Badge } from '@/components/ui/badge'

export default function FeedbackPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto space-y-8 text-center">
            <Badge variant="outline" className="border-neutral-500 text-2xl text-neutral-400 hover:bg-accent/10">
              Community & Entwicklung
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Feedback & Feature-Wünsche
            </h1>      

            <p className="text-2xl text-foreground leading-relaxed">
              Hilf uns dabei, die Plattform zu verbessern und teile deine Ideen mit uns
            </p>
          </div>
        </div>
      </div>
      <FeedbackForm />
      <Suspense fallback={<div>Loading roadmap...</div>}>
        <RoadmapSection />
      </Suspense>
      <FullWidthImageStrip />
      
    </main>
  )
}
