"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { DCORP_WORKS_HOME } from "@/lib/dcorp-content";
import { cn } from "@/lib/utils";
import { DcorpPageCta, DcorpPageIntro } from "../DcorpPageChrome";
import { DcorpWorkCarousel } from "./DcorpWorkCarousel";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, amount: 0.2 } as const;

export default function DcorpObrasPage() {
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
            eyebrow="Obras e portfólio"
            title="Execução com escala."
            description="Cases em andamento e tipologias de execução — com engenharia e sistemas de alta produtividade."
          />
        </motion.div>

        <motion.nav
          aria-label="Índice de obras"
          className="mt-12 grid grid-cols-1 border border-[#D9D9D9] sm:grid-cols-3 md:mt-14"
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.12, delayChildren: 0.28 },
            },
          }}
        >
          {DCORP_WORKS_HOME.map((work, index) => (
            <motion.a
              key={work.id}
              href={`#${work.id}`}
              variants={
                reduceMotion
                  ? undefined
                  : {
                      hidden: { opacity: 0, y: 14 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: EASE },
                      },
                    }
              }
              className={cn(
                "group relative flex min-h-[4.75rem] flex-col justify-between gap-2 border-[#D9D9D9] p-4 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-[#F7F7F7] sm:min-h-[5.5rem] sm:p-5",
                index < DCORP_WORKS_HOME.length - 1 &&
                  "border-b sm:border-b-0 sm:border-r",
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
                  {work.meta}
                </span>
                <span className="mt-1 block font-sans text-sm font-semibold leading-snug text-[#1F1F1F]">
                  {work.title}
                </span>
              </span>
            </motion.a>
          ))}
        </motion.nav>
      </div>

      <div>
        {DCORP_WORKS_HOME.map((work, index) => {
          const reverse = index % 2 === 1;
          const cover = work.images[0];

          if (work.gallery) {
            return (
              <article
                key={work.id}
                id={work.id}
                className="scroll-mt-28 border-t border-[#D9D9D9] bg-[#F7F7F7] px-6 py-14 md:px-12 md:py-20 lg:px-20"
              >
                <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-12">
                  <motion.div
                    className="lg:col-span-4 lg:pt-2"
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-[11px] font-semibold tabular-nums text-[#C9A96A]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="h-px w-8 bg-[#C9A96A]"
                        aria-hidden="true"
                      />
                      <p className="font-sans text-[10px] font-semibold uppercase tracking-wide text-[#C9A96A]">
                        {work.meta}
                      </p>
                    </div>
                    <h2 className="mt-4 text-balance font-sans text-2xl font-bold text-[#1F1F1F] md:text-3xl lg:text-4xl">
                      {work.title}
                    </h2>
                    <p className="mt-2 font-sans text-sm text-[#4D4D4D]">
                      {work.scope}
                    </p>
                    <p className="mt-5 text-pretty font-sans text-base leading-relaxed text-[#4D4D4D] md:text-lg">
                      {work.summary}
                    </p>
                    <ul className="mt-8 flex flex-col gap-2 border-t border-[#D9D9D9] pt-6">
                      {work.focuses.map((focus) => (
                        <li
                          key={focus}
                          className="font-sans text-sm text-[#1F1F1F] before:mr-2 before:text-[#C9A96A] before:content-['—']"
                        >
                          {focus}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    className="lg:col-span-8"
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.65, ease: EASE, delay: 0.06 }}
                  >
                    <DcorpWorkCarousel
                      images={work.images}
                      alt={work.alt}
                      priority={index === 0}
                    />
                  </motion.div>
                </div>
              </article>
            );
          }

          return (
            <article
              key={work.id}
              id={work.id}
              className={cn(
                "scroll-mt-28 border-t border-[#D9D9D9] px-6 py-14 md:px-12 md:py-20 lg:px-20",
                reverse ? "bg-[#F7F7F7]" : "bg-white",
              )}
            >
              <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
                <motion.div
                  className={cn(
                    "relative aspect-[4/3] overflow-hidden bg-[#1F1F1F] lg:col-span-7",
                    reverse && "lg:order-2",
                  )}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.65, ease: EASE }}
                >
                  <Image
                    src={cover}
                    alt={work.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </motion.div>

                <motion.div
                  className={cn(
                    "lg:col-span-5",
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
                    <span
                      className="h-px w-8 bg-[#C9A96A]"
                      aria-hidden="true"
                    />
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-wide text-[#C9A96A]">
                      {work.meta}
                    </p>
                  </div>

                  <h2 className="mt-4 text-balance font-sans text-2xl font-bold text-[#1F1F1F] md:text-3xl lg:text-4xl">
                    {work.title}
                  </h2>

                  <p className="mt-2 font-sans text-sm text-[#4D4D4D]">
                    {work.scope}
                  </p>

                  <p className="mt-5 text-pretty font-sans text-base leading-relaxed text-[#4D4D4D] md:text-lg">
                    {work.summary}
                  </p>

                  <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#D9D9D9] pt-6">
                    {work.focuses.map((focus) => (
                      <li
                        key={focus}
                        className="font-sans text-sm text-[#1F1F1F] before:mr-2 before:text-[#C9A96A] before:content-['—']"
                      >
                        {focus}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </article>
          );
        })}
      </div>

      <section className="border-t border-[#D9D9D9] bg-[#F7F7F7] px-6 py-14 md:px-12 md:py-16 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="max-w-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p className="font-sans text-[11px] font-semibold uppercase tracking-wide text-[#C9A96A]">
              Portfólio
            </p>
            <h2 className="mt-3 font-sans text-xl font-bold text-[#1F1F1F] md:text-2xl">
              Obra real em destaque — e tipologias de execução.
            </h2>
            <p className="mt-4 text-pretty font-sans text-base leading-relaxed text-[#4D4D4D]">
              Holambra é o case em andamento com painel monolítico EPS. As demais
              tipologias representam formatos de execução que a DCORP entrega em
              projetos próprios e para clientes terceiros.
            </p>
          </motion.div>
        </div>
      </section>

      <DcorpPageCta
        title="Quer ver a DCORP no seu próximo empreendimento?"
        description="Solicite um orçamento e conversamos sobre escopo, sistema e prazo."
      />
    </main>
  );
}
