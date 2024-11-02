import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import { SessionProvider } from "next-auth/react"
import './globals.css'

export const metadata: Metadata = {
  title: 'HelpBaer AI Prompt Library',
  description: 'Eine Bibliothek für KI Prompts',
}

export default function RootLayout({
  children,
  pageProps = { session: null },
}: {
  children: React.ReactNode
  pageProps?: { session: any }
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-ff-clan antialiased" suppressHydrationWarning>
        <SessionProvider session={pageProps.session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navigation />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
