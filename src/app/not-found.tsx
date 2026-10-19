import Link from "next/link";

export default function NotFound() {
  return (
    <main id="innehall" className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="font-display tracking-[0.28em] text-marigold uppercase">404</p>
      <h1 className="mt-3 font-display text-6xl uppercase">Sidan finns inte</h1>
      <Link href="/" className="mt-8 inline-block text-coral hover:text-cream">
        Tillbaka till La Olita
      </Link>
    </main>
  );
}
