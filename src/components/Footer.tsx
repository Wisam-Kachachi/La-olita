import Link from "next/link";
import { restaurant } from "@/content/site";
import { Hours } from "@/components/Hours";

export function Footer() {
  return (
    <footer className="border-t border-marigold/20 bg-forest-deep text-bone">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-wordmark text-4xl text-cream">La Olita</p>
          <p className="mt-3 max-w-xs text-bone/80">
            Mexikansk restaurang vid Nytorget, och en food truck när köket åker ut.
          </p>
          <address className="mt-5 not-italic">
            <a className="block hover:text-coral" href={restaurant.maps}>
              {restaurant.address}
              <br />
              {restaurant.postal}
            </a>
            <a className="mt-3 block hover:text-coral" href={restaurant.phoneHref}>
              {restaurant.phone}
            </a>
            <a className="block hover:text-coral" href={restaurant.emailHref}>
              {restaurant.email}
            </a>
          </address>
        </div>
        <div>
          <h2 className="font-display text-sm tracking-[0.22em] text-marigold uppercase">Öppettider</h2>
          <div className="mt-3">
            <Hours />
          </div>
        </div>
        <div className="flex flex-col gap-3 font-display text-lg tracking-[0.14em] uppercase">
          <Link href="/meny" className="hover:text-coral">
            Meny
          </Link>
          <Link href="/foodtruck" className="hover:text-coral">
            Foodtruck
          </Link>
          <Link href="/om-oss" className="hover:text-coral">
            Om oss
          </Link>
          <Link href="/boka" className="hover:text-coral">
            Boka bord
          </Link>
          <a href={restaurant.takeaway} className="hover:text-coral">
            Takeaway
          </a>
          <a href={restaurant.facebook} className="hover:text-coral">
            Facebook
          </a>
        </div>
      </div>
      <p className="border-t border-bone/10 px-5 py-4 text-center text-sm text-bone/60">
        © 2026 La Olita. Alla rättigheter förbehållna.
      </p>
    </footer>
  );
}
