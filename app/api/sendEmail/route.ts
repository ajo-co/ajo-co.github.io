import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.NEXT_PUBLIC_EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.NEXT_PUBLIC_EMAIL_PORT || "587"),
  secure: false, // Set to true for port 465, otherwise false,
  service: "gmail",
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_HOST_USER || "omidthegreat8@gmail.com",
    pass: process.env.NEXT_PUBLIC_EMAIL_HOST_PASSWORD || "oejvxvcaszzoepla",
  },
});

export async function POST(req: NextRequest) {
  try {
    const { to, email, message } = await req.json();

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
