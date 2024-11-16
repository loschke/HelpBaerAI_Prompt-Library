import { NextResponse } from "next/server"
import { sendFeedbackEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body) {
      return NextResponse.json(
        { error: "Keine Daten empfangen" },
        { status: 400 }
      )
    }

    // Validiere required fields
    if (!body.feedbackType || !body.description || !body.privacyAccepted) {
      return NextResponse.json(
        { error: "Bitte füllen Sie alle Pflichtfelder aus" },
        { status: 400 }
      )
    }

    // Sende Email
    await sendFeedbackEmail(body)

    return NextResponse.json({
      success: true,
      message: "Ihr Feedback wurde erfolgreich versendet."
    })

  } catch (error) {
    console.error("Feedback form error:", error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : "Ein Fehler ist aufgetreten" 
      },
      { status: 500 }
    )
  }
} 