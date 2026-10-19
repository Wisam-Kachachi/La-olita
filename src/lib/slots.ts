export const RESERVATION_MINUTES = 90;
export const LAST_SEATING_MINUTES = RESERVATION_MINUTES;

export const hoursList = [
  { day: "Måndag", open: "16:30", close: "23:00", index: 1 },
  { day: "Tisdag", open: "16:30", close: "23:00", index: 2 },
  { day: "Onsdag", open: "16:30", close: "23:00", index: 3 },
  { day: "Torsdag", open: "16:30", close: "23:00", index: 4 },
  { day: "Fredag", open: "16:30", close: "01:00", index: 5 },
  { day: "Lördag", open: "12:00", close: "01:00", index: 6 },
  { day: "Söndag", open: "12:00", close: "22:00", index: 0 },
] as const;

const byIndex = Object.fromEntries(hoursList.map((row) => [row.index, row]));

export function stockholmDate(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Stockholm",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function addDays(isoDate: string, days: number) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days, 12));
  return date.toISOString().slice(0, 10);
}

export function weekdayIndex(isoDate: string) {
  const date = new Date(`${isoDate}T12:00:00Z`);
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Stockholm",
    weekday: "short",
  }).format(date);
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return map[weekday] ?? 0;
}

export function toMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function stockholmMinutes(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Stockholm",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const hours = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minutes = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  return hours * 60 + minutes;
}

export function timeSlots(isoDate: string, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return [];
  const today = stockholmDate(now);
  if (isoDate < today || isoDate > addDays(today, 60)) return [];

  const hours = byIndex[weekdayIndex(isoDate)];
  if (!hours) return [];

  const start = toMinutes(hours.open);
  let end = toMinutes(hours.close);
  if (end <= start) end += 24 * 60;
  end -= LAST_SEATING_MINUTES;

  const slots: string[] = [];
  for (let minute = start; minute <= end; minute += 30) {
    const hh = Math.floor(minute / 60) % 24;
    const mm = minute % 60;
    slots.push(`${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`);
  }

  if (isoDate !== today) return slots;
  const nowMinutes = stockholmMinutes(now);
  return slots.filter((slot) => toMinutes(slot) > nowMinutes);
}

export function addMinutesLabel(time: string, minutes: number) {
  const total = toMinutes(time) + minutes;
  const hours = Math.floor(total / 60) % 24;
  const mins = total % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}
