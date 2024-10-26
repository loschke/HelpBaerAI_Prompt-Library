import React from 'react'
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface SidePanelProps {
  isOpen: boolean
  onClose: () => void
  isFree: boolean
  children?: React.ReactNode
}

export function SidePanel({ isOpen, onClose, isFree, children }: SidePanelProps) {
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
          "w-full sm:w-[80%] md:w-[50%] lg:w-[30%]",
          "p-6 shadow-xl",
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
          {children}
        </div>
      </div>
    </>
  )
}
