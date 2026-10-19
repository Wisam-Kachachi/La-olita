"use client";

import Image from "next/image";
import { useState } from "react";
import type { Category } from "@/content/meny";

export function MenuExplorer({ categories }: { categories: Category[] }) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const active = categories.find((category) => category.id === activeId) ?? categories[0];

  if (!active) return null;

  return (
    <div>
      <section className="hidden h-[calc(100svh-4.5rem)] md:grid md:grid-cols-[300px_1fr]">
        <div className="flex flex-col border-r border-bone/10 bg-forest-deep px-5 py-8">
          <p className="font-display text-sm tracking-[0.32em] text-marigold uppercase">La carta</p>
          <h1 className="font-display text-5xl tracking-wide uppercase">Meny</h1>
          <p className="mt-1 text-sm text-bone/70">Håll över en avdelning.</p>
          <ul className="mt-8 flex flex-col gap-1">
          {categories.map((category) => {
            const selected = category.id === active.id;
            return (
              <li key={category.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveId(category.id)}
                  onFocus={() => setActiveId(category.id)}
                  className={`w-full px-4 py-3 text-left font-display text-3xl tracking-wide uppercase transition-colors ${
                    selected ? "bg-cream text-coral" : "text-bone/80 hover:text-cream"
                  }`}
                  aria-pressed={selected}
                >
                  {category.title}
                </button>
              </li>
            );
          })}
          </ul>
        </div>
        <CategoryStage category={active} categories={categories} />
      </section>

      <section className="md:hidden">
        <div className="px-5 pt-8 pb-4">
          <p className="font-display text-sm tracking-[0.32em] text-marigold uppercase">La carta</p>
          <h1 className="font-display text-5xl tracking-wide uppercase">Meny</h1>
          <p className="mt-1 text-bone/70">Tryck på en avdelning.</p>
        </div>
        <ul>
          {categories.map((category) => {
            const selected = category.id === active.id;
            return (
              <li key={category.id} className="border-b border-bone/10">
                <button
                  type="button"
                  className={`flex w-full items-center justify-between px-5 py-4 text-left font-display text-2xl tracking-wide uppercase ${
                    selected ? "bg-cream text-coral" : "text-bone"
                  }`}
                  aria-expanded={selected}
                  onClick={() => setActiveId(category.id)}
                >
                  {category.title}
                  <span aria-hidden>{selected ? "–" : "+"}</span>
                </button>
                {selected ? (
                  <div className="bg-forest">
                    <CategoryStage category={category} compact />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function CategoryStage({
  category,
  categories,
  compact = false,
}: {
  category: Category;
  categories?: Category[];
  compact?: boolean;
}) {
  const photos = categories ?? [category];
  return (
    <div className={`relative h-full ${compact ? "min-h-[34rem]" : "min-h-0"}`}>
      {photos.map((photo) => (
        <Image
          key={photo.id}
          src={photo.image}
          alt=""
          fill
          sizes={compact ? "100vw" : "70vw"}
          className={`object-cover transition-opacity duration-500 ${
            photo.id === category.id ? "opacity-100" : "opacity-0"
          }`}
          priority={photo.id === category.id}
          loading={photo.id === category.id ? "eager" : "lazy"}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/75 to-forest/10" />
      <div className="absolute inset-x-0 bottom-0 max-h-full overflow-y-auto p-5 md:p-8">
        <p className="font-display text-sm tracking-[0.28em] text-marigold uppercase">{category.blurb}</p>
        <h2 className="mt-1 font-display text-5xl tracking-wide text-cream uppercase">{category.title}</h2>
        <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {category.dishes.map((dish) => (
            <li key={dish.name} className="border-b border-bone/20 pb-3">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-xl tracking-wide text-cream uppercase">{dish.name}</h3>
                <span className="shrink-0 text-marigold">{dish.price}</span>
              </div>
              <p className="mt-1 text-sm leading-6 text-bone/80">
                {dish.tag ? <span className="mr-2 text-coral">{dish.tag}.</span> : null}
                {dish.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
