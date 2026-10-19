import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hours } from "@/components/Hours";
import { FloralRule } from "@/components/Ornaments";
import { restaurant } from "@/content/site";

export const metadata: Metadata = {
  title: "Om oss",
  description: "La Olita på Skånegatan 87 vid Nytorget. Restaurang, scen och food truck.",
};

export default function AboutPage() {
  return (
    <main id="innehall">
      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="font-display text-sm tracking-[0.32em] text-marigold uppercase">Nytorget</p>
        <h1 className="max-w-3xl font-display text-6xl leading-none tracking-wide uppercase md:text-7xl">
          Ett mexikanskt rum på Södermalm
        </h1>
        <FloralRule />
        <div className="mt-10 grid items-start gap-10 md:grid-cols-2">
          <div className="space-y-5 text-lg leading-8 text-bone/90">
            <p>
              La Olita ligger på Skånegatan 87, vid Nytorget. Vi lagar mexikanskt: tacos, quesadillas,
              elotes och margaritas. I veckan öppnar vi till kvällen. På helgen finns lunch.
            </p>
            <p>
              Restaurangen är huset. Food trucken är samma kök när det vill ut på gatan. Var trucken
              står den dagen står på Facebook, inte på en fast skylt.
            </p>
            <p>
              <Link href="/foodtruck" className="text-coral hover:text-cream">
                Till food trucken
              </Link>
            </p>
          </div>
          <div className="relative aspect-[16/10]">
            <Image
              src="/images/event.jpg"
              alt="Rummet med papel picado, ljus och en liten scen"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="kvallar" className="bg-forest-deep">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2">
          <div>
            <h2 className="font-display text-5xl tracking-wide uppercase">Kvällar och scen</h2>
            <p className="mt-4 text-lg leading-8 text-bone/85">
              Utöver den vanliga kvällen blir det ibland livemusik, middagsquiz eller en temakväll.
              Cinco de Mayo är en av dem. Scenen, vår chambre séparée, går att boka för födelsedagar
              och egna sällskap.
            </p>
            <p className="mt-5">
              <a href={restaurant.eventPhoneHref} className="font-display text-3xl text-coral hover:text-cream">
                {restaurant.eventPhone}
              </a>
            </p>
            <p className="text-bone/70">Ring om event och rummet.</p>
          </div>
          <div>
            <h2 className="font-display text-sm tracking-[0.22em] text-marigold uppercase">Öppettider</h2>
            <div className="mt-3">
              <Hours />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 md:grid-cols-3">
        <a href={restaurant.maps} className="bg-canopy p-6 hover:bg-canopy/80">
          <h2 className="font-display text-sm tracking-[0.2em] text-marigold uppercase">Adress</h2>
          <p className="mt-2 font-display text-3xl leading-tight">
            {restaurant.address}
            <br />
            {restaurant.postal}
          </p>
        </a>
        <a href={restaurant.phoneHref} className="bg-canopy p-6 hover:bg-canopy/80">
          <h2 className="font-display text-sm tracking-[0.2em] text-marigold uppercase">Telefon</h2>
          <p className="mt-2 font-display text-3xl">{restaurant.phone}</p>
        </a>
        <a href={restaurant.emailHref} className="bg-canopy p-6 hover:bg-canopy/80">
          <h2 className="font-display text-sm tracking-[0.2em] text-marigold uppercase">E-post</h2>
          <p className="mt-2 font-display text-2xl break-all">{restaurant.email}</p>
        </a>
      </section>
    </main>
  );
}
