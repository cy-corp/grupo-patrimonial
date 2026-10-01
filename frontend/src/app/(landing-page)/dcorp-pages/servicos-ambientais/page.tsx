"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  DCORP_ENVIRONMENTAL_HEADLINE,
  DCORP_ENVIRONMENTAL_IMAGE,
  DCORP_ENVIRONMENTAL_IMAGE_ALT,
  DCORP_ENVIRONMENTAL_SERVICES,
  DCORP_ENVIRONMENTAL_SUPPORT,
} from "@/lib/dcorp-content";
import { cn } from "@/lib/utils";
import { DcorpPageCta, DcorpPageIntro } from "../DcorpPageChrome";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, amount: 0.18 } as const;

export default function DcorpServicosAmbientaisPage() {
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
            eyebrow="Serviços ambientais"
            title={DCORP_ENVIRONMENTAL_HEADLINE}
            description={DCORP_ENVIRONMENTAL_SUPPORT}
          />
        </motion.div>

        <motion.nav
          aria-label="Índice de serviços ambientais"
          className="mt-12 grid grid-cols-2 border border-[#D9D9D9] md:mt-14 lg:grid-cols-3"
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.08, delayChildren: 0.28 },
            },
          }}
        >
          {DCORP_ENVIRONMENTAL_SERVICES.map((service, index) => (
            <motion.a
              key={service.id}
              href={`#${service.id}`}
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
                "group relative flex min-h-[5.5rem] flex-col justify-between gap-2 border-[#D9D9D9] p-4 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-[#F7F7F7] sm:min-h-24 sm:p-5",
                "border-b border-r",
                "max-lg:even:border-r-0 max-lg:[&:nth-last-child(-n+2)]:border-b-0",
                "lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0",
              )}
            >
              <span
                className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-[#C9A96A] transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:scale-y-100"
                aria-hidden="true"
              />
              <span className="font-sans text-xl font-bold tabular-nums text-[#C9A96A] md:text-2xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-sans text-sm font-semibold leading-snug text-[#1F1F1F]">
                {service.shortTitle}
              </span>
            </motion.a>
          ))}
        </motion.nav>
      </div>

      <section className="scroll-mt-28 border-t border-[#D9D9D9] bg-white px-6 py-14 md:px-12 md:py-20 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          <motion.div
            className="relative aspect-[3/2] overflow-hidden bg-[#1F1F1F] lg:sticky lg:top-28 lg:col-span-5"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Image
              src={DCORP_ENVIRONMENTAL_IMAGE}
              alt={DCORP_ENVIRONMENTAL_IMAGE_ALT}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
            />
          </motion.div>

          <div className="lg:col-span-7">
            <motion.header
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <div className="flex items-center gap-3">
                <span className="font-sans text-[11px] font-semibold tabular-nums text-[#C9A96A]">
                  01
                </span>
                <span className="h-px w-8 bg-[#C9A96A]" aria-hidden="true" />
              </div>
              <h2 className="mt-4 font-sans text-2xl font-bold text-[#1F1F1F] md:text-3xl">
                Serviços ambientais
              </h2>
              <p className="mt-4 max-w-md text-pretty font-sans text-base leading-relaxed text-[#4D4D4D]">
                Do loteamento irregular à área degradada: o mesmo escritório
                conduz o processo no órgão ambiental.
              </p>
            </motion.header>

            <ol className="mt-8">
              {DCORP_ENVIRONMENTAL_SERVICES.map((service, index) => (
                <motion.li
                  key={service.id}
                  id={service.id}
                  className="grid scroll-mt-28 grid-cols-[2.5rem_1fr] gap-3 border-b border-[#D9D9D9] py-5 first:border-t sm:grid-cols-[3rem_1fr] sm:gap-5 sm:py-6"
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{
                    duration: 0.45,
                    ease: EASE,
                    delay: 0.04 * index,
                  }}
                >
                  <span className="font-sans text-sm font-semibold tabular-nums text-[#C9A96A]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-sans text-base font-medium leading-snug text-[#1F1F1F] md:text-lg">
                      {service.title}
                    </p>
                    <p className="mt-2 max-w-xl text-pretty font-sans text-sm leading-relaxed text-[#4D4D4D]">
                      {service.deliverable}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <DcorpPageCta
        title="Regularização e licenciamento com método técnico."
        description="Loteamento, outorga, CAR, multa ambiental ou área degradada: a DCORP conduz o processo até o órgão competente."
      />
    </main>
  );
}
