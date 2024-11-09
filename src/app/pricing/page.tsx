'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import { Rocket, Check, Clock, Users, Zap, Video, RefreshCw } from "lucide-react";
import Link from 'next/link';

export default function PricingPage() {
  return (
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
            <div className="text-sm text-muted-foreground mb-1">Regulärer Preis</div>
            <div className="text-3xl font-bold line-through text-muted-foreground">699,- €</div>
            <div className="text-sm text-amber-600 font-semibold mt-4 mb-1">Early Bird Beta Preis</div>
            <div className="text-4xl font-bold text-amber-600">499,- €</div>
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
                <Users className="w-6 h-6 text-amber-600" />
                <h3 className="text-xl font-bold">Von Experten entwickelt</h3>
              </div>
              <p className="text-muted-foreground">
                2 Jahre Erfahrung, 23.487 Stunden Testing, 100.000+ generierte Bilder
              </p>
            </div>

            <div className="bg-background rounded-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <Zap className="w-6 h-6 text-amber-600" />
                <h3 className="text-xl font-bold">Praxiserprobt</h3>
              </div>
              <p className="text-muted-foreground">
                Entwickelt in echten Projekten, optimiert durch reales Feedback
              </p>
            </div>

            <div className="bg-background rounded-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <Video className="w-6 h-6 text-amber-600" />
                <h3 className="text-xl font-bold">Video-KI Ready</h3>
              </div>
              <p className="text-muted-foreground">
                Sei bereit für die Video-Revolution
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
