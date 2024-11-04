"use client"

import React, { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

const images = [
  "/images/landscapes.png",
  "/images/illustrations.png",
  "/images/foodporn.png",
  "/images/mockups.jpg",
  "/images/gradients.png",
  "/images/texteffekte.jpg"
]

export default function FullWidthImageStrip() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth
      const currentScroll = scrollContainerRef.current.scrollLeft
      const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth

      let newScroll = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount
      newScroll = Math.max(0, Math.min(newScroll, maxScroll))

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      })

      setShowLeftArrow(newScroll > 0)
      setShowRightArrow(newScroll < maxScroll)
    }
  }

  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((src, index) => (
          <div key={index} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/6 aspect-square">
            <img
              src={src}
              alt={`AI Generated Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {showLeftArrow && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm border-primary/20"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      {showRightArrow && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm border-primary/20"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </section>
  )
}
