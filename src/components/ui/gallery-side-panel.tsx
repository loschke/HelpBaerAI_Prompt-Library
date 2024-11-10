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
          "p-6 shadow-xl overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-zinc-800 rounded-full"
          aria-label="Close panel"
          title="Close panel"
        >
          <X className="h-6 w-6 text-zinc-400" />
        </button>

        {/* Content */}
        <div className="mt-8 space-y-6">
          {/* Main Image */}
          {imageData.fields?.Promptvorschau?.[0]?.url && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={imageData.fields.Promptvorschau[0].url}
                alt={imageData.fields?.Prompt || 'Gallery image'}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Prompt ID */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-zinc-400">Prompt ID</h3>
            <p className="text-lg text-zinc-200">
              {imageData.fields?.["Prompt ID"] || 'Unknown'}
            </p>
          </div>

          {/* Category */}
          {imageData.fields?.Kategorie?.[0] && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-zinc-400">Category</h3>
              <div className="flex flex-wrap gap-2">
                {imageData.fields.Kategorie.map((category, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-zinc-900 text-zinc-300 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Prompt */}
          {imageData.fields?.Prompt && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-zinc-400">Prompt</h3>
              <p className="text-zinc-300 whitespace-pre-wrap">
                {imageData.fields.Prompt}
              </p>
            </div>
          )}

          {/* Access Type */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-zinc-400">Access Type</h3>
            <span 
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium",
                imageData.fields?.Free?.[0] === "true"
                  ? "bg-emerald-900/50 text-emerald-300"
                  : "bg-amber-900/50 text-amber-300"
              )}
            >
              {imageData.fields?.Free?.[0] === "true" ? "Free" : "Premium"}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
