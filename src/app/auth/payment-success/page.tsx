'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Crown } from "lucide-react";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";

// Lazy-load Confetti component with SSR disabled
const Confetti = dynamic(() => import('react-confetti'), {
  ssr: false
});

export default function PaymentSuccess() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    // Set window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // Hide confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/30">
      {showConfetti && <Confetti 
        width={windowSize.width}
        height={windowSize.height}
      />}
      <Card className="w-full max-w-md border-border/50 bg-secondary">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Crown className="w-12 h-12 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center font-ff-clan">
            Willkommen bei Premium!
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Deine Zahlung wurde erfolgreich verarbeitet.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-foreground">
            Du hast gleich Zugriff auf alle Premium-Promptformeln. 
            Wir wünschen dir viel Spaß beim Entdecken!
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button asChild className="w-full bg-primary hover:bg-primary/90">
            <Link href="/auth/login">
              Bitte neu einloggen
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
