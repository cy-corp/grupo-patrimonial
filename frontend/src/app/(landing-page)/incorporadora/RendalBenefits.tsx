"use client";

import {
  Bathtub,
  House,
  Stairs,
  Eye,
  Wallet,
} from "@phosphor-icons/react";
import { RendalReveal } from "./RendalReveal";

const BENEFITS = [
  {
    icon: Stairs,
    title: "Laje que vira lazer",
    body: "Com o mesmo custo de um telhado comum, a cobertura vira área de estar, pergola e vista.",
  },
  {
    icon: Bathtub,
    title: "Lavabo social",
    body: "Visitante se atende sem cruzar a área íntima. Conforto de casa pensada, em qualquer faixa de renda.",
  },
  {
    icon: Eye,
    title: "Acabamento onde se vê",
    body: "Porcelanato, pia e presença visual no olho. Racionalização só no que o cliente não enxerga.",
  },
  {
    icon: Wallet,
    title: "Mais casa no mesmo investimento",
    body: "Você não paga menos por menos. Paga o preço da casa popular e leva produto com presença de empreendimento.",
  },
  {
    icon: House,
    title: "Fluxo que vende sozinho",
    body: "Térreo social, lazer em cima, quartos privados. O dia a dia já está no desenho, antes da visita.",
  },
] as const;

export function RendalBenefits() {
  return (
    <section
      className="bg-[#F8F1E3] px-6 py-16 sm:py-20 md:py-24"
      aria-labelledby="beneficios-titulo"
    >
      <div className="mx-auto max-w-5xl">
        <RendalReveal>
          <header className="mx-auto mb-12 max-w-[680px] text-center md:mb-16">
            <h2
              id="beneficios-titulo"
              className="text-3xl font-semibold tracking-tight text-balance text-[#1F1F1F] sm:text-4xl md:text-5xl"
            >
              O que muda no dia a dia e no bolso
            </h2>
            <p className="mt-4 text-base leading-7 text-pretty text-[#1F1F1F]/70 sm:text-lg sm:leading-8">
              Valor onde se vê. Inteligência onde não se vê. Cinco decisões que
              fazem a casa parecer cara sem inflar o orçamento.
            </p>
          </header>
        </RendalReveal>

        <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {BENEFITS.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className={index === 4 ? "sm:col-span-2 lg:col-span-1" : undefined}>
                <RendalReveal delayMs={index * 80}>
                  <article className="h-full rounded-2xl bg-white p-6 ring-1 ring-[#1F1F1F]/10 sm:p-8">
                    <Icon
                      weight="duotone"
                      className="size-8 text-[#0F5B63]"
                      aria-hidden
                    />
                    <h3 className="mt-4 text-xl font-semibold tracking-tight text-balance text-[#1F1F1F]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-base leading-7 text-pretty text-[#1F1F1F]/65">
                      {item.body}
                    </p>
                  </article>
                </RendalReveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
