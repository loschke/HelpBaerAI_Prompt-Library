import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createActivity } from "@/lib/auth-utils"
import { ActivityType } from "@prisma/client"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Get all URL parameters and find the token
    // This handles both direct token parameter and potentially modified URLs from Outlook
    let token: string | null = null
    
    // Convert searchParams to array for TypeScript compatibility
    const params = Array.from(searchParams.entries())
    for (const [key, value] of params) {
      // Check if this parameter contains our verification token
      if (key === "token") {
        token = value
        break
      }
      // Handle Outlook's URL rewriting where token might be embedded in another parameter
      if (value && value.length >= 64) { // Our tokens are 64 chars long (32 bytes hex)
        const possibleToken = value.match(/[a-fA-F0-9]{64}/)?.[0]
        if (possibleToken) {
          token = possibleToken
          break
        }
      }
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://promptbaer.de'

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

    // Redirect to success page using a different path to avoid NextAuth conflict
    return NextResponse.redirect(`${baseUrl}/auth/email-verified`)
  } catch (error) {
    console.error("Email verification error:", error)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://promptbaer.de'
    return NextResponse.redirect(`${baseUrl}/auth/error`)
  }
}
