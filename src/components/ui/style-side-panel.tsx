import React from 'react'
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { StyleFreePanelContent } from "./style-free-panel-content"

interface StyleSidePanelProps {
  isOpen: boolean
  onClose: () => void
  session: any
  styleData?: {
    id: string
    fields: {
      StyleType?: string
      Platform?: string
      StyleValue?: string
      Preview?: Array<{
        url?: string
        width?: number
        height?: number
      }>
      ImgSamples?: Array<{
        url?: string
        width?: number
        height?: number
      }>
    }
  }
}

export function StyleSidePanel({ isOpen, onClose, session, styleData }: StyleSidePanelProps) {
  if (!styleData) return null

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
          "fixed top-0 right-0 h-full bg-zinc-900",
          "transform transition-transform duration-300 ease-in-out z-50",
          "w-full sm:w-[80%] md:w-[50%] lg:w-[36%]",
          "p-6 shadow-xl overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Top Bar with Close Button */}
        <div className="flex justify-between items-center mb-8">
          {/* Style Type Badge */}
          <span className="px-3 py-1 bg-zinc-800/80 text-zinc-400 rounded-full">
            {styleData.fields?.StyleType || 'Unknown Style'}
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
        <StyleFreePanelContent session={session}>
          <div className="space-y-8">
            {/* Platform */}
            {styleData.fields?.Platform && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-zinc-100">
                  Platform
                </h3>
                <span className="px-3 py-1 bg-zinc-800/80 text-zinc-400 rounded-full">
                  {styleData.fields.Platform}
                </span>
              </div>
            )}

            {/* Style Value */}
            {styleData.fields?.StyleValue && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-zinc-100">
                  Style Value
                </h3>
                <p className="text-zinc-300 whitespace-pre-wrap leading-relaxed">
                  {styleData.fields.StyleValue}
                </p>
              </div>
            )}

            {/* Preview Images */}
            {styleData.fields?.Preview && styleData.fields.Preview.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-zinc-100">
                  Preview
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {styleData.fields.Preview.map((image, index) => (
                    image?.url && (
                      <div key={index} className="rounded-lg overflow-hidden">
                        <img
                          src={image.url}
                          alt={`Preview ${index + 1}`}
                          width={image.width}
                          height={image.height}
                          className="w-full h-auto"
                        />
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Sample Images */}
            {styleData.fields?.ImgSamples && styleData.fields.ImgSamples.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-zinc-100">
                  Style Examples
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {styleData.fields.ImgSamples.map((image, index) => (
                    image?.url && (
                      <div key={index} className="rounded-lg overflow-hidden">
                        <img
                          src={image.url}
                          alt={`Sample ${index + 1}`}
                          width={image.width}
                          height={image.height}
                          className="w-full h-auto"
                        />
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </StyleFreePanelContent>
      </div>
    </>
  )
}
