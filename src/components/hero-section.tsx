"use client"

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Video } from 'lucide-react'
import { useState } from 'react'

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      src: "/images/promptformel_code-1.png",
      alt: "Einfach zu verwendende Promptformeln"
    },
    {
      src: "/images/SelectiveColor.jpg",
      alt: "Coole Effekte mit Selective Color"
    },
    {
      src: "/images/scrollstopper.jpg",
      alt: "Scrollstopper und Ad-Banners"
    },
    {
      src: "/images/texteffekte.jpg",
      alt: "Kreative Texteffekte"
    },
    {
      src: "/images/mockups.jpg",
      alt: "Individuelle Mockup Designs"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1536px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-28 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-ff-clan dark:text-white text-black">
              AI-Design <br />Prompt Bibliothek
            </h1>
            <p className="text-xl mb-8 font-ff-clan">
              <strong>Mit über 1000 getesteten und kuratierten Prompts basierend auf mehr als 100 flexiblen Promptformeln</strong>.
            </p>
            <p className="text-xl mb-8 font-ff-clan">
              Ob du Art Director, Marketing Manager, Agenturinhaber oder Freelance-Designer bist: Mit unserer Bibliothek wird KI-gestütztes Design zu deiner kreativen Superpower.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="default">
                Mehr erfahren
              </Button>
              <Button size="lg" variant="outline">
                <Video /> Kurzanleitung
              </Button>
            </div>
            <div className="mt-12">
              <p className="text-sm text-muted-foreground mb-4">In Zusammenarbeit mit:</p>
              <div className="flex flex-wrap gap-6 items-center">
                <Image src="/images/queonext_Logo_horiz_white.png" alt="queonext" width={100} height={35} className="opacity-70 hover:opacity-100 transition-opacity" />
                <Image src="/images/Logo_AI-Design_Guide_full_negativ.png" alt="AI-Design-Guide" width={240} height={70} className="opacity-70 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
          <div className="relative" id="hero-slider">
            <div className="relative w-[500px] h-[500px] mx-auto overflow-hidden">
              <div 
                className="absolute w-full h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ transform: `translateX(${index * 100}%)` }}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      width={500}
                      height={500}
                      className="rounded-lg shadow-2xl object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
              <button 
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-secondary/80 hover:bg-secondary rounded-full p-2 transition-colors z-10"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-secondary/80 hover:bg-secondary rounded-full p-2 transition-colors z-10"
                aria-label="Next image"
              >
                <svg className="w-6 h-6 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center gap-2 mt-4">
              <div className="flex justify-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-primary' : 'bg-secondary'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center mt-2">
                {slides[currentSlide].alt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
