import React from 'react'
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface GallerySidePanelProps {
  isOpen: boolean
  onClose: () => void
  imageData?: {
    id: string
    fields: {
      Prompt?: string
      "Prompt ID"?: number
      Promptvorschau?: Array<{
        url?: string
        width?: number
        height?: number
      }>
      Free?: string[]
      Kategorie?: string[]
    }
  }
}

export function GallerySidePanel({ isOpen, onClose, imageData }: GallerySidePanelProps) {
  if (!imageData) return null

  const isFree = imageData.fields?.Free?.[0] === "true"

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Side Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full bg-zinc-950",
          "transform transition-transform duration-300 ease-in-out z-50",
          "w-full sm:w-[80%] md:w-[50%] lg:w-[36%]",
          "p-6 pb-16 shadow-xl overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Top Bar with Close Button and Access Type */}
        <div className="flex justify-between items-center mb-8">
          {/* Access Type Badge */}
          <span 
            className={cn(
              "px-3 py-1 rounded-full text-sm font-medium",
              isFree 
                ? "bg-emerald-900/50 text-emerald-300"
                : "bg-amber-900/50 text-amber-300"
            )}
          >
            {isFree ? "Free" : "Premium"}
          </span>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-full"
            aria-label="Close panel"
            title="Close panel"
          >
            <X className="h-6 w-6 text-zinc-400" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Category */}
          {imageData.fields?.Kategorie?.[0] && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-zinc-100">
                Kategorie
              </h3>
              <div className="flex flex-wrap gap-2">
                {imageData.fields.Kategorie.map((category, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-zinc-800/80 text-zinc-400 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Prompt */}
          {imageData.fields?.Prompt && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-zinc-100">
                Prompt
              </h3>
              <p className="text-zinc-300 whitespace-pre-wrap leading-relaxed">
                {imageData.fields.Prompt}
              </p>
            </div>
          )}

          {/* Main Image */}
          {imageData.fields?.Promptvorschau?.[0]?.url && (
            <div className="mt-8 rounded-lg overflow-hidden">
              <img
                src={imageData.fields.Promptvorschau[0].url}
                alt={imageData.fields?.Prompt || 'Gallery image'}
                className="w-full h-auto"
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
