"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  DCORP_SYSTEMS,
  DCORP_SYSTEMS_HEADLINE,
} from "@/lib/dcorp-content";
import { cn } from "@/lib/utils";
import { DcorpPageCta, DcorpPageIntro } from "../DcorpPageChrome";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, amount: 0.2 } as const;

/** Labels curtos só no índice — evita quebra feia no grid 2×2 mobile. */
const NAV_LABELS: Record<string, string> = {
  "painel-monolitico-eps": "Painel EPS",
  "concreto-in-loco": "Concreto in loco",
  icf: "ICF",
  lightwall: "Lightwall",
};

export default function DcorpSistemasPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-28 md:px-12 md:pb-14 md:pt-36 lg:px-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
        >
          <DcorpPageIntro
            eyebrow="Sistemas construtivos"
            title={DCORP_SYSTEMS_HEADLINE}
            description="Quatro soluções — seco, semi-industrializado ou moldado in loco. Cada uma com tipo, benefícios e quando aplicar."
          />
        </motion.div>

        <nav
          aria-label="Índice de sistemas"
          className="mt-12 grid grid-cols-2 border border-[#D9D9D9] md:mt-14 lg:grid-cols-4"
        >
          {DCORP_SYSTEMS.map((system, index) => (
            <a
              key={system.id}
              href={`#${system.id}`}
              className={cn(
                "group relative flex min-h-[5.5rem] flex-col justify-between gap-3 p-4 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] md:min-h-[6.25rem] md:p-5",
                "border-[#D9D9D9] hover:bg-[#F7F7F7]",
                index % 2 === 0 ? "border-r" : "",
                index < 2 ? "border-b" : "",
                "lg:border-b-0 lg:border-r lg:[&:nth-child(4)]:border-r-0",
              )}
            >
              <span
                className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-[#C9A96A] transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:scale-y-100"
                aria-hidden="true"
              />
              <span className="font-sans text-xl font-bold tabular-nums text-[#C9A96A] md:text-2xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="block">
                <span className="block font-sans text-[10px] font-semibold uppercase tracking-wide text-[#4D4D4D] transition-colors group-hover:text-[#C9A96A]">
                  {system.typeLabel}
                </span>
                <span className="mt-1 block text-pretty font-sans text-sm font-semibold leading-snug text-[#1F1F1F] md:text-[15px]">
                  {NAV_LABELS[system.id] ?? system.shortName}
                </span>
              </span>
            </a>
          ))}
        </nav>
      </div>

      <div className="divide-y divide-[#D9D9D9]">
        {DCORP_SYSTEMS.map((system, index) => {
          const reverse = index % 2 === 1;

          return (
            <article
              key={system.id}
              id={system.id}
              className={cn(
                "scroll-mt-28 px-6 py-14 md:px-12 md:py-20 lg:px-20",
                reverse ? "bg-[#F7F7F7]" : "bg-white",
              )}
            >
              <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
                <motion.div
                  className={cn(
                    "relative aspect-[3/2] overflow-hidden bg-[#1F1F1F] lg:col-span-6",
                    reverse && "lg:order-2",
                  )}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.65, ease: EASE }}
                >
                  <Image
                    src={system.image}
                    alt={system.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain"
                    priority={index === 0}
                  />
                </motion.div>

                <motion.div
                  className={cn(
                    "lg:col-span-6",
                    reverse && "lg:order-1",
                  )}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-[11px] font-semibold tabular-nums text-[#C9A96A]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-8 bg-[#C9A96A]" aria-hidden="true" />
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-wide text-[#C9A96A]">
                      {system.typeLabel}
                    </p>
                  </div>

                  <h2 className="mt-4 max-w-[16ch] text-balance font-sans text-2xl font-bold text-[#1F1F1F] md:text-3xl lg:text-4xl">
                    {system.name}
                  </h2>

                  <p className="mt-5 max-w-xl text-pretty font-sans text-base leading-relaxed text-[#4D4D4D] md:text-lg">
                    {system.summary}
                  </p>

                  <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#D9D9D9] pt-6">
                    {system.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="font-sans text-sm text-[#1F1F1F] before:mr-2 before:text-[#C9A96A] before:content-['—']"
                      >
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-8 max-w-xl border-l-2 border-[#C9A96A] pl-4 font-sans text-sm leading-relaxed text-[#4D4D4D]">
                    <span className="font-semibold text-[#1F1F1F]">
                      Quando usar.{" "}
                    </span>
                    {system.when}
                  </p>
                </motion.div>
              </div>
            </article>
          );
        })}
      </div>

      <DcorpPageCta
        title="Quer aplicar o sistema certo no seu projeto?"
        description="Nossa equipe indica a solução de alta produtividade mais adequada ao empreendimento."
      />
    </main>
  );
}
