import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { Hours } from "@/components/Hours";
import { restaurant } from "@/content/site";

export const metadata: Metadata = {
  title: "Boka bord",
  description: "Boka bord på La Olita. En reservation håller platserna i 1,5 timme.",
};

export default function BookingPage() {
  return (
    <main id="innehall" className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="font-display text-sm tracking-[0.32em] text-marigold uppercase">Restaurangen</p>
        <h1 className="mt-2 font-display text-6xl leading-none tracking-wide uppercase">Boka bord</h1>
        <p className="mt-5 text-lg leading-8 text-bone/85">
          Välj dag, tid och sällskap. Restaurangen har {restaurant.platser} platser. När de är upptagna
          går tiden inte att boka. Ett bord hålls i 1,5 timme.
        </p>
        <p className="mt-4 text-bone/75">
          Hellre ringa?{" "}
          <a className="text-coral hover:text-cream" href={restaurant.phoneHref}>
            {restaurant.phone}
          </a>
        </p>
        <div className="mt-8 max-w-sm">
          <Hours />
        </div>
        <p className="mt-4 text-sm text-bone/60">Sista tiden ligger 90 minuter före stängning.</p>
      </div>
      <BookingForm />
    </main>
  );
}
