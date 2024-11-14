import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createActivity } from "@/lib/auth-utils"
import { ActivityType } from "@prisma/client"

export async function GET(request: Request) {
  try {
    // Get the full request URL to handle both local and production environments
    const requestUrl = new URL(request.url)
    const token = requestUrl.searchParams.get("token")
    
    // Determine the base URL from the request
    const baseUrl = process.env.NODE_ENV === "production" 
      ? "https://promptbaer.de"
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    if (!token) {
      return NextResponse.redirect(`${baseUrl}/auth/error`)
    }

    const user = await prisma.user.findFirst({
      where: { 
        verificationToken: token,
        isVerified: false
      }
    })

    if (!user) {
      // Check if user is already verified
      const verifiedUser = await prisma.user.findFirst({
        where: {
          isVerified: true,
          verificationToken: token
        }
      })

      if (verifiedUser) {
        // User is already verified, redirect to success page
        return NextResponse.redirect(`${baseUrl}/auth/email-verified`)
      }

      return NextResponse.redirect(`${baseUrl}/auth/error`)
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

    // Create redirect URL with absolute path
    const redirectUrl = new URL("/auth/email-verified", baseUrl).toString()
    
    // Use 307 Temporary Redirect to maintain the request method
    return NextResponse.redirect(redirectUrl, {
      status: 307
    })
  } catch (error) {
    console.error("Email verification error:", error)
    const baseUrl = process.env.NODE_ENV === "production" 
      ? "https://promptbaer.de"
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      
    return NextResponse.redirect(`${baseUrl}/auth/error`)
  }
}
