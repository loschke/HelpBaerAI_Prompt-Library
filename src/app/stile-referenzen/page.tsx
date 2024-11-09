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

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Bildstile & Referenzen
            </h1>      

            {/* Description */}
            <p className="text-2xl text-foreground leading-relaxed">
              Von klassischen Kunstrichtungen bis hin zu modernen Designstilen - finde die perfekte Inspiration für deine kreativen Projekte.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-gray-50 dark:bg-zinc-950">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1536px] mx-auto">
            {/* Content will be added here */}
          </div>
        </div>
      </div>
    </main>
  )
}
