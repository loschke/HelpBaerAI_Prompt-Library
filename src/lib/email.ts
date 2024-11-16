import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`

  await transporter.sendMail({
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    replyTo: process.env.REPLY_TO_EMAIL,
    to: email,
    subject: "PromptBärAI - E-Mail-Adresse bestätigen",
    html: `
      <p>Bitte bestätige deine E-Mail-Adresse durch Klicken auf den folgenden Link:</p>
      <p><a href="${verificationUrl}">${verificationUrl}</a></p>
      <p>Der Link ist 24 Stunden gültig.</p>
    `,
  })
}

export async function sendContactEmail(formData: {
  firstName: string
  lastName: string
  company: string
  email: string
  contact: string
  message: string
}) {
  const contactMap = {
    queonext: "r.loschke@queo-group.com", 
    moveelevator: "hp@move-elevator.de", 
    general: process.env.REPLY_TO_EMAIL
  }

  const recipient = contactMap[formData.contact as keyof typeof contactMap] || process.env.REPLY_TO_EMAIL

  await transporter.sendMail({
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to: recipient,
    replyTo: formData.email,
    subject: "Anfrage über Promptbaer.de",
    html: `
      <h2>Neue Kontaktanfrage</h2>
      <p><strong>Von:</strong> ${formData.firstName} ${formData.lastName}</p>
      <p><strong>Firma:</strong> ${formData.company}</p>
      <p><strong>E-Mail:</strong> ${formData.email}</p>
      <p><strong>Gewählter Ansprechpartner:</strong> ${formData.contact}</p>
      <p><strong>Nachricht:</strong></p>
      <p>${formData.message}</p>
    `,
  })
}

const feedbackTypeMap = {
  feature: 'Feature-Wunsch',
  bug: 'Fehlermeldung',
  improvement: 'Verbesserungsvorschlag',
  general: 'Allgemeines Feedback'
} as const

export type FeedbackType = keyof typeof feedbackTypeMap

export async function sendFeedbackEmail(data: {
  name?: string
  email?: string
  feedbackType: FeedbackType
  description: string
  sessionEmail?: string
}) {
  const emailToUse = data.sessionEmail || data.email || process.env.REPLY_TO_EMAIL

  await transporter.sendMail({
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to: process.env.FEEDBACK_EMAIL || 'rico@kvix.de',
    replyTo: emailToUse,
    subject: `PromptBär Feedback: ${feedbackTypeMap[data.feedbackType]}`,
    html: `
      <h2>Neues Feedback erhalten</h2>
      <p><strong>Name:</strong> ${data.name || 'Nicht angegeben'}</p>
      <p><strong>E-Mail:</strong> ${emailToUse}</p>
      <p><strong>Art des Feedbacks:</strong> ${feedbackTypeMap[data.feedbackType]}</p>
      <p><strong>Beschreibung:</strong></p>
      <p>${data.description}</p>
    `,
  })
}
