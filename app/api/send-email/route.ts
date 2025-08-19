import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { rateLimits, logRateLimit } from "../../../lib/rateLimit"

export async function POST(req: Request) {
  const rl = rateLimits.api.check(req)
  logRateLimit(rl.ip || 'unknown', '/api/send-email', rl.allowed, rl.remaining)
  if (!rl.allowed) return NextResponse.json({ error: rl.message }, { status: 429 })

  const { name, email, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  try {
    // Envoyer l'e-mail à Bastien
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Nouveau message de ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
    })

    // Envoyer un e-mail de confirmation à l'expéditeur
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Confirmation de réception de votre message",
      text: `Cher ${name},\n\nNous avons bien reçu votre message et nous vous en remercions. Nous vous répondrons dans les plus brefs délais.\n\nCordialement,\nL'équipe Solo Design`,
    })

    return NextResponse.json({ message: "Emails sent successfully" })
  } catch (error) {
  console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}

