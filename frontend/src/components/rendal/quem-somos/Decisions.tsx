"use client";

import { useState } from "react";
import { HandTap } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/rendal/tokens";
import { SnapRail } from "@/components/rendal/SnapRail";

const CARDS = [
  {
    mercado: "Telhado de madeira que ninguém usa",
    rendal: "Laje impermeabilizada que vira lazer",
  },
  {
    mercado: "Um banheiro no fundo, junto aos quartos",
    rendal: "Lavabo social: visita não entra na área íntima",
  },
  {
    mercado: "Orçamento igual em tudo",
    rendal: "Capital no que se vê e se usa; técnica racional no resto",
  },
  {
    mercado: "Venda sem mostrar o projeto",
    rendal: "Planta, acabamento e memorial abertos antes da visita",
  },
];

function FlipCard({
  mercado,
  rendal,
  delayMs,
}: {
  mercado: string;
  rendal: string;
  delayMs: number;
}) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? `Decisão Rendal: ${rendal}` : `Padrão de mercado: ${mercado}. Clique para virar.`}
      onClick={() => setOn((value) => !value)}
      className="h-56 w-full cursor-pointer text-left [perspective:1000px]"
    >
      <span
        className={cn(
          "block h-full transition-transform duration-700 motion-reduce:transition-none [transform-style:preserve-3d]",
          on ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]",
        )}
        style={{ transitionTimingFunction: EASE }}
      >
        <span
          className={cn(
            "grid h-full [transform-style:preserve-3d]",
            !on && "rendal-card-yaw",
          )}
          style={{ animationDelay: `${delayMs}ms` }}
        >
          <span className="col-start-1 row-start-1 flex h-full flex-col justify-between rounded-3xl bg-[#EDE6DA] p-6 [backface-visibility:hidden]">
            <span className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-[#1F1F1F]/50">Padrão de mercado</span>
              <HandTap
                weight="duotone"
                aria-hidden
                className="rendal-tap-hand size-6 shrink-0 text-[#7A4A2B]"
                style={{ animationDelay: `${delayMs}ms` }}
              />
            </span>
            <span className="text-xl font-semibold tracking-tight text-balance text-[#1F1F1F]/40 line-through decoration-[#1F1F1F]/30">
              {mercado}
            </span>
          </span>
          <span className="col-start-1 row-start-1 flex h-full flex-col justify-between rounded-3xl bg-[#1F1F1F] p-6 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="text-sm font-semibold text-white/70">Decisão Rendal</span>
            <span className="text-xl font-semibold tracking-tight text-balance">{rendal}</span>
          </span>
        </span>
      </span>
    </button>
  );
}

export function Decisions() {
  return (
    <>
      <div className="md:hidden">
        <SnapRail label="Decisões Rendal">
          {CARDS.map((card) => (
            <article key={card.rendal} className="rounded-3xl bg-white p-5 ring-1 ring-[#1F1F1F]/10">
              <p className="text-base text-[#1F1F1F]/40 line-through">{card.mercado}</p>
              <p className="mt-4 text-lg font-semibold text-[#7A4A2B]">{card.rendal}</p>
            </article>
          ))}
        </SnapRail>
      </div>
      <div className="hidden gap-4 md:grid md:grid-cols-2">
        {CARDS.map((card, index) => (
          <FlipCard key={card.rendal} {...card} delayMs={index * 280} />
        ))}
      </div>
    </>
  );
}
