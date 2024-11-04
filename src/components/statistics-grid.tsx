import React from 'react'

const StatisticsGrid = () => {
  return (
    <div className="w-full bg-[#0A0A0A] py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* First Stat */}
          <div className="text-center p-6 bg-background rounded-lg border border-[#2A2A2A]">
            <div className="text-primary text-5xl font-bold mb-2">80+</div>
            <h3 className="text-white text-xl font-bold mb-2">Prompt-Formeln</h3>
            <p className="text-gray-400">Für jeden Anwendungsfall die passende Formel</p>
          </div>

          {/* Second Stat */}
            <div className="text-center p-6 bg-background rounded-lg border border-[#2A2A2A]">
            <div className="text-primary text-5xl font-bold mb-2">1.000+</div>
            <h3 className="text-white text-xl font-bold mb-2">Beispielbilder</h3>
            <p className="text-gray-400">Mit kompletten Prompts zum Nachbauen</p>
          </div>

          {/* Third Stat */}
            <div className="text-center p-6 bg-background rounded-lg border border-[#2A2A2A]">
            <div className="text-primary text-5xl font-bold mb-2">300+</div>
            <h3 className="text-white text-xl font-bold mb-2">Stile & Referenzen</h3>
            <p className="text-gray-400">Kreative und konsistente Bildstyles auf Knopfdruck</p>
          </div>

          {/* Fourth Stat */}
          <div className="text-center p-6 bg-background rounded-lg border border-[#2A2A2A]">
            <div className="text-primary text-5xl font-bold mb-2">∞</div>
            <h3 className="text-white text-xl font-bold mb-2">Möglichkeiten</h3>
            <p className="text-gray-400">Durch cleveres Mixen entstehen unendlich  neue Ideen</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatisticsGrid
