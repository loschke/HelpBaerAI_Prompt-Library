import { Button } from "@/components/ui/button"
import { Session } from "next-auth"
import { SubscriptionTier } from "@prisma/client"
import { Crown, ExternalLink } from "lucide-react"
import Link from "next/link"

interface SubscriptionButtonProps {
  session: Session | null
}

export function SubscriptionButton({ session }: SubscriptionButtonProps) {
  const customerPortalUrl = process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL
  
  // If user is premium, show subscription info and portal link
  if (session?.user?.subscriptionTier === SubscriptionTier.PREMIUM || 
      session?.user?.subscriptionTier === SubscriptionTier.PARTNER) {
    return (
      <div className="w-full space-y-2">
        {session.user.subscriptionEndDate && (
          <p className="text-sm text-muted-foreground text-center">
            Premium bis: {new Date(session.user.subscriptionEndDate).toLocaleDateString('de-DE')}
          </p>
        )}
        <Button 
          asChild
          variant="outline"
          size="lg"
          className="w-full"
        >
          <a 
            href={customerPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Abo verwalten
          </a>
        </Button>
      </div>
    )
  }

  // For free users, show link to premium page
  return (
    <Button 
      asChild
      size="lg"
      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
    >
      <Link 
        href="/premium"
        className="inline-flex items-center gap-2"
      >
        <Crown className="h-4 w-4" />
        Premium werden
      </Link>
    </Button>
  )
}
