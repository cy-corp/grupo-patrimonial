"use client";

import { MagnifyingGlass, CalendarBlank, Key } from "@phosphor-icons/react";
import { RendalReveal } from "./RendalReveal";

const STEPS = [
  {
    num: "01",
    icon: MagnifyingGlass,
    title: "Compare plantas e acabamentos",
    body: "Veja a distribuição dos ambientes, a laje de lazer e os acabamentos antes de marcar sua visita.",
  },
  {
    num: "02",
    icon: CalendarBlank,
    title: "Agende uma visita",
    body: "Conheça o empreendimento no seu ritmo e tire dúvidas sobre a unidade, o projeto e as condições.",
  },
  {
    num: "03",
    icon: Key,
    title: "Escolha como avançar",
    body: "Se fizer sentido para você, alinhe a unidade, as condições e a documentação com a equipe.",
  },
] as const;

export function RendalHowItWorks() {
  return (
    <section
      className="bg-[#FFFFFF] px-6 py-12 sm:py-20 md:py-24"
      aria-labelledby="como-titulo"
    >
      <div className="mx-auto max-w-5xl">
        <RendalReveal>
          <header className="mx-auto mb-8 max-w-[680px] text-center md:mb-16">
            <h2
              id="como-titulo"
              className="text-3xl font-semibold tracking-tight text-balance text-[#1F1F1F] sm:text-4xl md:text-5xl"
            >
              Um caminho claro até a sua unidade
            </h2>
            <p className="mt-4 text-base leading-7 text-pretty text-[#1F1F1F]/70 sm:text-lg sm:leading-8">
              Informação para decidir com segurança, sem pressão para comprar.
            </p>
          </header>
        </RendalReveal>

        <ol className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.num} className="min-w-0">
                <RendalReveal delayMs={index * 100} className="h-full">
                  <article className="flex h-full flex-col rounded-2xl bg-[#F8F1E3] p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold tabular-nums tracking-widest text-[#7A4A2B]">
                        {step.num}
                      </span>
                      <Icon
                        weight="duotone"
                        className="size-8 text-[#7A4A2B]"
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
