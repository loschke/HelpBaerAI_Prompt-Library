'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const conceptCards = [
  { title: 'Logo', image: '/images/mockups.jpg' },
  { title: 'Print Cover', image: '/images/macros.jpg' },
  { title: 'Print Innen', image: '/images/scrollstopper.jpg' },
  { title: 'Branding Kits', image: '/images/SelectiveColor.jpg' },
  { title: '3D Prototyping', image: '/images/texteffekte.jpg' },
  { title: 'Logo', image: '/images/mockups.jpg' },
  { title: 'Print Cover', image: '/images/macros.jpg' },
  { title: 'Print Innen', image: '/images/scrollstopper.jpg' },
  { title: 'Branding Kits', image: '/images/SelectiveColor.jpg' },
  { title: '3D Prototyping', image: '/images/texteffekte.jpg' },
  { title: 'Logo', image: '/images/mockups.jpg' },
  { title: 'Print Cover', image: '/images/macros.jpg' },
  { title: 'Print Innen', image: '/images/scrollstopper.jpg' },
  { title: 'Branding Kits', image: '/images/SelectiveColor.jpg' },
  { title: '3D Prototyping', image: '/images/texteffekte.jpg' },
]

export default function ConceptSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardsToShow = 5 // Updated to show 5 cards at once
  const totalSlides = conceptCards.length - cardsToShow + 1

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
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Konzept und Prototyping</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="h-8 w-8"
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
            {conceptCards.map((card, index) => (
              <div 
                key={index} 
                className="flex-none w-full sm:w-1/3 md:w-1/4 lg:w-1/5 px-2"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-square relative w-full">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
