"use client";

import { FormEvent, useEffect, useState } from "react";
import { restaurant } from "@/content/site";
import type { OpenSlot } from "@/lib/bookings";
import { addDays, stockholmDate } from "@/lib/slots";

type Status = "idle" | "sending" | "sent" | "invalid" | "full" | "error";
type Availability = "loading" | "open" | "full" | "none" | "error";

export function BookingForm() {
  const [today] = useState(() => stockholmDate());
  const [date, setDate] = useState(() => stockholmDate());
  const [time, setTime] = useState("");
  const [party, setParty] = useState("2");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [slots, setSlots] = useState<OpenSlot[]>([]);
  const [availability, setAvailability] = useState<Availability>("loading");
  const [status, setStatus] = useState<Status>("idle");
  const [until, setUntil] = useState("");

  const lastDay = addDays(today, 60);
  const partySize = Number(party);
  const selected = slots.find((slot) => slot.time === time);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/booking?date=${date}&party=${partySize}`, { signal: controller.signal })
      .then((response) => response.json())
      .then((data: { slots?: OpenSlot[]; reason?: Availability }) => {
        const next = data.slots ?? [];
        setSlots(next);
        setAvailability(data.reason === "full" || data.reason === "none" ? data.reason : "open");
        setTime((current) => (next.some((slot) => slot.time === current) ? current : ""));
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setAvailability("error");
      });
    return () => controller.abort();
  }, [date, partySize]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, date, time, party: partySize, message, company }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string; until?: string };
      if (data.ok) {
        setUntil(data.until ?? "");
        setStatus("sent");
        return;
      }
      setStatus(data.error === "full" ? "full" : "invalid");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-cream p-6 text-ink md:p-8" role="status">
        <h2 className="font-display text-4xl tracking-wide uppercase">Bordet är reserverat</h2>
        <p className="mt-3 leading-7">
          {date} kl {time}–{until}, {party} gäster. Platserna hålls i 1,5 timme.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-cream p-6 text-ink md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          Datum
          <input
            required
            type="date"
            name="date"
            min={today}
            max={lastDay}
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
              setStatus("idle");
            }}
            className="mt-1 w-full border border-ink/15 bg-bone px-3 py-3"
          />
        </label>
        <label className="block text-sm">
          Tid
          <select
            required
            name="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            className="mt-1 w-full border border-ink/15 bg-bone px-3 py-3"
          >
            <option value="">{availability === "loading" ? "Hämtar tider" : "Välj tid"}</option>
            {slots.map((slot) => (
              <option key={slot.time} value={slot.time}>
                {slot.time} · {slot.seatsLeft} platser kvar
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm sm:col-span-2">
          Antal gäster
          <select
            name="party"
            value={party}
            onChange={(event) => {
              setParty(event.target.value);
              setStatus("idle");
            }}
            className="mt-1 w-full border border-ink/15 bg-bone px-3 py-3"
          >
            {Array.from({ length: 10 }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </label>
      </div>

      {availability === "none" ? (
        <p className="mt-3 text-sm text-coral">Inga tider kvar den dagen. Välj ett annat datum eller ring oss.</p>
      ) : null}
      {availability === "full" ? (
        <p className="mt-3 text-sm text-coral">
          Den dagen är fullbokad för {partySize} gäster. Välj färre gäster eller ett annat datum.
        </p>
      ) : null}
      {selected ? (
        <p className="mt-3 text-sm">
          {selected.seatsLeft} av {restaurant.platser} platser är lediga kl {selected.time}. Bordet hålls i 1,5 timme.
        </p>
      ) : null}
      {partySize >= 8 ? (
        <p className="mt-3 text-sm">
          För åtta eller fler, ring gärna {restaurant.phone} så vi kan duka rätt.
        </p>
      ) : null}

      <div className="mt-4 grid gap-4">
        <label className="block text-sm">
          Namn
          <input
            required
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 w-full border border-ink/15 bg-bone px-3 py-3"
          />
        </label>
        <label className="block text-sm">
          Telefon
          <input
            required
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="mt-1 w-full border border-ink/15 bg-bone px-3 py-3"
          />
        </label>
        <label className="block text-sm">
          E-post
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full border border-ink/15 bg-bone px-3 py-3"
          />
        </label>
        <label className="block text-sm">
          Meddelande
          <textarea
            name="message"
            rows={4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="mt-1 w-full border border-ink/15 bg-bone px-3 py-3"
            placeholder="Allergi, barnstol, firande"
          />
        </label>
        <label className="absolute -left-[9999px]" aria-hidden="true">
          Företag
          <input
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "sending" || !time || availability === "loading"}
        className="mt-6 rounded-full bg-coral px-6 py-3 font-display text-sm tracking-[0.18em] text-forest-deep uppercase disabled:opacity-60"
      >
        {status === "sending" ? "Bokar" : "Boka bord"}
      </button>

      {status === "invalid" ? (
        <p className="mt-3 text-sm text-coral" role="alert">
          Kontrollera datum, tid och kontaktuppgifter.
        </p>
      ) : null}
      {status === "full" ? (
        <p className="mt-3 text-sm text-coral" role="alert">
          Tiden hann bli fullbokad. Välj en annan tid.
        </p>
      ) : null}
      {status === "error" || availability === "error" ? (
        <p className="mt-3 text-sm text-coral" role="alert">
          Bokningen gick inte att spara. Ring {restaurant.phone}.
        </p>
      ) : null}
    </form>
  );
}
