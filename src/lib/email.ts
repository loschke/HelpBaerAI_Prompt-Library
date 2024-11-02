import nodemailer from "nodemailer";

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({
  to,
  subject,
  html
}: {
  to: string;
  subject: string;
  html: string;
}) {
  return transporter.sendMail({
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to,
    subject,
    html,
  });
}

export function getVerificationEmailContent(verificationUrl: string) {
  return `
    <h1>Verify your email address</h1>
    <p>Please verify your email address by clicking the link below:</p>
    <a href="${verificationUrl}">${verificationUrl}</a>
    <p>This link will expire in 24 hours.</p>
    <p>If you didn't request this verification email, you can safely ignore it.</p>
  `;
}

export function getWelcomeEmailContent() {
  return `
    <h1>Welcome to HelpBärAI!</h1>
    <p>Your email has been successfully verified.</p>
    <p>You can now log in to your account and start using our services.</p>
    <p>If you have any questions, feel free to contact our support team.</p>
  `;
}
