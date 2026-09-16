"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DCORP_AUDIENCES } from "@/lib/dcorp-content";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fires as soon as the section edge enters — not after half the block is on screen. */
const VIEWPORT = { once: true, amount: 0.15, margin: "0px 0px -12% 0px" } as const;

export function DcorpAudiences() {
  const reduceMotion = useReducedMotion();

  const headerAnim = reduceMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: VIEWPORT,
        transition: { duration: 0.5, ease: EASE, delay: 0.22 },
      };

  const listAnim = reduceMotion
    ? undefined
    : {
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: VIEWPORT,
        variants: {
          hidden: {},
          show: {
            transition: { staggerChildren: 0.08, delayChildren: 0.32 },
          },
        },
      };

  const itemAnim = reduceMotion
    ? undefined
    : {
        variants: {
          hidden: { opacity: 0, y: 12 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.42, ease: EASE },
          },
        },
      };

  return (
    <section className="bg-white px-6 py-20 md:px-12 md:py-24 lg:px-20 lg:min-h-[min(100dvh,52rem)] lg:flex lg:items-center">
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
        <motion.div className="lg:col-span-5" {...headerAnim}>
          <div className="mb-5 flex items-center gap-3 md:mb-6">
            <span
              className="h-px w-12 bg-[#C9A96A] md:w-16 lg:w-20"
              aria-hidden="true"
            />
            <p className="font-sans text-sm font-semibold uppercase tracking-wide text-[#C9A96A] md:text-base">
              Para quem
            </p>
          </div>
          <h2 className="text-balance font-sans text-3xl font-bold text-[#1F1F1F] md:text-4xl lg:text-5xl">
            Quem precisa de produtividade na obra.
          </h2>
          <p className="mt-5 max-w-md text-pretty font-sans text-base leading-relaxed text-[#4D4D4D] md:text-lg">
            Quem decide o empreendimento, quem executa no canteiro e quem coloca capital na obra.
          </p>
        </motion.div>

        <motion.ul
          className="grid gap-px bg-[#D9D9D9] lg:col-span-7"
          {...listAnim}
        >
          {DCORP_AUDIENCES.map((audience, index) => (
            <motion.li
              key={audience.title}
              className="bg-white px-5 py-6 md:px-6 md:py-7 lg:min-h-[7.5rem]"
              {...itemAnim}
            >
              <span className="font-sans text-[11px] font-semibold tabular-nums text-[#C9A96A]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-sans text-lg font-semibold tracking-tight text-[#1F1F1F] md:text-xl">
                {audience.title}
              </h3>
              <p className="mt-2 text-pretty font-sans text-sm leading-relaxed text-[#4D4D4D]">
                {audience.description}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
