import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const StatisticsGrid = () => {
  return (
    <div className="w-full bg-[#0A0A0A] py-24">
      <div className="container mx-auto px-4">
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
          <p className="text-base text-muted-foreground mb-4">In Zusammenarbeit mit:</p>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <Image 
              src="/images/logos/queonext_logo_2.svg" 
              alt="queonext" 
              width={100} 
              height={40} 
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
              src="/images/logos/branding.svg" 
              alt="Move Elevator" 
              width={220} 
              height={65} 
              className="opacity-80 hover:opacity-100 transition-all filter grayscale hover:grayscale-0" 
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-16">
          <Button size="lg" className="px-8 py-6 text-xl" asChild>
            <a href="/prompt-formeln">
              <ArrowRight className="mr-2 h-5 w-5" />
              Alle Prompt-Formeln entdecken
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatisticsGrid
