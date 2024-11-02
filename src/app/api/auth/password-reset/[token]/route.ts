import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { createActivity } from "@/lib/auth-utils"
import { ActivityType } from "@prisma/client"

export async function POST(
  request: Request,
  { params }: { params: { token: string } }
) {
  try {
    const { password } = await request.json()
    const { token } = params

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date()
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: "Ungültiger oder abgelaufener Token" },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Update user
    await prisma.user.update({
      where: { id: user.id },
      data: {
        hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    })

    // Log activity
    await createActivity(user.id, ActivityType.PASSWORD_CHANGE, "Password reset completed")

    return NextResponse.json({ 
      success: true,
      message: "Passwort wurde erfolgreich zurückgesetzt" 
    })
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten" },
      { status: 500 }
    )
  }
} 