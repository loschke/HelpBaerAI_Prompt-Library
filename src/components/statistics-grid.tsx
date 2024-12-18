import React from 'react'
import Image from 'next/image'
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"

const StatisticsGrid = () => {
  return (
    <div className="w-full bg-[#0A0A0A] py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-black italic text-neutral-200 mb-6 text-center">
            Zahlen, die für sich sprechen.
          </h2>
          <p className="text-2xl text-neutral-400 text-center max-w-5xl mx-auto">
            Die unendliche Prompt-Bibliothek für dein nächstes Projekt. Fehlt dir etwas? Kein Problem, wir haben es oder wir generieren es.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* First Stat */}
          <div className="text-center p-6 bg-background rounded-lg border border-[#2A2A2A]">
            <div className="text-primary text-6xl font-bold mb-2">80+</div>
            <h3 className="text-white text-2xl font-bold mb-2">Prompt-Formeln</h3>
            <p className="text-gray-400 text-lg">Für jeden Anwendungsfall die passende Formel</p>
          </div>

          {/* Second Stat */}
            <div className="text-center p-6 bg-background rounded-lg border border-[#2A2A2A]">
            <div className="text-primary text-6xl font-bold mb-2">1.000+</div>
            <h3 className="text-white text-2xl font-bold mb-2">Beispielbilder</h3>
            <p className="text-gray-400 text-lg">Mit kompletten Prompts zum Nachbauen</p>
          </div>

          {/* Third Stat */}
            <div className="text-center p-6 bg-background rounded-lg border border-[#2A2A2A]">
            <div className="text-primary text-6xl font-bold mb-2">300+</div>
            <h3 className="text-white text-2xl font-bold mb-2">Stile & Referenzen</h3>
            <p className="text-gray-400 text-lg">Kreative und konsistente Bildstyles auf Knopfdruck</p>
          </div>

          {/* Fourth Stat */}
          <div className="text-center p-6 bg-background rounded-lg border border-[#2A2A2A]">
            <div className="text-primary text-6xl font-bold mb-2">∞</div>
            <h3 className="text-white text-2xl font-bold mb-2">Möglichkeiten</h3>
            <p className="text-gray-400 text-lg">Durch cleveres Mixen entstehen unendlich  neue Ideen</p>
          </div>
        </div>

        {/* Logos Section */}
        <div className="mt-16 text-center">
          <p className="text-base text-muted-foreground mb-4">Eine Kollaboration von:</p>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <Image 
              src="/images/logos/queonext_logo_2.svg" 
              alt="queonext" 
              width={120} 
              height={48} 
              className="opacity-80 hover:opacity-100 transition-all filter grayscale hover:grayscale-0" 
            />
            <Image 
              src="/images/logos/ai-design-guide_logo_2.svg" 
              alt="AI-Design-Guide" 
              width={200} 
              height={60} 
              className="opacity-80 hover:opacity-100 transition-all filter grayscale hover:grayscale-0" 
            />
            <Image 
              src="/images/logos/move_elevator_logo_neu.svg" 
              alt="Move Elevator" 
              width={180} 
              height={55} 
              className="opacity-80 hover:opacity-100 transition-all filter grayscale hover:grayscale-0" 
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-16">
          <Button size="lg" className="px-8 py-6 text-xl" asChild>
            <a href="/prompt-formeln">
              <ArrowRight className="mr-2 h-5 w-5" />
              <span className="block sm:hidden">Prompt-Formeln</span>
              <span className="hidden sm:block">Alle Prompt-Formeln entdecken</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatisticsGrid
