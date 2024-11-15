'use client';

import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Crown, Check } from "lucide-react";

export default function PremiumPage() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const canceled = searchParams.get("canceled");
  const error = searchParams.get("error");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/30">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2">
        {/* Left Column - Benefits */}
        <div className="hidden md:flex md:flex-col bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-l-lg overflow-hidden">
          {/* Image Container */}
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 aspect ratio */}
            <Image
              src="/images/promptbaer_premium_king_16_9.webp"
              alt="Promptbaer Premium Mitgliedschaft"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Content Container */}
          <div className="p-8 flex-1">
            <h1 className="text-3xl font-bold mb-8 font-ff-clan">Premium Vorteile</h1>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Check className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="font-semibold text-xl mb-2">Alle Prompt-Formeln</h2>
                  <p className="text-white/90">Zugriff auf sämtliche Premium Prompt-Formeln für professionelle AI-Bildgenerierung</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Check className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="font-semibold text-xl mb-2">Exklusive Updates</h2>
                  <p className="text-white/90">Erhalte neue Prompt-Formeln direkt wenn sie verfügbar sind und starte sofort mit der Erstellung</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Check className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="font-semibold text-xl mb-2">40% Renewal Rabatt</h2>
                  <p className="text-white/90">Spare 40% bei der Verlängerung deines Premium Abos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Pricing */}
        <div className="bg-secondary p-8 rounded-r-lg">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center font-ff-clan mb-2">Premium Mitgliedschaft</h2>
            <p className="text-center text-muted-foreground">Werde jetzt Premium Mitglied</p>
          </div>

          {canceled && (
            <div className="mb-6 p-4 text-amber-800 bg-amber-100 rounded-lg">
              Zahlung abgebrochen. Du kannst es jederzeit erneut versuchen.
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 text-red-800 bg-red-100 rounded-lg">
              Ein Fehler ist aufgetreten. Bitte versuche es später erneut.
            </div>
          )}

          <div className="bg-background/50 p-6 rounded-lg mb-6">
            <div className="text-center mb-4">
              <div className="text-sm text-amber-600 font-semibold mb-1">Early Bird Beta Preis</div>
              <div className="text-4xl font-bold text-amber-600">699,- €</div>
              <div className="text-sm text-muted-foreground mt-1">für 12 Monate</div>
              <p className="text-sm text-muted-foreground mt-4 text-center">✓ 40% Rabatt bei Verlängerung</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Button 
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              disabled={loading}
            >
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                {loading ? "Wird verarbeitet..." : "Jetzt Premium werden"}
              </div>
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-4 text-center">
            Sichere Zahlung über Stripe
          </p>
          
        </div>
      </div>
    </div>
  );
}
