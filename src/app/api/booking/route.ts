import { NextResponse } from "next/server";
import { createBooking, listOpenSlots } from "@/lib/bookings";
import { mailConfigured, sendBookingEmail } from "@/lib/mail";

const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function partySize(value: unknown) {
  const party = Number(value);
  if (!Number.isInteger(party) || party < 1 || party > 10) return null;
  return party;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const date = url.searchParams.get("date") ?? "";
  const party = partySize(url.searchParams.get("party"));
  if (!party) {
    return NextResponse.json({ slots: [], reason: "invalid" }, { status: 400 });
  }
  const availability = await listOpenSlots(date, party);
  return NextResponse.json(availability);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (typeof body.company === "string" && body.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const date = String(body.date ?? "").trim();
  const time = String(body.time ?? "").trim();
  const message = String(body.message ?? "").trim();
  const party = partySize(body.party);
  const digits = phone.replace(/\D/g, "");

  if (
    !party ||
    name.length < 2 ||
    name.length > 80 ||
    !emailOk.test(email) ||
    email.length > 120 ||
    digits.length < 8 ||
    digits.length > 15 ||
    message.length > 400
  ) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const saved = await createBooking({ name, email, phone, date, time, party, message });
  if (!saved.ok) {
    const status = saved.error === "full" ? 409 : 400;
    return NextResponse.json(saved, { status });
  }

  if (mailConfigured()) {
    try {
      await sendBookingEmail({ name, email, phone, date, time, party, message, until: saved.until });
    } catch {
      console.error("booking mail failed");
    }
  }

  return NextResponse.json({ ok: true, until: saved.until });
}
