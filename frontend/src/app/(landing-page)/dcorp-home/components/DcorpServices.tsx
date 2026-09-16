"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DCORP_SERVICES_HOME } from "@/lib/dcorp-content";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -8% 0px" } as const;
const LAST = DCORP_SERVICES_HOME.length - 1;
const STEP_MS = 1000;

export function DcorpServices() {
  const [active, setActive] = useState(0);
  const [railReady, setRailReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const prevActive = useRef(0);
  const reduceMotion = useReducedMotion();

  const fill = railReady || reduceMotion ? active / LAST : 0;
  const wrapping = prevActive.current === LAST && active === 0;

  useEffect(() => {
    prevActive.current = active;
  }, [active]);

  useEffect(() => {
    if (!railReady || paused || reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((current) => (current >= LAST ? 0 : current + 1));
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [railReady, paused, reduceMotion]);

  const headerAnim = reduceMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: VIEWPORT,
        transition: { duration: 0.65, ease: EASE, delay: 0.3 },
      };

  const stepAnim = reduceMotion
    ? undefined
    : {
        variants: {
          hidden: { opacity: 0, y: 12 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: EASE },
          },
        },
      };

  return (
    <section className="bg-white px-6 py-20 md:px-12 md:py-24 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
          {...headerAnim}
        >
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 md:mb-6">
              <span
                className="h-px w-12 bg-[#C9A96A] md:w-16 lg:w-20"
                aria-hidden="true"
              />
              <p className="font-sans text-sm font-semibold uppercase tracking-wide text-[#C9A96A] md:text-base">
                Serviços
              </p>
            </div>
            <h2 className="text-balance font-sans text-3xl font-bold text-[#1F1F1F] md:text-4xl lg:text-5xl">
              Engenharia à entrega.
            </h2>
            <p className="mt-5 max-w-md text-pretty font-sans text-base leading-relaxed text-[#4D4D4D] md:text-lg">
              Seis frentes. Um método.
            </p>
          </div>
          <Link
            href="/servicos"
            className="t-learn inline-flex shrink-0 items-center gap-2 self-start font-sans text-[12px] font-semibold text-[#1F1F1F] md:self-auto"
          >
            Ver todos
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
          </Link>
        </motion.div>

        {/* Mobile */}
        <motion.ol
          className="relative pl-8 md:hidden"
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={VIEWPORT}
          onViewportEnter={() => setRailReady(true)}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.08, delayChildren: 0.35 },
            },
          }}
        >
          <div
            className="absolute bottom-2 left-[0.6875rem] top-2 w-px bg-[#D9D9D9]"
            aria-hidden="true"
          />
          <motion.div
            className="absolute left-[0.6875rem] top-2 w-px origin-top bg-[#C9A96A]"
            aria-hidden="true"
            initial={false}
            animate={{ scaleY: fill }}
            transition={{ duration: wrapping ? 0 : 0.4, ease: EASE }}
            style={{ height: "calc(100% - 1rem)" }}
          />
          {DCORP_SERVICES_HOME.map((service, index) => {
            const reached = index <= active;
            return (
              <motion.li
                key={service}
                className="relative pb-8 last:pb-0"
                {...stepAnim}
              >
                <span
                  className={cn(
                    "absolute left-[-1.4rem] top-1 z-[1] size-3 rounded-full border-2 bg-white transition-colors duration-300 ease-[var(--ease-smooth-out)]",
                    reached
                      ? "border-[#C9A96A] bg-[#C9A96A]"
                      : "border-[#D9D9D9]",
                  )}
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPaused(true);
                    setActive(index);
                  }}
                  className="w-full cursor-pointer text-left"
                >
                  <span
                    className={cn(
                      "font-sans text-[11px] font-semibold tabular-nums transition-colors duration-300",
                      reached ? "text-[#C9A96A]" : "text-[#C9A96A]/45",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p
                    className={cn(
                      "mt-1 font-sans text-base font-medium leading-snug transition-colors duration-300",
                      reached ? "text-[#1F1F1F]" : "text-[#1F1F1F]/55",
                    )}
                  >
                    {service}
                  </p>
                </button>
              </motion.li>
            );
          })}
        </motion.ol>

        {/* Desktop */}
        <motion.ol
          className="relative hidden grid-cols-6 gap-0 md:grid"
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={VIEWPORT}
          onViewportEnter={() => setRailReady(true)}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.08, delayChildren: 0.4 },
            },
          }}
        >
          <div
            className="pointer-events-none absolute left-[calc(100%/12)] right-[calc(100%/12)] top-[calc(0.75rem/2-0.5px)] h-px lg:top-[calc(0.875rem/2-0.5px)]"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-[#D9D9D9]" />
            <motion.div
              className="absolute inset-y-0 left-0 origin-left bg-[#C9A96A]"
              initial={false}
              animate={{ scaleX: fill }}
              transition={{ duration: wrapping ? 0 : 0.4, ease: EASE }}
              style={{ width: "100%" }}
            />
          </div>

          {DCORP_SERVICES_HOME.map((service, index) => {
            const reached = index <= active;
            const selected = index === active;
            return (
              <motion.li key={service} className="relative" {...stepAnim}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => {
                    setPaused(true);
                    setActive(index);
                  }}
                  aria-pressed={selected}
                  className={cn(
                    "group flex w-full cursor-pointer flex-col items-center text-center",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96A]/45",
                  )}
                >
                  <span
                    className={cn(
                      "relative z-[2] mb-5 size-3 rounded-full border-2 bg-white transition-[transform,background-color,border-color] duration-300 ease-[var(--ease-smooth-out)] lg:mb-6 lg:size-3.5",
                      reached
                        ? "border-[#C9A96A] bg-[#C9A96A]"
                        : "border-[#D9D9D9] group-hover:border-[#C9A96A]/75",
                      selected && "scale-110",
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      "font-sans text-[11px] font-semibold tabular-nums transition-colors duration-300 lg:text-xs",
                      reached
                        ? "text-[#C9A96A]"
                        : "text-[#C9A96A]/40 group-hover:text-[#C9A96A]/80",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p
                    className={cn(
                      "mt-2 max-w-[12ch] font-sans text-sm font-medium leading-snug tracking-tight transition-colors duration-300 lg:max-w-[14ch] lg:text-base",
                      selected
                        ? "text-[#1F1F1F]"
                        : reached
                          ? "text-[#1F1F1F]/80"
                          : "text-[#1F1F1F]/45 group-hover:text-[#1F1F1F]/75",
                    )}
                  >
                    {service}
                  </p>
                </button>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
