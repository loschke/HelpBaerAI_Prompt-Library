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
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to: email,
    subject: "E-Mail-Adresse bestätigen",
    html: `
      <p>Bitte bestätigen Sie Ihre E-Mail-Adresse durch Klicken auf den folgenden Link:</p>
      <p><a href="${verificationUrl}">${verificationUrl}</a></p>
      <p>Der Link ist 24 Stunden gültig.</p>
    `,
  })
}
