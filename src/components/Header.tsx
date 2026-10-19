"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  const bookingActive = pathname === "/boka";

  return (
    <header className="sticky top-0 z-40 border-b border-marigold/25 bg-forest/95 backdrop-blur">
      <a
        href="#innehall"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-cream focus:px-3 focus:py-2 focus:text-ink"
      >
        Hoppa till innehåll
      </a>
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="font-wordmark text-3xl leading-none text-cream">
          La Olita
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Sidmeny">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-display text-sm tracking-[0.22em] uppercase ${
                  active ? "text-bone" : "text-coral"
                } hover:text-bone`}
                aria-current={active ? "page" : undefined}
              >
                <span className={active ? "border-b border-marigold pb-1" : undefined}>{item.label}</span>
              </Link>
            );
          })}
          <Link
            href="/boka"
            className={`rounded-full px-5 py-2.5 font-display text-sm tracking-[0.18em] uppercase ${
              bookingActive ? "bg-cream text-forest" : "bg-coral text-forest-deep hover:bg-cream"
            }`}
            aria-current={bookingActive ? "page" : undefined}
          >
            Boka bord
          </Link>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/boka"
            className="rounded-full bg-coral px-4 py-2 font-display text-xs tracking-[0.16em] text-forest-deep uppercase"
          >
            Boka bord
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            aria-expanded={open}
            aria-controls="mobilmeny"
            aria-label={open ? "Stäng menyn" : "Öppna menyn"}
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            <span className="block h-0.5 w-6 bg-cream" />
            <span className="block h-0.5 w-6 bg-cream" />
            <span className="block h-0.5 w-6 bg-coral" />
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobilmeny" className="border-t border-bone/10 bg-forest-deep px-5 py-4 md:hidden" aria-label="Sidmeny">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 font-display text-2xl tracking-[0.16em] text-coral uppercase"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
