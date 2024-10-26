import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
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
      <body suppressHydrationWarning className="min-h-screen bg-background font-ff-clan antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="helpbaer-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
