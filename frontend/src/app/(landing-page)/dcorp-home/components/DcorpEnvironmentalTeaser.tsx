"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { DCORP_ENVIRONMENTAL_HOME_CHIPS } from "@/lib/dcorp-content";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -8% 0px" } as const;

function LearnChevron() {
  return (
    <span className="t-learn-chevron" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          className="t-learn-arm t-learn-arm-top"
          d="M6 4L10 8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          className="t-learn-arm t-learn-arm-bot"
          d="M10 8L6 12"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function DcorpEnvironmentalTeaser() {
  const reduceMotion = useReducedMotion();

  const headerAnim = reduceMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: VIEWPORT,
        transition: { duration: 0.65, ease: EASE, delay: 0.2 },
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
            transition: { duration: 0.45, ease: EASE },
          },
        },
      };

  return (
    <section className="border-t border-[#D9D9D9] bg-white px-6 py-16 md:px-12 md:py-20 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between"
          {...headerAnim}
        >
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span
                className="h-px w-12 bg-[#C9A96A] md:w-16 lg:w-20"
                aria-hidden="true"
              />
              <p className="font-sans text-sm font-semibold uppercase tracking-wide text-[#C9A96A] md:text-base">
                Ambiental
              </p>
            </div>
            <h2 className="text-balance font-sans text-3xl font-bold text-[#1F1F1F] md:text-4xl">
              Também na área ambiental.
            </h2>
            <p className="mt-4 max-w-md text-pretty font-sans text-base leading-relaxed text-[#4D4D4D]">
              Regularização de loteamento, licenciamento, CAR e recuperação de
              área degradada.
            </p>
          </div>
          <Link
            href="/servicos-ambientais"
            className="t-learn inline-flex shrink-0 items-center gap-2 self-start font-sans text-[12px] font-semibold text-[#1F1F1F] md:self-auto"
          >
            Ver serviços ambientais
            <LearnChevron />
          </Link>
        </motion.div>

        <motion.ul
          className="grid grid-cols-2 border border-[#D9D9D9] lg:grid-cols-4"
          {...listAnim}
        >
          {DCORP_ENVIRONMENTAL_HOME_CHIPS.map((chip, index) => (
            <motion.li
              key={chip.label}
              className="border-[#D9D9D9] max-lg:odd:border-r max-lg:[&:nth-child(-n+2)]:border-b lg:border-r lg:[&:nth-child(4)]:border-r-0"
              {...itemAnim}
            >
              <Link
                href={chip.href}
                className="group relative flex min-h-20 flex-col justify-between gap-2 p-4 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-[#F7F7F7] sm:min-h-24 sm:p-5"
              >
                <span
                  className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-[#C9A96A] transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:scale-y-100"
                  aria-hidden="true"
                />
                <span className="font-sans text-xl font-bold tabular-nums text-[#C9A96A]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-sm font-semibold leading-snug text-[#1F1F1F]">
                  {chip.label}
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
