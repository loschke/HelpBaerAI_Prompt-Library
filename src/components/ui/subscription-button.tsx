import { Button } from "@/components/ui/button"
import { Session } from "next-auth"
import { SubscriptionTier } from "@prisma/client"
import { Crown } from "lucide-react"

interface SubscriptionButtonProps {
  session: Session | null
}

export function SubscriptionButton({ session }: SubscriptionButtonProps) {
  const basePaymentLink = "https://buy.stripe.com/test_9AQ3fRbDXaMKdY4bIK"
  
  const paymentLinkWithParams = `${basePaymentLink}?prefilled_email=${session?.user?.email}&prefilled_promo_code=EARLYBIRD&client_reference_id=${session?.user?.id}`

  if (session?.user?.subscriptionTier !== SubscriptionTier.FREE) {
    return null
  }

  return (
    <Button 
      asChild
      size="lg"
      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
    >
      <a 
        href={paymentLinkWithParams}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2"
      >
        <Crown className="h-4 w-4" />
        Premium werden
      </a>
    </Button>
  )
}
