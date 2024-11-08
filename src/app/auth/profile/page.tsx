'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { StripePortalButton } from "@/components/ui/stripe-portal-button"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { User, Crown, Lock, LockOpen, Check, X } from "lucide-react"
import { Role, SubscriptionPlan } from "@prisma/client"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/auth/login')
    }
  }, [status, router])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session?.user) {
    return null
  }

  console.log('Debug session user:', session.user)

  const userProfile = {
    firstName: session.user.firstName || '',
    lastName: session.user.lastName || '',
    email: session.user.email || '',
    status: session.user.role || Role.USER,
    plan: session.user.currentPlan || SubscriptionPlan.FREE,
    isVerified: session.user.isVerified
  }

  const initials = `${userProfile.firstName?.[0] || ''}${userProfile.lastName?.[0] || ''}`

  const handleLogout = async () => {
    await signOut({
      callbackUrl: '/',
      redirect: true
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/30">
      <Card className="w-full max-w-md border-border/50 bg-secondary">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <Avatar className="h-24 w-24">
              <AvatarImage 
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${userProfile.firstName} ${userProfile.lastName}`} 
              />
              <AvatarFallback className="bg-primary">
                {initials || '??'}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-2xl font-bold text-center font-ff-clan">
            {userProfile.firstName} {userProfile.lastName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator className="bg-border/50" />
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">E-Mail</Label>
              <Input 
                value={userProfile.email}
                className="bg-background border-input"
                disabled
              />
            </div>
            
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium text-foreground">Status</Label>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded inline-flex items-center gap-1 ${
                userProfile.status === Role.ADMIN || userProfile.status === Role.SUPER_ADMIN
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                {(userProfile.status === Role.ADMIN || userProfile.status === Role.SUPER_ADMIN)
                  ? <Crown className="h-3 w-3" /> 
                  : <User className="h-3 w-3" />
                }
                {userProfile.status}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium text-foreground">Plan</Label>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded inline-flex items-center gap-1 ${
                userProfile.plan === SubscriptionPlan.PREMIUM || userProfile.plan === SubscriptionPlan.PARTNER_LIFETIME
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
              }`}>
                {(userProfile.plan === SubscriptionPlan.PREMIUM || userProfile.plan === SubscriptionPlan.PARTNER_LIFETIME)
                  ? <Crown className="h-3 w-3" />
                  : <LockOpen className="h-3 w-3" />
                }
                {userProfile.plan}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium text-foreground">Verifizierung</Label>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded inline-flex items-center gap-1 ${
                userProfile.isVerified
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              }`}>
                {userProfile.isVerified 
                  ? <Check className="h-3 w-3" />
                  : <X className="h-3 w-3" />
                }
                {userProfile.isVerified ? 'Verifiziert' : 'Nicht verifiziert'}
              </span>
            </div>
          </div>
        </CardContent>
        <Separator className="bg-border/50" />
        <CardFooter className="flex flex-col gap-2">
          <Button onClick={handleLogout} className="w-full bg-primary hover:bg-primary/90">
            Ausloggen
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
