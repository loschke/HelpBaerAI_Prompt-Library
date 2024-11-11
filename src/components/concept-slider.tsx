'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Crown, Unlock } from "lucide-react"
import { SidePanel } from "@/components/ui/side-panel"

interface PromptCard {
  id: string;
  fields: {
    name: string;
    free: boolean;
    legend?: string;
    promptFormel?: string;
    referenceImage: {
      url: string;
      thumbnails: {
        small: {
          url: string;
        };
        large: {
          url: string;
        };
      };
    }[];
    examples?: {
      url: string;
      filename: string;
      thumbnails?: {
        small: { url: string; width: number; height: number };
        large: { url: string; width: number; height: number };
      };
    }[];
  };
}

interface ConceptSliderProps {
  cards: PromptCard[];
  session: any;
}

export default function ConceptSlider({ cards = [], session }: ConceptSliderProps) {
  const [selectedCard, setSelectedCard] = useState<PromptCard | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [showOnlyFree, setShowOnlyFree] = useState(false)

  // Filter cards based on free status
  const displayedCards = showOnlyFree ? cards.filter(card => card.fields.free) : cards;

  const handleCardClick = (card: PromptCard) => {
    setSelectedCard(card)
    setIsPanelOpen(true)
  }

  const processPromptFormula = (formula: string) => {
    return formula.replace(/\[([^\]]+)\]/g, '**[$1]**');
  }

  return (
    <div className="w-full">
      {/* Controls - Fixed at top */}
      <div className="top-8 z-10 py-8 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-[1536px] mx-auto">
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={showOnlyFree}
              onChange={(e) => setShowOnlyFree(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Nur FREE Prompt Formeln anzeigen
            </span>
          </label>
        </div>
      </div>

      {/* Card Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1536px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedCards.map((card) => (
              <div 
                key={card.id}
                onClick={() => handleCardClick(card)}
                className="rounded-lg overflow-hidden bg-white dark:bg-zinc-900 shadow-md dark:shadow-zinc-900/50 relative cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                <div className="absolute top-2 right-2 z-10 bg-white dark:bg-zinc-900 rounded-full p-1.5 shadow-lg">
                  {card.fields.free ? (
                    <Unlock className="w-4 h-4 text-green-500" />
                  ) : (
                    <Crown className="w-4 h-4 text-amber-500" />
                  )}
                </div>
                
                {card.fields.referenceImage && card.fields.referenceImage[0] && (
                  <div className="aspect-square relative w-full">
                    <img
                      src={card.fields.referenceImage[0].thumbnails.large.url}
                      alt={card.fields.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold dark:text-zinc-100 text-gray-900">
                    {card.fields.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedCard && (
        <SidePanel 
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
          isFree={selectedCard.fields.free}
          examples={selectedCard.fields.examples}
          session={session}
          markdownContent={
            `## ${selectedCard.fields.name}\n\n### Prompt-Formel\n\n${processPromptFormula(selectedCard.fields.promptFormel || '')}\n\n### Legende\n\n${selectedCard.fields.legend}`
          }
        >
          {/* This section is no longer needed as the markdownContent will handle the premium content */}
        </SidePanel>
      )}
    </div>
  )
}
