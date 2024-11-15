import { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import Navigation from '@/components/navigation'
import { Footer } from '@/components/ui/footer'
import { SessionProvider } from "next-auth/react"
import PrelineScript from '@/components/PrelineScript'
import SEO, { generateMetadata } from '@/components/ui/seo'
import CookieConsent from '@/components/cookie-consent'
import GoogleAnalytics from '@/components/google-analytics'
import MauticTracking from '@/components/mautic-tracking'
import './globals.css'

export const metadata: Metadata = generateMetadata({
  title: 'Promptbaer',
  description: 'Entdecken Sie die Kunst des Prompt Engineerings mit Promptbaer. Lernen Sie, wie Sie KI-Tools effektiv nutzen können.',
  keywords: 'Prompt Engineering, KI, Künstliche Intelligenz, AI Guide, Prompting, AI Tools',
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <CookieConsent />
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Promptbaer",
              "url": "https://promptbaer.de",
              "description": "Entdecken Sie die Kunst des Prompt Engineerings mit Promptbaer",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://promptbaer.de/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
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
              <SEO>
                {children}
              </SEO>
            </main>
            <Footer />
          </ThemeProvider>
        </SessionProvider>
        <PrelineScript />
        <MauticTracking />
      </body>
    </html>
  )
}
