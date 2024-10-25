import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HelpBaer Prompt Library',
  description: 'A modern web application built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  )
}
