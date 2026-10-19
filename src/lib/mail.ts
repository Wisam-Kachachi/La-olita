import nodemailer from "nodemailer";

export type BookingMail = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  party: number;
  message: string;
  until: string;
};

export function mailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function sendBookingEmail(booking: BookingMail) {
  const user = process.env.SMTP_USER ?? "";
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user,
      pass: process.env.SMTP_PASS,
    },
  });

  const to = process.env.BOOKING_TO_EMAIL || "laolita.swe@gmail.com";
  const text = [
    "Ny bordsbokning från laolita.se",
    "",
    `Namn: ${booking.name}`,
    `Telefon: ${booking.phone}`,
    `E-post: ${booking.email}`,
    `Datum: ${booking.date}`,
    `Tid: ${booking.time}–${booking.until}`,
    `Antal gäster: ${booking.party}`,
    `Meddelande: ${booking.message || "–"}`,
    "",
    "Bordet är reserverat i 1,5 timme.",
  ].join("\n");

  await transporter.sendMail({
    from: process.env.SMTP_FROM || user,
    to,
    replyTo: booking.email,
    subject: `Bokning ${booking.date} ${booking.time} · ${booking.party} gäster`,
    text,
  });
}
