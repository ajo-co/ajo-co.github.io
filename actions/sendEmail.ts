"use server";
// import ContactFormEmail from "@/email/contact-form-email";
import nodemailer from "nodemailer";
// const resend = new Resend(process.env.RESEND_API_KEY);

const transporter = nodemailer.createTransport({
  host: process.env.NEXT_PUBLIC_EMAIL_HOST,
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_HOST_USER,
    pass: process.env.NEXT_PUBLIC_EMAIL_HOST_PASSWORD,
  },
});

export const sendEmail = async ({ email, message }: { email: string; message: string }) => {
  // send mail with defined transport object
  try {
    const info = await transporter.sendMail({
      from: `<${email}>`, // sender address
      to: `reza1880z2@gmail.com, ${process.env.NEXT_PUBLIC_EMAIL_HOST_USER}`, // list of receivers
      subject: "Contact", // Subject line
      text: message, // plain text body
      html: `<b>${message}</b>`, // html body
    });
    console.log("Message sent: %s", info);
  } catch (error) {}
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};

// export const sendEmail = async (formData: FormData) => {
//   const senderEmail = formData.get("senderEmail");
//   const message = formData.get("message");

//   // simple server-side validation
//   if (!validateString(senderEmail, 500)) {
//     return {
//       error: "Invalid sender email",
//     };
//   }
//   if (!validateString(message, 5000)) {
//     return {
//       error: "Invalid message",
//     };
//   }

//   let data;
//   try {
//     data = await resend.emails.send({
//       from: "Contact Form <onboarding@resend.dev>",
//       to: "bytegrad@gmail.com",
//       subject: "Message from contact form",
//       // reply_to: senderEmail,
//       react: React.createElement(ContactFormEmail, {
//         message: message,
//         senderEmail: senderEmail,
//       }),
//     });
//   } catch (error: unknown) {
//     return {
//       error: getErrorMessage(error),
//     };
//   }

//   return {
//     data,
//   };
// };
