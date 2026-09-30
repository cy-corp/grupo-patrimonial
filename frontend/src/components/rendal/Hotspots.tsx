"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/rendal/tokens";
import type { Hotspot } from "@/lib/rendal/content/empreendimentos";

export function Hotspots({
  image,
  items,
  racional,
}: {
  image: { src: string; alt: string };
  items: Hotspot[];
  racional?: Array<{ titulo: string; texto: string }>;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-2">
      <figure className="relative m-0 aspect-video overflow-hidden rounded-4xl bg-[#1F1F1F]">
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 100vw, 640px" className="object-cover" />
        {items.map((item, index) => {
          const on = active === index;
          return (
            <button
              key={item.titulo}
              type="button"
              aria-label={item.titulo}
              aria-pressed={on}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              className={cn(
                "absolute flex size-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-sm font-semibold tabular-nums transition-all duration-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                on ? "scale-110 bg-[#C9A96A] text-[#1F1F1F]" : "bg-white/90 text-[#1F1F1F]",
              )}
              style={{ left: `${item.x}%`, top: `${item.y}%`, transitionTimingFunction: EASE }}
            >
              <span className="relative">{index + 1}</span>
            </button>
          );
        })}
      </figure>
      <div>
        <ol className="m-0 flex list-none flex-col gap-2 p-0">
          {items.map((item, index) => {
            const on = active === index;
            return (
              <li key={item.titulo}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={cn(
                    "flex min-h-11 w-full cursor-pointer items-start gap-4 rounded-2xl p-4 text-left transition-all duration-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7A4A2B]",
                    on ? "bg-white shadow-[0_12px_32px_rgba(31,31,31,0.08)]" : "bg-[#EDE6DA]",
                  )}
                  style={{ transitionTimingFunction: EASE }}
                >
                  <span className="min-w-0">
                    <span className="block text-base font-semibold text-[#1F1F1F]">{item.titulo}</span>
                    <span
                      className={cn(
                        "mt-1 text-base leading-7 text-[#1F1F1F]/65",
                        on ? "block" : "max-lg:hidden",
                      )}
                    >
                      {item.texto}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        {racional?.length ? (
          <div className="mt-8">
            <p className="text-sm font-semibold text-[#1F1F1F]/50">Onde racionalizamos</p>
            <ul className="m-0 mt-3 grid list-none gap-2 p-0">
              {racional.map((item) => (
                <li key={item.titulo} className="rounded-2xl bg-white px-4 py-3 ring-1 ring-[#1F1F1F]/10">
                  <span className="block font-semibold text-[#1F1F1F]">{item.titulo}</span>
                  <span className="mt-1 block text-sm leading-6 text-[#1F1F1F]/65">{item.texto}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
