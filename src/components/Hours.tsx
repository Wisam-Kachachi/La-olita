import { hoursList } from "@/lib/slots";

export function Hours({ light = false }: { light?: boolean }) {
  return (
    <dl className={light ? "text-ink" : "text-bone"}>
      {hoursList.map((row) => (
        <div key={row.day} className="flex justify-between gap-8 border-b border-current/15 py-2.5">
          <dt className="font-display text-lg tracking-wide">{row.day}</dt>
          <dd className="tabular-nums">
            {row.open} – {row.close}
          </dd>
        </div>
      ))}
    </dl>
  );
}
