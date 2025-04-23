import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  const { name, email, message } = await req.json()

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
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
      to: "bastien.robert97421@gmail.com",
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

