import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export default async function POST(req: NextRequest) {
  try {
    const { to, email, message } = await req.json();
    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_EMAIL_HOST,
      port: Number(process.env.NEXT_PUBLIC_EMAIL_PORT),
      secure: false, // Set to true for port 465, otherwise false
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_HOST_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_HOST_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: email,
      to,
      subject: "Contact",
      text: message,
      html: `<p>${message}</p>`,
    });

    return NextResponse.json({ message: "Email sent successfully", info }, { status: 200 });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Failed to send email", error: error.message }, { status: 500 });
  }
}
