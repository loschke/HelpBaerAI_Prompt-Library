"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ClipboardIcon, CheckIcon, XIcon } from "lucide-react"

interface CopyButtonProps {
  content: string
  className?: string
}

const CopyButton = ({ content, className }: CopyButtonProps) => {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setStatus('success')
      setTimeout(() => setStatus('idle'), 2000)
    } catch (err) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1",
        "text-sm font-medium transition-colors",
        status === 'idle' && "bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700/80",
        status === 'success' && "bg-emerald-900/50 text-emerald-300",
        status === 'error' && "bg-red-900/50 text-red-300",
        className
      )}
      aria-label={status === 'success' ? "Copied!" : "Copy to clipboard"}
    >
      {status === 'idle' && <ClipboardIcon className="w-4 h-4" />}
      {status === 'success' && <CheckIcon className="w-4 h-4" />}
      {status === 'error' && <XIcon className="w-4 h-4" />}
      Copy
    </button>
  )
}

export default CopyButton
