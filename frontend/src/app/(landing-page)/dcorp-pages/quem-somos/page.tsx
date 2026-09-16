"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { DCORP_POSITIONING } from "@/lib/dcorp-content";
import { DcorpPageCta } from "../DcorpPageChrome";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, amount: 0.15 } as const;

const PILLARS = [
  {
    title: "Planejamento",
    detail: "Estratégia, inteligência e viabilidade técnica.",
  },
  {
    title: "Pessoas",
    detail: "Parceria e confiança com quem executa e quem investe.",
  },
  {
    title: "Execução",
    detail: "Resultados concretos com método e fiscalização.",
  },
] as const;

const ACTUATION = [
  {
    title: "Obras próprias",
    detail:
      "Empreendimentos sob responsabilidade direta da DCORP — engenharia, sistema e entrega no mesmo comando.",
  },
  {
    title: "Serviços a terceiros",
    detail:
      "Execução para incorporadoras, investidores e SPEs — inclusive fora da holding, com prazo e custo sob controle.",
  },
  {
    title: "Sistemas industrializados",
    detail:
      "Painel monolítico EPS, concreto in loco, ICF e Lightwall — escolhidos pelo desempenho da obra, não por catálogo.",
    href: "/sistemas-construtivos",
  },
] as const;

const ABOUT_IMAGE = "/dcorp/about/01-institucional.jpg";

export default function DcorpQuemSomosPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:px-12 md:pb-28 md:pt-36 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
          <motion.header
            className="lg:col-span-6"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.12 }}
          >
            <div className="mb-5 flex items-center gap-3 md:mb-6">
              <span
                className="h-px w-12 bg-[#C9A96A] md:w-16 lg:w-20"
                aria-hidden="true"
              />
              <p className="font-sans text-sm font-semibold uppercase tracking-wide text-[#C9A96A] md:text-base">
                A DCORP
              </p>
            </div>
            <h1 className="max-w-[14ch] text-balance font-sans text-3xl font-bold text-[#1F1F1F] md:text-5xl lg:text-6xl">
              Engenharia e construção industrializada.
            </h1>
            <p className="mt-6 max-w-xl text-pretty font-sans text-base leading-relaxed text-[#4D4D4D] md:text-lg">
              {DCORP_POSITIONING}
            </p>
          </motion.header>

          <motion.div
            className="relative aspect-[4/5] overflow-hidden bg-[#1F1F1F] lg:col-span-6 lg:aspect-[5/6]"
            initial={reduceMotion ? false : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.18 }}
          >
            <motion.div
              className="absolute inset-0 origin-center"
              initial={reduceMotion ? false : { scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.05, ease: EASE, delay: 0.18 }}
            >
              <Image
                src={ABOUT_IMAGE}
                alt="Mesa de engenharia com plantas, capacete e estrutura de concreto ao fundo"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.section
          className="mt-20 border-t border-[#D9D9D9] pt-14 md:mt-24 md:pt-16"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="font-sans text-2xl font-bold text-[#1F1F1F] md:text-3xl">
                Especialização técnica e capacidade de execução
              </h2>
              <p className="mt-6 text-pretty font-sans text-base leading-relaxed text-[#4D4D4D]">
                A DCORP une planejamento, sistemas construtivos industrializados
                e entrega em obra — com produtividade, redução de desperdícios
                e previsibilidade.
              </p>
            </div>

            <ul className="grid gap-0 border-t border-[#D9D9D9] sm:grid-cols-3 lg:col-span-7">
              {PILLARS.map((pillar, index) => (
                <motion.li
                  key={pillar.title}
                  className="border-b border-[#D9D9D9] py-7 sm:border-r sm:px-6 sm:[&:nth-child(3n)]:border-r-0"
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{
                    duration: 0.5,
                    ease: EASE,
                    delay: 0.06 * index,
                  }}
                >
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-wide text-[#C9A96A]">
                    {pillar.title}
                  </p>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-[#4D4D4D] md:text-base">
                    {pillar.detail}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>
      </div>

      <section className="bg-[#F7F7F7] px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="max-w-xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C9A96A]" aria-hidden="true" />
              <p className="font-sans text-[11px] font-semibold uppercase tracking-wide text-[#C9A96A]">
                Operação
              </p>
            </div>
            <h2 className="font-sans text-2xl font-bold text-[#1F1F1F] md:text-3xl">
              Modelo de atuação
            </h2>
            <p className="mt-3 text-pretty font-sans text-base leading-relaxed text-[#4D4D4D]">
              Uma engenharia, três frentes — sempre com método, sistema e
              entrega.
            </p>
          </motion.div>

          <ol className="mt-12 border-t border-[#D9D9D9]">
            {ACTUATION.map((item, index) => (
              <motion.li
                key={item.title}
                className="grid gap-4 border-b border-[#D9D9D9] py-8 sm:grid-cols-[4.5rem_1fr] sm:gap-8 sm:py-10 lg:grid-cols-[5.5rem_minmax(0,14rem)_1fr] lg:items-baseline lg:gap-12"
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{
                  duration: 0.5,
                  ease: EASE,
                  delay: 0.06 * index,
                }}
              >
                <span className="font-sans text-3xl font-bold tabular-nums text-[#C9A96A] md:text-4xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-sans text-lg font-semibold text-[#1F1F1F] md:text-xl">
                  {item.title}
                </h3>
                <div className="sm:col-span-2 lg:col-span-1">
                  <p className="max-w-xl text-pretty font-sans text-sm leading-relaxed text-[#4D4D4D] md:text-base">
                    {item.detail}
                  </p>
                  {"href" in item && item.href ? (
                    <Link
                      href={item.href}
                      className="t-learn mt-4 inline-flex items-center gap-2 font-sans text-[12px] font-semibold text-[#1F1F1F]"
                    >
                      Ver sistemas
                      <span className="t-learn-chevron" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  ) : null}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <DcorpPageCta />
    </main>
  );
}
