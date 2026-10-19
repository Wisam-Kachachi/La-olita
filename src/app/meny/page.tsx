import type { Metadata } from "next";
import { MenuExplorer } from "@/components/MenuExplorer";
import { categories } from "@/content/meny";

export const metadata: Metadata = {
  title: "Meny",
  description: "Tacos, quesadillas, tillbehör, desserter och dryck hos La Olita på Södermalm.",
};

export default function MenuPage() {
  return (
    <main id="innehall">
      <MenuExplorer categories={categories} />
    </main>
  );
}
