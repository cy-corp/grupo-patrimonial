"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/rendal/tokens";
import type { Empreendimento } from "@/lib/rendal/content/empreendimentos";

function Plant({
  item,
  step,
  className,
}: {
  item: Empreendimento;
  step: Empreendimento["diaNaCasa"][number];
  className?: string;
}) {
  const planta = item.plantas.find((entry) => entry.id === step.planta) ?? item.plantas[0];
  const cx = step.box.x + step.box.w / 2;
  const cy = step.box.y + step.box.h / 2;
  const size = Math.max(step.box.w, step.box.h) * 1.15;

  return (
    <figure
      className={cn(
        "relative m-0 mx-auto max-w-md overflow-hidden rounded-3xl bg-[#EDE6DA]",
        className,
      )}
    >
      <Image
        key={planta.imagem.src}
        src={planta.imagem.src}
        alt={planta.imagem.alt}
        width={645}
        height={1024}
        sizes="(max-width: 1024px) 100vw, 448px"
        className="h-auto max-h-[65svh] w-full object-contain"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute rounded-full bg-[#0F5B63]/20 ring-2 ring-[#0F5B63]/55 transition-all duration-500 motion-reduce:transition-none"
        style={{
          left: `${cx}%`,
          top: `${cy}%`,
          width: `${size}%`,
          height: `${size}%`,
          transform: "translate(-50%, -50%)",
          transitionTimingFunction: EASE,
        }}
      />
      <figcaption className="sr-only">{step.ambiente}</figcaption>
    </figure>
  );
}

export function DayInHouse({ item }: { item: Empreendimento }) {
  const [active, setActive] = useState(0);
  const step = item.diaNaCasa[active] ?? item.diaNaCasa[0];

  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      <Plant item={item} step={step} className="sticky top-24 max-lg:static" />
      <ol className="m-0 flex list-none flex-col gap-3 p-0">
        {item.diaNaCasa.map((passo, index) => {
          const on = active === index;
          return (
            <li key={passo.hora}>
              <button
                type="button"
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                aria-pressed={on}
                className={cn(
                  "w-full cursor-pointer rounded-3xl bg-white p-5 text-left ring-1 transition-[box-shadow,ring-color] duration-500 motion-reduce:transition-none",
                  on ? "ring-[#0F5B63] shadow-[0_0_0_1px_#0F5B63]" : "ring-[#1F1F1F]/10",
                )}
                style={{ transitionTimingFunction: EASE }}
              >
                <p className="text-sm font-semibold tabular-nums text-[#0F5B63]">{passo.hora}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-balance text-[#1F1F1F]">
                  {passo.titulo}
                </h3>
                <p className="mt-2 text-base leading-7 text-pretty text-[#1F1F1F]/70">{passo.texto}</p>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
