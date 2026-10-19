import type { Metadata } from "next";
import { Barlow_Condensed, Fraunces, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { restaurant } from "@/content/site";
import "./globals.css";

const source = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://laolita.se"),
  title: {
    default: "La Olita",
    template: "%s · La Olita",
  },
  description:
    "Mexikansk restaurang och food truck vid Nytorget i Stockholm. Skånegatan 87.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: restaurant.name,
  servesCuisine: "Mexican",
  telephone: "+46761639482",
  email: restaurant.email,
  url: "https://laolita.se",
  address: {
    "@type": "PostalAddress",
    streetAddress: restaurant.address,
    postalCode: "116 35",
    addressLocality: "Stockholm",
    addressCountry: "SE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={`${source.variable} ${barlow.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
