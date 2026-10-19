import Image from "next/image";
import Link from "next/link";
import { Hours } from "@/components/Hours";
import { JustNu } from "@/components/JustNu";
import { PapelPicado } from "@/components/Ornaments";
import { restaurant } from "@/content/site";

const masks = [
  { src: "/images/mask-marigold.jpg", name: "El Oro", text: "Guld och marigold." },
  { src: "/images/mask-rose.jpg", name: "La Rosa", text: "Ben, ros och korall." },
  { src: "/images/mask-teal.jpg", name: "El Jade", text: "Teal, guld och ett leende." },
];

export default function HomePage() {
  return (
    <main id="innehall">
      <section className="relative min-h-[calc(100svh-4.5rem)]">
        <Image
          src="/images/hero.jpg"
          alt="Dukat bord med tacos, ringblommor, ljus och en sockerskalle"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/55 via-forest/35 to-forest" />
        <div className="relative z-10 flex min-h-[calc(100svh-4.5rem)] flex-col items-center justify-center px-6 text-center">
          <p className="font-display text-2xl font-bold tracking-[0.22em] text-marigold uppercase sm:text-3xl">
            Nytorget · Stockholm
          </p>
          <h1 className="mt-3 font-wordmark text-7xl text-cream sm:text-8xl">La Olita</h1>
          <p className="mt-2 font-display text-xl tracking-[0.28em] text-coral uppercase sm:text-2xl">
            Restaurante Mexicano
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/boka"
              className="rounded-full bg-coral px-6 py-3 font-display tracking-[0.16em] text-forest-deep uppercase"
            >
              Boka bord
            </Link>
            <Link
              href="/meny"
              className="rounded-full border border-cream/50 px-6 py-3 font-display tracking-[0.16em] text-cream uppercase hover:bg-cream hover:text-forest"
            >
              Meny
            </Link>
          </div>
        </div>
      </section>

      <PapelPicado />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div>
          <p className="font-display text-sm tracking-[0.28em] text-marigold uppercase">Restaurangen</p>
          <h2 className="mt-2 max-w-xl font-display text-5xl leading-none tracking-wide uppercase md:text-6xl">
            Kväll vid Nytorget, mexikanskt på tallriken
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-bone/85">
            På Skånegatan 87 dukar vi tacos, quesadillas och margaritas. I veckan från sen eftermiddag,
            på helgen redan till lunch. Rummet är mörkt, mariguldet är tänd, och maskerna hänger med.
          </p>
        </div>
        <div className="bg-canopy p-6">
          <p className="font-display text-sm tracking-[0.22em] text-coral uppercase">Hitta hit</p>
          <a href={restaurant.maps} className="mt-2 block font-display text-3xl leading-tight hover:text-coral">
            {restaurant.address}
            <br />
            {restaurant.postal}
          </a>
          <a href={restaurant.takeaway} className="mt-6 inline-block font-display tracking-[0.16em] text-marigold uppercase">
            Beställ takeaway
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="mb-5 font-display text-sm tracking-[0.28em] text-coral uppercase">Just nu</h2>
        <JustNu />
      </section>

      <section className="bg-forest-deep py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-5xl tracking-wide uppercase">Luchadores</h2>
          <p className="mt-2 max-w-lg text-bone/80">Tre masker, påhittade för huset. Ingen av dem har gått en match.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {masks.map((mask) => (
              <li key={mask.name} className="group">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={mask.src}
                    alt={`Luchadormasken ${mask.name}`}
                    fill
                    sizes="(min-width: 640px) 30vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 font-display text-2xl tracking-wide uppercase">{mask.name}</h3>
                <p className="text-bone/75">{mask.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2">
        <div>
          <h2 className="font-display text-sm tracking-[0.28em] text-marigold uppercase">Öppettider</h2>
          <div className="mt-4">
            <Hours />
          </div>
        </div>
        <div className="flex flex-col justify-end bg-canopy p-6">
          <p className="font-display text-3xl leading-tight">
            Food trucken står inte still. Den har en egen sida, i dagsljus.
          </p>
          <Link href="/foodtruck" className="mt-5 font-display tracking-[0.16em] text-coral uppercase">
            Till food trucken
          </Link>
        </div>
      </section>
    </main>
  );
}
