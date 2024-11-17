'use client'

import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Role } from "@prisma/client"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/auth/login')
    } else if (status === "authenticated" && 
      session?.user?.role !== Role.ADMIN && 
      session?.user?.role !== Role.SUPER_ADMIN) {
      router.push('/')
    }
  }, [status, session, router])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session?.user || 
    (session.user.role !== Role.ADMIN && 
     session.user.role !== Role.SUPER_ADMIN)) {
    return null
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-ff-clan">Admin Dashboard</h1>
      </div>
      {children}
    </div>
  )
}
