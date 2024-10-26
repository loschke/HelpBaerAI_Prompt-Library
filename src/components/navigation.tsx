"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const Navigation = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 border-b">
      <Link href="/" className="text-2xl font-bold">
        PromptBärAI
      </Link>
      <div className="flex items-center">
        <ul className="flex space-x-4 mr-4">
          <li><Button variant="ghost" asChild><Link href="/features">Features</Link></Button></li>
          <li><Button variant="ghost" asChild><Link href="/pricing">Pricing</Link></Button></li>
          <li><Button variant="ghost" asChild><Link href="/contact">Contact</Link></Button></li>
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Navigation
