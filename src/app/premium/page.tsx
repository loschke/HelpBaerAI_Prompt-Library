'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

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
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto bg-card p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Premium Membership</h1>
        
        {canceled && (
          <div className="mb-4 p-4 text-amber-800 bg-amber-100 rounded-lg">
            Payment canceled. You can try again when you're ready.
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 text-red-800 bg-red-100 rounded-lg">
            Something went wrong. Please try again later.
          </div>
        )}
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span>Exclusive AI Prompt Templates</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span>Advanced Features</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span>Priority Support</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Button 
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? "Processing..." : "Upgrade to Premium"}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground mt-4 text-center">
          Secure payment powered by Stripe
        </p>
      </div>
    </div>
  );
}
