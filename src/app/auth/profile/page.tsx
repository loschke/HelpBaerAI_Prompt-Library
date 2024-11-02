'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

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

  const userProfile = {
    firstName: session.user.firstName || '',
    lastName: session.user.lastName || '',
    email: session.user.email || '',
    status: session.user.role || 'User',
    plan: session.user.currentPlan || 'Free'
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
              <Badge variant={userProfile.status === 'Owner' ? 'default' : 
                           userProfile.status === 'Admin' ? 'secondary' : 'outline'}>
                {userProfile.status}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium text-foreground">Plan</Label>
              <Badge variant={userProfile.plan === 'Premium' ? 'accent' : 'outline'}>
                {userProfile.plan}
              </Badge>
            </div>
          </div>
        </CardContent>
        <Separator className="bg-border/50" />
        <CardFooter className="flex justify-center">
          <Button onClick={handleLogout} className="w-full bg-primary hover:bg-primary/90">
            Ausloggen
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}