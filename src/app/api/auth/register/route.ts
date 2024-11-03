import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { registerSchema } from "@/lib/validations/auth"
import { sendVerificationEmail } from "@/lib/email"
import { createActivity } from "@/lib/auth-utils"
import { ActivityType } from "@prisma/client"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    // Debugging: Log den Request-Body
    const rawBody = await request.text()
    console.log('Raw request body:', rawBody)
    
    // Parse den Body nur wenn er nicht leer ist
    const body = rawBody ? JSON.parse(rawBody) : null
    
    if (!body) {
      return NextResponse.json(
        { error: "Keine Daten empfangen" },
        { status: 400 }
      )
    }

    // Validate input data
    const validatedData = registerSchema.parse(body)
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Diese E-Mail-Adresse wird bereits verwendet" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(validatedData.password, 12)

    // Generate verification token
    const verificationToken = crypto.randomUUID()

    // Create user with minimum required fields
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        hashedPassword,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName || null,
        role: "USER",
        currentPlan: "FREE",
        isVerified: false,
        verificationToken,
        referralCode: validatedData.referralCode,
        activities: {
          create: {
            type: ActivityType.REGISTRATION,
            description: "User registered"
          }
        }
      },
    })

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken)

    return NextResponse.json({
      success: true,
      message: "Registrierung erfolgreich. Bitte überprüfen Sie Ihre E-Mails zur Verifizierung."
    })

  } catch (error) {
    // Detailed error logging
    if (error instanceof Error) {
      console.error("Registration error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      })
    } else {
      console.error("Unknown registration error:", error)
    }
    
    // Proper error response
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : "Ein Fehler ist aufgetreten" 
      },
      { status: 500 }
    )
  }
}






























