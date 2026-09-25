"use client";

import { MagnifyingGlass, CalendarBlank, Key } from "@phosphor-icons/react";
import { RendalReveal } from "./RendalReveal";

const STEPS = [
  {
    num: "01",
    icon: MagnifyingGlass,
    title: "Conheça o produto",
    body: "Veja plantas, laje de lazer e acabamentos do empreendimento. Entenda o que entra no preço antes de agendar.",
  },
  {
    num: "02",
    icon: CalendarBlank,
    title: "Agende uma visita",
    body: "Marque um horário sem compromisso. A equipe mostra o que você vê na fachada e o que fica racional por trás.",
  },
  {
    num: "03",
    icon: Key,
    title: "Reserve sua unidade",
    body: "Escolha a casa, alinhe condições e avance com documentação. O próximo passo fica claro desde o primeiro contato.",
  },
] as const;

export function RendalHowItWorks() {
  return (
    <section
      className="bg-[#FFFFFF] px-6 py-16 sm:py-20 md:py-24"
      aria-labelledby="como-titulo"
    >
      <div className="mx-auto max-w-5xl">
        <RendalReveal>
          <header className="mx-auto mb-12 max-w-[680px] text-center md:mb-16">
            <h2
              id="como-titulo"
              className="text-3xl font-semibold tracking-tight text-balance text-[#1F1F1F] sm:text-4xl md:text-5xl"
            >
              Três passos até a chave
            </h2>
            <p className="mt-4 text-base leading-7 text-pretty text-[#1F1F1F]/70 sm:text-lg sm:leading-8">
              Sem jargão de incorporação. Do primeiro clique à reserva, o caminho
              do comprador.
            </p>
          </header>
        </RendalReveal>

        <ol className="m-0 grid list-none gap-6 p-0 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.num}>
                <RendalReveal delayMs={index * 100}>
                  <article className="h-full rounded-2xl bg-[#F8F1E3] p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold tabular-nums tracking-widest text-[#0F5B63]">
                        {step.num}
                      </span>
                      <Icon
                        weight="duotone"
                        className="size-8 text-[#0F5B63]"
                        aria-hidden
                      />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold tracking-tight text-balance text-[#1F1F1F]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base leading-7 text-pretty text-[#1F1F1F]/65">
                      {step.body}
                    </p>
                  </article>
                </RendalReveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
