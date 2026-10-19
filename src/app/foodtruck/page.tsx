import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PapelPicado } from "@/components/Ornaments";
import { restaurant } from "@/content/site";

export const metadata: Metadata = {
  title: "Food truck",
  description: "La Olitas food truck. Följ Facebook för var trucken står.",
};

const windowItems = [
  { name: "Tacos", text: "Carnitas, fisk och blomkål." },
  { name: "Elotes", text: "Grillad majs, ost och tajín." },
  { name: "Något kallt", text: "Lager och lime när luckan är öppen." },
];

export default function FoodTruckPage() {
  return (
    <main id="innehall" className="truck-sun text-ink">
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="inline-block -rotate-2 border-2 border-dashed border-coral px-3 py-1 font-display text-sm tracking-[0.28em] text-coral uppercase">
            På gatan
          </p>
          <p className="mt-6 font-wordmark text-3xl text-forest">La Olita</p>
          <h1 className="font-display text-7xl leading-none tracking-wide text-forest uppercase md:text-8xl">
            Food truck
          </h1>
          <p className="mt-5 max-w-md text-lg leading-8">
            Samma kök, ute i solen. Trucken tar tacos och elotes dit torget är den dagen. Vi skriver
            inte upp en fast adress, för den byts.
          </p>
          <a
            href={restaurant.facebook}
            className="mt-8 inline-block rounded-full bg-forest px-6 py-3 font-display tracking-[0.16em] text-sun uppercase hover:bg-coral hover:text-forest"
          >
            Var står vi idag
          </a>
        </div>
        <div className="rotate-1 border-8 border-white shadow-[0_18px_50px_rgba(18,36,31,0.25)]">
          <div className="relative aspect-[16/10]">
            <Image
              src="/images/truck.jpg"
              alt="La Olitas food truck med en luchadormålning på sidan"
              fill
              priority
              loading="eager"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <PapelPicado tone="fiesta" />

      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="font-display text-4xl tracking-wide text-forest uppercase">Med på luckan</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {windowItems.map((item) => (
            <li key={item.name} className="border-2 border-forest bg-white/70 p-5">
              <h3 className="font-display text-3xl tracking-wide text-coral uppercase">{item.name}</h3>
              <p className="mt-2 leading-7">{item.text}</p>
            </li>
          ))}
        </ul>
        <Link href="/meny" className="mt-6 inline-block font-display tracking-[0.16em] text-forest uppercase underline decoration-marigold decoration-2 underline-offset-4">
          Hela menyn inne
        </Link>
      </section>

      <section className="bg-marigold/25">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 md:grid-cols-[0.8fr_1.2fr]">
          <div className="relative mx-auto aspect-[3/4] w-56 overflow-hidden border-4 border-forest">
            <Image src="/images/mask-teal.jpg" alt="Luchadormasken El Jade" fill sizes="224px" className="object-cover" />
          </div>
          <div>
            <h2 className="font-display text-5xl leading-none tracking-wide text-forest uppercase">Masken åker med</h2>
            <p className="mt-4 max-w-lg text-lg leading-8">
              Inne är det ljus och marigold. Ute är det lucka, kö och samma smak. Följ Facebook så du
              möter trucken där den faktiskt står.
            </p>
            <p className="mt-6">
              <a className="font-display text-xl tracking-wide text-forest hover:text-coral" href={restaurant.phoneHref}>
                {restaurant.phone}
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
