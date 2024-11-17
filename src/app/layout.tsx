import { Metadata, Viewport } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import { Footer } from "@/components/ui/footer"
import { SessionProvider } from "next-auth/react"
import SEO, { generateMetadata } from "@/components/ui/seo"
import CookieConsent from "@/components/cookie-consent"
import GoogleAnalytics from "@/components/google-analytics"
import MauticTracking from "@/components/mautic-tracking"
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = generateMetadata({
  title: 'PromptBär | KI-Design Prompt Bibliothek für Profis & Agenturen',
  description: '1000+ Beispiel-Prompts für Midjourney, Firefly & Co. Spare Zeit bei KI-Bildern. Von Experten entwickelt für Designer & Marketing-Teams.',
  keywords: 'Prompt Engineering, KI, Künstliche Intelligenz, AI Guide, Prompting, AI Tools',
  path: '/',
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
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐻</text></svg>"
        />
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
        <MauticTracking />
      </body>
    </html>
  )
}
