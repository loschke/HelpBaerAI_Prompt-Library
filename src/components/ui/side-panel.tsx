import React from 'react'
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { FreePanelContent } from "./free-panel-content"
import { PremiumPanelContent } from "./premium-panel-content"

interface SidePanelProps {
  isOpen: boolean
  onClose: () => void
  isFree: boolean
  children?: React.ReactNode
  markdownContent?: string
  session: any // Session type from next-auth
  examples?: Array<{
    url: string
    filename: string
    thumbnails?: {
      small: { url: string; width: number; height: number }
      large: { url: string; width: number; height: number }
    }
  }>
}

export function SidePanel({ isOpen, onClose, isFree, children, markdownContent, examples, session }: SidePanelProps) {
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
          "fixed top-0 right-0 h-full bg-white dark:bg-zinc-900",
          "transform transition-transform duration-300 ease-in-out z-50",
          "w-full sm:w-[80%] md:w-[50%] lg:w-[36%]",
          "p-6 shadow-xl overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full"
          aria-label="Close panel"
          title="Close panel"
        >
          <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>

        {/* Free/Premium Badge */}
        <div className="mb-6">
          <span 
            className={cn(
              "px-3 py-1 rounded-full text-sm font-medium",
              isFree 
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
            )}
          >
            {isFree ? "Free" : "Premium"}
          </span>
        </div>

        {/* Content */}
        <div className="mt-8">
          {isFree ? (
            <FreePanelContent 
              session={session}
              markdownContent={markdownContent}
              children={children}
            />
          ) : (
            <PremiumPanelContent />
          )}
        </div>

        {/* Example Images */}
        {examples && examples.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Beispiele
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {examples.map((example, index) => (
                <div key={index} className="relative group">
                  <img
                    src={example.thumbnails?.large?.url || example.url}
                    alt={example.filename}
                    className="w-full h-auto rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
