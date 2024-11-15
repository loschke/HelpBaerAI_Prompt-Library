import { Metadata } from 'next'

// SEO Metadata
export const metadata: Metadata = {
  title: 'Kontakt - Promptbaer',
  description: 'Kontaktiere uns für Fragen zu unserer KI-Design Prompt Bibliothek. Persönliche Betreuung und schnelle Antwort garantiert. Wir helfen dir bei deinen AI-Design Anforderungen.',
  keywords: 'Promptbaer Kontakt, KI Design Beratung, AI Prompt Support, Kontaktformular, KI Tools Hilfe',
  openGraph: {
    title: 'Kontakt - Promptbaer',
    description: 'Kontaktiere uns für Fragen zu unserer KI-Design Prompt Bibliothek. Persönliche Betreuung und schnelle Antwort garantiert.',
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
