"use server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { contactSchema } from "@/lib/zod";

// Define the type of the form values based on Zod schema
type ContactFormValues = z.infer<typeof contactSchema>;

export async function contactAction(values: ContactFormValues) {
  const { name, email, message } = values;

  try {
    // Create a transporter object with your Gmail credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail email address
        pass: process.env.GMAIL_PASSWORD, // Your Gmail app password (not the account password)
      },
    });

    // Define the email options
    const mailOptions = {
      from: email, // The sender's email
      to: process.env.GMAIL_USER, // Your Gmail email address
      subject: `Nuevo mensaje desde la web ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br />${message}</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error("Error sending email: ", error);
    return { success: false };
  }
}
