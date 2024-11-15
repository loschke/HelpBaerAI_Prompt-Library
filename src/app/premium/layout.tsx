import { Metadata } from 'next'
import { auth } from "../../auth"
import { redirect } from "next/navigation"

// SEO Metadata
export const metadata: Metadata = {
  title: 'PromptBär Premium | Profi-Features für KI-Design & Marketing',
  description: 'Entdecke alle Premium-Vorteile: Zugriff auf 80+ Profi-Formeln, 1000+ Beispiele, Style-Guides & regelmäßige Updates. Optimiert für Teams.',
  keywords: 'premium prompts, ki-design profi, prompt bibliothek komplett, ai tools premium, design automation',
  openGraph: {
    title: 'PromptBär Premium',
    description: 'Entdecke alle Premium-Vorteile: Zugriff auf 80+ Profi-Formeln, 1000+ Beispiele, Style-Guides & regelmäßige Updates. Optimiert für Teams.',
    images: ['/images/promptbaer_premium_king_16_9.webp'],
  }
}

export default async function PremiumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session) {
    redirect('/auth/login')
  }

  return (
    <>
      {/* Structured Data für Premium Mitgliedschaft */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Promptbaer Premium Mitgliedschaft",
            "description": "Premium Mitgliedschaft für Zugriff auf alle Prompt-Formeln und exklusive Updates",
            "offers": {
              "@type": "Offer",
              "price": "499.00",
              "priceCurrency": "EUR",
              "priceValidUntil": new Date(
                new Date().setFullYear(new Date().getFullYear() + 1)
              ).toISOString().split('T')[0],
              "availability": "https://schema.org/InStock",
              "url": "https://promptbaer.de/premium",
              "validFrom": new Date().toISOString().split('T')[0]
            },
            "image": "https://promptbaer.de/images/promptbaer_premium_king_16_9.webp",
            "brand": {
              "@type": "Brand",
              "name": "Promptbaer"
            },
            "features": [
              "Alle Prompt-Formeln",
              "Exklusive Updates",
              "40% Renewal Rabatt"
            ]
          })
        }}
      />
      {children}
    </>
  )
}
