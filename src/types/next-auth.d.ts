import { DefaultSession } from "next-auth"
import { Role, SubscriptionTier } from "@prisma/client"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    firstName: string
    lastName?: string | null
    role: Role
    subscriptionTier: SubscriptionTier
    isVerified: boolean
    stripeCustomerId?: string | null
    subscriptionEndDate?: Date | null
  }

  interface Session extends DefaultSession {
    user: User & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    firstName: string
    lastName?: string | null
    role: Role
    subscriptionTier: SubscriptionTier
    isVerified: boolean
    stripeCustomerId?: string | null
    subscriptionEndDate?: Date | null
  }
}
