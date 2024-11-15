import { Metadata } from 'next'
import { generateMetadata } from '@/components/ui/seo'
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import { Check } from "lucide-react";
import Link from 'next/link';
import FullWidthImageStrip from "@/components/full-width-image-strip";

// SEO Metadata
export const metadata: Metadata = generateMetadata({
  title: 'PromptBär | Early Bird Zugang zur Premium KI-Design Bibliothek',
  description: 'Sichere dir jetzt Zugang zu 80+ Prompt-Formeln, 1000+ Beispielbildern und 300+ Bildstilen. Early Bird Preis: 699€/Jahr. Von Experten entwickelt.',
  keywords: 'ki-design bibliothek, prompt sammlung, premium prompts, midjourney vorlagen, ai design tools, ki bildgenerierung, prompt engineering, early bird',
  ogImage: '/images/promptbaer_premium_king_16_9.png'
})

export default function PricingPage() {
  return (
    <>
      {/* Structured Data für Preise */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Promptbaer Premium",
            "description": "Premium Prompt-Bibliothek für KI-Design",
            "offers": {
              "@type": "Offer",
              "price": "699.00",
              "priceCurrency": "EUR",
              "priceValidUntil": new Date(
                new Date().setFullYear(new Date().getFullYear() + 1)
              ).toISOString().split('T')[0],
              "availability": "https://schema.org/InStock",
              "url": "https://promptbaer.de/pricing",
              "validFrom": new Date().toISOString().split('T')[0]
            },
            "image": "https://promptbaer.de/images/promptbaer_premium_king_16_9.png",
            "brand": {
              "@type": "Brand",
              "name": "Promptbaer"
            },
            "features": [
              "Sofort einsetzbar: Keine lange Einarbeitungszeit",
              "Maximale Flexibilität: Für alle gängigen KI-Tools optimiert",
              "Zukunftssicher: Regelmäßige Updates & Erweiterungen",
              "40% Rabatt bei Verlängerung"
            ]
          })
        }}
      />

      <div className="min-h-screen">
        {/* Hero from Homepage */}
        <div className="bg-background">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-5xl mx-auto space-y-8 text-center">
              {/* Tag */}
              <Badge variant="outline" className="border-neutral-500 text-2xl text-neutral-400 hover:bg-accent/10">
                AI-Design für Kreative
              </Badge>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                Investiere in Qualität, die bleibt
              </h1>      

              {/* Description */}
              <p className="text-2xl text-foreground leading-relaxed">
                Während sich KI-Tools weiterentwickeln, bleiben unsere Prompts relevant - sie beschreiben was du willst, nicht wie die KI es machen soll.
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 bg-background">
          {/* Pricing Section */}
          <div className="max-w-2xl mx-auto bg-[#0A0A0A] rounded-lg p-8 mb-16">
            <div className="text-center mb-8">
              <div className="text-l text-amber-600 font-semibold mt-4 mb-1">Early Bird Beta Preis</div>
              <div className="text-5xl font-bold text-amber-600">699,- €</div>
              <div className="text-sm text-muted-foreground mt-1">für 12 Monate</div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-5 h-5 text-green-500" />
                <span>Sofort einsetzbar: Keine lange Einarbeitungszeit</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-5 h-5 text-green-500" />
                <span>Maximale Flexibilität: Für alle gängigen KI-Tools optimiert</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-5 h-5 text-green-500" />
                <span>Zukunftssicher: Regelmäßige Updates & Erweiterungen</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-5 h-5 text-green-500" />
                <span>40% Rabatt bei Verlängerung</span>
              </div>
            </div>

            <Link href="/auth/register">
              <Button 
                size="lg"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >
                <div className="flex items-center gap-2">
                  Jetzt registrieren
                </div>
              </Button>
            </Link>

            <p className="text-sm text-muted-foreground mt-4 text-center">
              Registriere dich jetzt und erhalte Zugang zum Premium-Bereich
            </p>
          </div>      
        </div>

        <div className="px-4 py-16 bg-[#0A0A0A]">
          {/* Features Grid */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center font-ff-clan">
              Was macht unsere Bibliothek einzigartig?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">🖼️</span>
                  <h3 className="text-xl font-bold">Von Experten entwickelt</h3>
                </div>
                <p className="text-muted-foreground">
                  Erfahrung und Expertise aus 100.000+ generierten Bildern
                </p>
              </div>

              <div className="bg-background rounded-lg p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">🎯</span>
                  <h3 className="text-xl font-bold">Praxiserprobt im Agentur-Alltag</h3>
                </div>
                <p className="text-muted-foreground">
                  Entwickelt in echten Projekten, optimiert durch reales Feedback
                </p>
              </div>

              <div className="bg-background rounded-lg p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">🎬</span>
                  <h3 className="text-xl font-bold">Wächst mit der KI und neuen Tools</h3>
                </div>
                <p className="text-muted-foreground">
                  Vorbereitet für die nächste KI-Welle - Text to Video Prompting
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Added FullWidthImageStrip as the last module */}
        <FullWidthImageStrip />
      </div>
    </>
  );
}
