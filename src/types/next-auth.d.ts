import { DefaultSession } from "next-auth"
import { Role, SubscriptionPlan } from "@prisma/client"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    firstName: string
    lastName?: string | null
    role: Role
    currentPlan: SubscriptionPlan
    isVerified: boolean
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
    currentPlan: SubscriptionPlan
    isVerified: boolean
  }
}
