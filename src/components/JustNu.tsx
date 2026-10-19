import Image from "next/image";
import Link from "next/link";

const panels = [
  {
    href: "/om-oss#kvallar",
    title: "Cinco de Mayo",
    text: "Temakvällar, livemusik och quiz när vi gör något extra.",
    image: "/images/hero.jpg",
  },
  {
    href: "/om-oss#kvallar",
    title: "Scenen",
    text: "Boka rummet för födelsedag eller ett eget sällskap.",
    image: "/images/event.jpg",
  },
  {
    href: "/foodtruck",
    title: "Food truck",
    text: "Samma kök, någon annanstans i stan.",
    image: "/images/truck.jpg",
  },
];

export function JustNu() {
  return (
    <div className="flex flex-col gap-3 md:h-[28rem] md:flex-row">
      {panels.map((panel) => (
        <Link
          key={panel.title}
          href={panel.href}
          className="group relative h-72 overflow-hidden md:h-auto md:flex-1 md:transition-all md:duration-500 md:hover:flex-[2.15]"
        >
          <Image src={panel.image} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-forest/45 transition-colors group-hover:bg-forest/60" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="font-display text-4xl tracking-wide text-cream uppercase">{panel.title}</h3>
            <p className="mt-2 max-w-sm text-bone md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-500 md:group-hover:max-h-24 md:group-hover:opacity-100">
              {panel.text}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
