import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface StripePortalButtonProps {
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

export function StripePortalButton({ className, variant = "default" }: StripePortalButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePortalAccess = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/stripe/customer-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to access customer portal");
      }

      const { url } = await response.json();
      router.push(url);
    } catch (error) {
      console.error("Error accessing customer portal:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePortalAccess}
      disabled={loading}
      className={className}
      variant={variant}
    >
      {loading ? "Laden..." : "Premium Verwaltung"}
    </Button>
  );
}
