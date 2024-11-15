import { Metadata } from 'next'

// SEO Metadata
export const metadata: Metadata = {
  title: 'PromptBär | Kontakt & Support für deine KI-Design Fragen',
  description: 'Fragen zur KI-Design Bibliothek? Unser Experten-Team hilft dir gerne weiter. Persönliche Beratung für Teams & Agenturen verfügbar.',
  keywords: 'promptbär kontakt, ki-design support, prompt beratung, ai tools hilfe, expertenberatung',
  openGraph: {
    title: 'PromptBär | Kontakt & Support für deine KI-Design Fragen',
    description: 'Fragen zur KI-Design Bibliothek? Unser Experten-Team hilft dir gerne weiter. Persönliche Beratung für Teams & Agenturen verfügbar.',
    images: ['/images/promptbaer_contact_16-9.webp'],
  }
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Structured Data für Kontaktseite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Promptbaer Kontakt",
            "description": "Kontaktiere uns für Fragen zu unserer KI-Design Prompt Bibliothek",
            "url": "https://promptbaer.de/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "Promptbaer",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["German"]
              }
            }
          })
        }}
      />
      {children}
    </>
  )
}
