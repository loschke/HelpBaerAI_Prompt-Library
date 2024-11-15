import { Metadata } from 'next'
import { auth } from "../../auth"
import { redirect } from "next/navigation"

// SEO Metadata
export const metadata: Metadata = {
  title: 'Premium Mitgliedschaft - Promptbaer',
  description: 'Werde Premium Mitglied bei Promptbaer und erhalte Zugriff auf alle Prompt-Formeln, exklusive Updates und 40% Renewal Rabatt. Early Bird Beta Preis von nur 499,- € für 12 Monate.',
  keywords: 'Promptbaer Premium, KI Design Premium, AI Prompt Bibliothek, Premium Mitgliedschaft, KI Tools Premium Zugang',
  openGraph: {
    title: 'Premium Mitgliedschaft - Promptbaer',
    description: 'Werde Premium Mitglied bei Promptbaer und erhalte Zugriff auf alle Prompt-Formeln, exklusive Updates und 40% Renewal Rabatt.',
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
