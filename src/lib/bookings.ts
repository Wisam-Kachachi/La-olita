import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { restaurant } from "@/content/site";
import { RESERVATION_MINUTES, addMinutesLabel, timeSlots, toMinutes } from "@/lib/slots";

export type StoredBooking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  party: number;
  message: string;
  createdAt: string;
};

export type OpenSlot = {
  time: string;
  seatsLeft: number;
};

const filePath = path.join(process.cwd(), "data", "bookings.json");

let queue: Promise<unknown> = Promise.resolve();

function exclusive<T>(task: () => Promise<T>) {
  const run = queue.then(task, task);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function readAll() {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as StoredBooking[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function seatsLeft(time: string, sameDay: StoredBooking[]) {
  const start = toMinutes(time);
  let free = restaurant.platser;
  for (let minute = start; minute < start + RESERVATION_MINUTES; minute += 30) {
    let used = 0;
    for (const booking of sameDay) {
      const bookingStart = toMinutes(booking.time);
      if (minute >= bookingStart && minute < bookingStart + RESERVATION_MINUTES) {
        used += booking.party;
      }
    }
    free = Math.min(free, restaurant.platser - used);
  }
  return free;
}

export function openSlots(date: string, party: number, bookings: StoredBooking[], now = new Date()) {
  const sameDay = bookings.filter((booking) => booking.date === date);
  return timeSlots(date, now)
    .map((time) => ({ time, seatsLeft: seatsLeft(time, sameDay) }))
    .filter((slot) => slot.seatsLeft >= party);
}

export async function listOpenSlots(date: string, party: number) {
  const bookings = await readAll();
  const hours = timeSlots(date);
  const slots = openSlots(date, party, bookings);
  const reason = hours.length === 0 ? "none" : slots.length === 0 ? "full" : "open";
  return { slots, reason } as const;
}

export async function createBooking(input: Omit<StoredBooking, "id" | "createdAt">) {
  return exclusive(async () => {
    const bookings = await readAll();
    if (!timeSlots(input.date).includes(input.time)) {
      return { ok: false as const, error: "invalid" as const };
    }
    const slot = openSlots(input.date, input.party, bookings).find((item) => item.time === input.time);
    if (!slot) {
      return { ok: false as const, error: "full" as const };
    }

    const saved: StoredBooking = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, JSON.stringify([saved, ...bookings], null, 2));
    return {
      ok: true as const,
      until: addMinutesLabel(input.time, RESERVATION_MINUTES),
    };
  });
}
