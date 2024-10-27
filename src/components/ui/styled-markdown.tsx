import React from 'react'
import ReactMarkdown from 'react-markdown'
import { cn } from "@/lib/utils"

interface StyledMarkdownProps {
  content: string
  className?: string
}

export function StyledMarkdown({ content, className }: StyledMarkdownProps) {
  return (
    <ReactMarkdown
      className={cn(
        // Base styles
        "prose dark:prose-invert max-w-none",
        // Main title - keeping strong contrast
        "prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-h2:text-gray-900 dark:prose-h2:text-white",
        // Subheadings - more muted
        "prose-h3:text-lg prose-h3:font-semibold prose-h3:mb-2 prose-h3:text-gray-600 dark:prose-h3:text-gray-400",
        // Prompt formula text - strong contrast
        "prose-p:text-lg prose-p:mb-6 prose-p:text-gray-900 dark:prose-p:text-white",
        // Legend text - more muted
        "prose-li:text-gray-600 dark:prose-li:text-gray-400",
        // Other elements
        "prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold",
        "prose-ul:list-disc prose-ul:pl-6",
        "prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
        "prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded",
        className
      )}
    >
      {content}
    </ReactMarkdown>
  )
}
