import { NextResponse } from "next/server"
import { sendContactEmail } from "@/lib/email"

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
    if (!body.firstName || !body.email || !body.privacyAccepted) {
      return NextResponse.json(
        { error: "Bitte füllen Sie alle Pflichtfelder aus" },
        { status: 400 }
      )
    }

    // Sende Email
    await sendContactEmail(body)

    return NextResponse.json({
      success: true,
      message: "Ihre Nachricht wurde erfolgreich versendet."
    })

  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : "Ein Fehler ist aufgetreten" 
      },
      { status: 500 }
    )
  }
} 