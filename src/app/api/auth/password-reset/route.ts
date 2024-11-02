import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { sendPasswordResetEmail } from "@/lib/email"
import { createActivity } from "@/lib/auth-utils"
import crypto from "crypto"

const resetSchema = z.object({
  email: z.string().email("Ungültige E-Mail-Adresse"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = resetSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Return success even if user not found for security
      return NextResponse.json({ 
        message: "Falls ein Account mit dieser E-Mail existiert, wurde ein Reset-Link versendet." 
      })
    }

    const resetToken = crypto.randomUUID()
    const resetTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    })

    await sendPasswordResetEmail(user.email, resetToken)

    await createActivity(user.id, "PASSWORD_CHANGE", "Password reset requested")

    return NextResponse.json({ 
      message: "Falls ein Account mit dieser E-Mail existiert, wurde ein Reset-Link versendet." 
    })
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten" },
      { status: 500 }
    )
  }
} 