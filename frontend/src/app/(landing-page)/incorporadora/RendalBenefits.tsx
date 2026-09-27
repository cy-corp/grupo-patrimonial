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
    title: "Laje de lazer",
    body: "A cobertura vira uma extensão da casa, com área de estar, pérgola e espaço para receber.",
  },
  {
    icon: Bathtub,
    title: "Lavabo social",
    body: "Quem visita usa o lavabo sem atravessar os quartos. Mais privacidade no dia a dia.",
  },
  {
    icon: Eye,
    title: "Acabamento que aparece",
    body: "Fachada, porcelanato e pia recebem atenção porque fazem parte da experiência de morar.",
  },
  {
    icon: Wallet,
    title: "Orçamento racionalizado",
    body: "A economia fica no que não muda o uso da casa. O investimento vai para o que o morador percebe.",
  },
  {
    icon: House,
    title: "Planta que acompanha a rotina",
    body: "Convívio no térreo, lazer na cobertura e quartos mais reservados. Cada ambiente tem seu lugar.",
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
              Cinco escolhas que mudam a casa
            </h2>
            <p className="mt-4 text-base leading-7 text-pretty text-[#1F1F1F]/70 sm:text-lg sm:leading-8">
              Mais espaço para viver, conforto no uso diário e acabamento onde
              ele faz diferença.
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
