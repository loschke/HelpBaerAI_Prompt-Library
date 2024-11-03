import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createActivity } from "@/lib/auth-utils"
import { ActivityType } from "@prisma/client"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.redirect(new URL("/auth/error", request.url))
    }

    const user = await prisma.user.findFirst({
      where: { 
        verificationToken: token,
        isVerified: false
      }
    })

    if (!user) {
      return NextResponse.redirect(new URL("/auth/error", request.url))
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

    // Redirect to success page
    return NextResponse.redirect(new URL("/auth/verify-email/success", request.url))
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.redirect(new URL("/auth/error", request.url))
  }
} 