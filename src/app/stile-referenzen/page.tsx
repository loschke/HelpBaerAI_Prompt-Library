"use client"

import { Badge } from "@/components/ui/badge"
import ConceptSlider from "@/components/concept-slider"

export default function StylesReferencesPage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto space-y-8 text-center">
            {/* Tag */}
            <Badge variant="outline" className="border-neutral-500 text-2xl text-neutral-400 hover:bg-accent/10">
              Kreative Inspiration
            </Badge>

            {/* Heading 
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Bildstile & Referenzen
            </h1>             
            
            */}
     

            {/* Description 
            <p className="text-2xl text-foreground leading-relaxed">
              Von klassischen Kunstrichtungen bis hin zu modernen Designstilen - finde die perfekte Inspiration für deine kreativen Projekte.
            </p>
            
            */}

          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Animated Bear Icon */}
            <div className="animate-bounce">
              <span className="text-6xl">🐻</span>
            </div>

            {/* Coming Soon Text */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent animate-pulse">
                Etwas Großartiges entsteht
              </h2>
              <p className="text-xl text-foreground/80">
                PromptBär arbeitet mit Hochdruck an einer umfangreichen Sammlung von Bildstilen und Referenzen, 
                die deine kreativen Projekte auf ein neues Level heben werden.
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="w-full max-w-md space-y-3">
              <p className="text-xl text-white">
                Wir sind fast fertig! 🚀
              </p>
              <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-3/4 animate-[progress_2s_ease-in-out_infinite]"></div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </main>
  )
}
