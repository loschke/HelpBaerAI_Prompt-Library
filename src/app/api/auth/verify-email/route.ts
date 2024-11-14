import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createActivity } from "@/lib/auth-utils"
import { ActivityType } from "@prisma/client"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")
    
    // Get the base URL from environment, fallback to the request origin
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.headers.get("origin") || 'https://promptbaer.de'

    if (!token) {
      return NextResponse.redirect(`${baseUrl}/auth/error`, { status: 308 })
    }

    const user = await prisma.user.findFirst({
      where: { 
        verificationToken: token,
        isVerified: false
      }
    })

    if (!user) {
      return NextResponse.redirect(`${baseUrl}/auth/error`, { status: 308 })
    }

    // Update user verification status
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
        emailVerified: new Date(),
      }
    })

    // Log verification activity
    await createActivity(user.id, ActivityType.EMAIL_VERIFICATION, "Email verified")

    // Redirect to success page using permanent redirect
    return NextResponse.redirect(`${baseUrl}/auth/verify-email/success`, { status: 308 })
  } catch (error) {
    console.error("Email verification error:", error)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.headers.get("origin") || 'https://promptbaer.de'
    return NextResponse.redirect(`${baseUrl}/auth/error`, { status: 308 })
  }
}
