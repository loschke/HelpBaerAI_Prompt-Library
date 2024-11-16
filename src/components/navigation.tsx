'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useSession, signOut } from "next-auth/react"

const baseNavItems = [
  { name: 'Prompt Formeln', href: '/prompt-formeln' },
  { name: 'Beispielbilder', href: '/bilder-galerie' },
  { name: 'Styles', href: '/stile-referenzen' },
  { name: 'FAQ', href: '/faq' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()
  const pathname = usePathname()

  const navItems = [
    ...baseNavItems,
    { name: 'Preise', href: session?.user ? '/premium' : '/pricing' },
  ]

  const handleLogout = async () => {
    await signOut({
      callbackUrl: '/',
      redirect: true
    })
  }

  return (
    <nav className="bg-background border-b">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="text-4xl">🐻</span>
              <span className='text-white font-black italic text-2xl'>
                PromptBär
                <span className="ml-2 inline-flex items-center rounded-full bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-200">
                  Beta
                </span>
              </span>
            </Link> 
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-foreground hover:text-primary hover:text-white px-3 py-2 rounded-md text-lg transition-colors ${
                    pathname === item.href ? 'text-white font-bold' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            {session?.user ? (
              <div className="flex items-center gap-4">
                <Button variant="ghost" asChild>
                  <Link href="/auth/profile">
                    Profil
                  </Link>
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" className="mr-4" asChild>
                  <Link href="/auth/login">
                    Login
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/register">
                    Kostenlos starten
                  </Link>
                </Button>
              </>
            )}
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary hover:bg-accent block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-border">
            <div className="px-2 space-y-1">
              {session?.user ? (
                <>
                  <Button variant="ghost" className="w-full mb-2" asChild>
                    <Link href="/auth/profile">
                      Profil
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full mb-2" asChild>
                    <Link href="/auth/login">
                      Login
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/auth/register">
                      Kostenlos starten
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
