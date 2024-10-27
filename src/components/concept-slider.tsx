'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Crown, Unlock } from "lucide-react"
import { SidePanel } from "@/components/ui/side-panel"

interface ConceptSliderProps {
  title: string;
  cards: {
    id: string;
    fields: {
      name: string;
      free: boolean;
      legend?: string;
      status?: string;
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
  }[];
}

export default function ConceptSlider({ title, cards }: ConceptSliderProps) {
  // Filter cards to only show those with status "Fertig"
  const filteredCards = cards.filter(card => card.fields.status === "Fertig")
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCard, setSelectedCard] = useState<typeof cards[0] | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const cardsToShow = 5
  const totalSlides = Math.max(0, filteredCards.length - cardsToShow + 1)

  const nextSlide = () => {
    setCurrentIndex(current => 
      current === totalSlides - 1 ? 0 : current + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex(current => 
      current === 0 ? totalSlides - 1 : current - 1
    )
  }

  const handleCardClick = (card: typeof cards[0]) => {
    setSelectedCard(card)
    setIsPanelOpen(true)
  }

  // Function to process prompt formula and make placeholders bold
  const processPromptFormula = (formula: string) => {
    return formula.replace(/\[([^\]]+)\]/g, '**[$1]**');
  }

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1536px] mx-auto">
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold text-foreground dark:text-white">{title}</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="h-8 w-8 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="h-8 w-8 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
                gap: '1.5rem'
              }}
            >
              {filteredCards.map((card) => (
                <div 
                  key={card.id} 
                  className="flex-none w-full sm:w-1/3 md:w-1/4 lg:w-1/5 px-2"
                  onClick={() => handleCardClick(card)}
                >
                  <div className="rounded-lg overflow-hidden bg-white dark:bg-zinc-900 shadow-md dark:shadow-zinc-900/50 relative cursor-pointer hover:scale-105 transition-transform duration-200">
                    {/* Status Icon */}
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
                          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold dark:text-zinc-100 text-gray-900">
                        {card.fields.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedCard && (
        <SidePanel 
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
          isFree={selectedCard.fields.free}
          examples={selectedCard.fields.examples}
          markdownContent={selectedCard.fields.free ? `## ${selectedCard.fields.name}\n\n### Prompt-Formel\n\n${processPromptFormula(selectedCard.fields.promptFormel || '')}\n\n### Legende\n\n${selectedCard.fields.legend}` : undefined}
        >
          {!selectedCard.fields.free && (
            <div className="text-center py-8">
              <Crown className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Dies ist eine Premium Prompt-Formel. Upgrade jetzt für den Zugriff auf alle Premium-Inhalte.
              </p>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                Upgrade to Premium
              </Button>
            </div>
          )}
        </SidePanel>
      )}
    </section>
  )
}
