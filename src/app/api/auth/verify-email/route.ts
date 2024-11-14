import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createActivity } from "@/lib/auth-utils"
import { ActivityType } from "@prisma/client"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://promptbaer.de'

    if (!token) {
      // Return HTML response with meta refresh
      return new Response(
        `<!DOCTYPE html>
        <html>
          <head>
            <meta http-equiv="refresh" content="0;url=${baseUrl}/auth/error">
          </head>
          <body>
            <p>Redirecting to error page...</p>
            <script>window.location.href = "${baseUrl}/auth/error";</script>
          </body>
        </html>`,
        {
          headers: {
            'Content-Type': 'text/html',
            'Cache-Control': 'no-store, max-age=0',
          },
        }
      )
    }

    const user = await prisma.user.findFirst({
      where: { 
        verificationToken: token,
        isVerified: false
      }
    })

    if (!user) {
      // Return HTML response with meta refresh
      return new Response(
        `<!DOCTYPE html>
        <html>
          <head>
            <meta http-equiv="refresh" content="0;url=${baseUrl}/auth/error">
          </head>
          <body>
            <p>Redirecting to error page...</p>
            <script>window.location.href = "${baseUrl}/auth/error";</script>
          </body>
        </html>`,
        {
          headers: {
            'Content-Type': 'text/html',
            'Cache-Control': 'no-store, max-age=0',
          },
        }
      )
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

    // Return HTML response with meta refresh
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="refresh" content="0;url=${baseUrl}/auth/verify-email/success">
        </head>
        <body>
          <p>Redirecting to success page...</p>
          <script>window.location.href = "${baseUrl}/auth/verify-email/success";</script>
        </body>
      </html>`,
      {
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    )
  } catch (error) {
    console.error("Email verification error:", error)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://promptbaer.de'
    
    // Return HTML response with meta refresh
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="refresh" content="0;url=${baseUrl}/auth/error">
        </head>
        <body>
          <p>Redirecting to error page...</p>
          <script>window.location.href = "${baseUrl}/auth/error";</script>
        </body>
      </html>`,
      {
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    )
  }
}
