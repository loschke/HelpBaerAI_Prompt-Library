import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import Navigation from '@/components/navigation'
import { Footer } from '@/components/ui/footer'
import { SessionProvider } from "next-auth/react"
import PrelineScript from '@/components/PrelineScript'
import './globals.css'

export const metadata: Metadata = {
  title: 'HelpBaer AI Prompt Library',
  description: 'Eine Bibliothek für KI Prompts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-ff-clan antialiased flex flex-col" suppressHydrationWarning>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </SessionProvider>
        <PrelineScript />
      </body>
    </html>
  )
}
