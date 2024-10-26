'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ConceptSliderProps {
  title: string;
  cards: {
    id: string;
    fields: {
      name: string;
      referenceImage: {
        thumbnails: {
          large: {
            url: string;
          };
        };
      }[];
    };
  }[];
}

export default function ConceptSlider({ title, cards }: ConceptSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardsToShow = 5
  const totalSlides = Math.max(0, cards.length - cardsToShow + 1)

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
              {cards.map((card) => (
                <div 
                  key={card.id} 
                  className="flex-none w-full sm:w-1/3 md:w-1/4 lg:w-1/5 px-2"
                >
                  <div className="rounded-lg overflow-hidden bg-white dark:bg-zinc-900 shadow-md dark:shadow-zinc-900/50">
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
    </section>
  )
}
