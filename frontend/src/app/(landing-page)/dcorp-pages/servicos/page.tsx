"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { GoldButton } from "@/components/ui/gold-button";
import { companies } from "@/lib/companies";
import { DCORP_SERVICE_GROUPS } from "@/lib/dcorp-content";
import { cn } from "@/lib/utils";
import { DcorpPageIntro } from "../DcorpPageChrome";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, amount: 0.18 } as const;

const GROUP_LEDE: Record<string, string> = {
  Engenharia: "Antes da obra: método, custo e projeto alinhados.",
  Execução: "Na obra: sistemas industrializados e entrega com escala.",
  "Gestão e capacitação":
    "Durante e depois: controle, fiscalização e capacitação de equipes.",
};

export default function DcorpServicosPage() {
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
            eyebrow="Serviços"
            title="Engenharia, execução e gestão com capacidade de obra."
            description="Da orçamentação à fiscalização — em obras próprias e para terceiros, com sistemas industrializados e alta produtividade."
          />
        </motion.div>

        <motion.nav
          aria-label="Índice de serviços"
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
          {DCORP_SERVICE_GROUPS.map((group, index) => (
            <motion.a
              key={group.id}
              href={`#${group.id}`}
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
                index < DCORP_SERVICE_GROUPS.length - 1 &&
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
              <span className="font-sans text-sm font-semibold leading-snug text-[#1F1F1F]">
                {group.title}
              </span>
            </motion.a>
          ))}
        </motion.nav>
      </div>

      <div>
        {DCORP_SERVICE_GROUPS.map((group, groupIndex) => {
          const reverse = groupIndex % 2 === 1;

          return (
            <section
              key={group.id}
              id={group.id}
              className={cn(
                "scroll-mt-28 border-t border-[#D9D9D9] px-6 py-14 md:px-12 md:py-20 lg:px-20",
                reverse ? "bg-[#F7F7F7]" : "bg-white",
              )}
            >
              <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
                <motion.div
                  className={cn(
                    "relative aspect-[3/2] overflow-hidden bg-[#1F1F1F] lg:col-span-5 lg:sticky lg:top-28",
                    reverse && "lg:order-2",
                  )}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <Image
                    src={group.image}
                    alt={group.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    priority={groupIndex === 0}
                  />
                </motion.div>

                <div
                  className={cn(
                    "lg:col-span-7",
                    reverse && "lg:order-1",
                  )}
                >
                  <motion.header
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-[11px] font-semibold tabular-nums text-[#C9A96A]">
                        {String(groupIndex + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="h-px w-8 bg-[#C9A96A]"
                        aria-hidden="true"
                      />
                    </div>
                    <h2 className="mt-4 font-sans text-2xl font-bold text-[#1F1F1F] md:text-3xl">
                      {group.title}
                    </h2>
                    <p className="mt-4 max-w-md text-pretty font-sans text-base leading-relaxed text-[#4D4D4D]">
                      {GROUP_LEDE[group.title]}
                    </p>
                  </motion.header>

                  <ol className="mt-8">
                    {group.items.map((item, index) => (
                      <motion.li
                        key={item.title}
                        className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-[#D9D9D9] py-5 first:border-t sm:grid-cols-[3rem_1fr] sm:gap-5 sm:py-6"
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
                            {item.title}
                          </p>
                          <p className="mt-2 max-w-xl text-pretty font-sans text-sm leading-relaxed text-[#4D4D4D]">
                            {item.deliverable}
                          </p>
                        </div>
                      </motion.li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="border-t border-[#D9D9D9] bg-[#1F1F1F] px-6 py-20 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mx-auto flex max-w-3xl flex-col items-start gap-6 md:items-center md:text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <h2 className="text-balance font-sans text-2xl font-bold text-white md:text-4xl">
              Orçamento ou parceria tecnológica.
            </h2>
            <p className="max-w-xl text-pretty font-sans text-base leading-relaxed text-white/65">
              Precisa executar com sistemas industrializados — ou implantá-los
              na sua operação? A DCORP cobre engenharia, obra e capacitação.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <GoldButton
                href={companies.dcorp.contactHref}
                className="h-11 px-8 text-[12px]"
              >
                Solicitar orçamento
              </GoldButton>
              <Link
                href="/contato?empresa=dcorp#parceiro"
                className="inline-flex h-11 items-center justify-center rounded-md border border-white/20 px-7 text-[12px] font-semibold text-white transition-colors duration-[var(--duration-quick)] ease-out hover:border-white/40"
              >
                Seja nosso parceiro
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
