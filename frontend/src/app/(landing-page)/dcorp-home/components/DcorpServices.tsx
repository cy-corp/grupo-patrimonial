"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DCORP_SERVICES_HOME } from "@/lib/dcorp-content";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -8% 0px" } as const;
const LAST = DCORP_SERVICES_HOME.length - 1;
/** Tempo para a barra encher de um ponto ao próximo. */
const SEGMENT_MS = 1600;
/** Pausa no último ponto antes de reiniciar. */
const HOLD_MS = 800;

export function DcorpServices() {
  const [active, setActive] = useState(0);
  const [railReady, setRailReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const fillRef = useRef(0);
  const activeRef = useRef(0);
  const pausedRef = useRef(false);
  const desktopBarRef = useRef<HTMLDivElement>(null);
  const mobileBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const paint = (value: number) => {
    const ratio = Math.min(1, Math.max(0, value / LAST));
    if (desktopBarRef.current) {
      desktopBarRef.current.style.transform = `scaleX(${ratio})`;
    }
    if (mobileBarRef.current) {
      mobileBarRef.current.style.transform = `scaleY(${ratio})`;
    }
  };

  const snapTo = (index: number) => {
    const next = Math.max(0, Math.min(LAST, index));
    fillRef.current = next;
    activeRef.current = next;
    setActive(next);
    paint(next);
  };

  useEffect(() => {
    if (!railReady || reduceMotion) {
      paint(reduceMotion ? LAST : fillRef.current);
      return;
    }

    let raf = 0;
    let from = fillRef.current;
    let to = Math.min(LAST, Math.floor(from) + 1);
    if (to <= from) to = Math.min(LAST, from + 1);
    let start = performance.now();
    let holding = false;

    const tick = (now: number) => {
      if (pausedRef.current) {
        from = fillRef.current;
        to = Math.min(LAST, Math.floor(from) + 1);
        if (to <= from && from < LAST) to = Math.min(LAST, from + 1);
        start = now;
        holding = false;
        raf = requestAnimationFrame(tick);
        return;
      }

      if (holding) {
        if (now - start >= HOLD_MS) {
          fillRef.current = 0;
          activeRef.current = 0;
          setActive(0);
          paint(0);
          from = 0;
          to = 1;
          holding = false;
          start = now;
        }
        raf = requestAnimationFrame(tick);
        return;
      }

      const span = Math.max(to - from, 0.0001);
      const t = Math.min(1, (now - start) / SEGMENT_MS);
      const eased = 1 - (1 - t) ** 1.55;
      const value = from + span * eased;

      fillRef.current = value;
      paint(value);

      const nextActive = Math.min(LAST, Math.floor(value + 0.02));
      if (nextActive !== activeRef.current) {
        activeRef.current = nextActive;
        setActive(nextActive);
      }

      if (t >= 1) {
        fillRef.current = to;
        paint(to);
        if (activeRef.current !== to) {
          activeRef.current = to;
          setActive(to);
        }

        if (to >= LAST) {
          holding = true;
          start = now;
        } else {
          from = to;
          to = from + 1;
          start = now;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [railReady, reduceMotion]);

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
          className="relative md:hidden"
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
            className="absolute bottom-2 left-[5.5px] top-2 w-px bg-[#D9D9D9]"
            aria-hidden="true"
          />
          <div
            ref={mobileBarRef}
            className="absolute left-[5.5px] top-2 w-px origin-top bg-[#C9A96A] will-change-transform"
            aria-hidden="true"
            style={{
              height: "calc(100% - 1rem)",
              transform: "scaleY(0)",
            }}
          />
          {DCORP_SERVICES_HOME.map((service, index) => {
            const reached = index <= active;
            return (
              <motion.li
                key={service}
                className="relative flex gap-4 pb-8 last:pb-0"
                {...stepAnim}
              >
                <span
                  className={cn(
                    "relative z-[1] mt-1 size-3 shrink-0 rounded-full border-2 bg-white transition-colors duration-300 ease-[var(--ease-smooth-out)]",
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
                    snapTo(index);
                  }}
                  className="min-w-0 flex-1 cursor-pointer text-left"
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
            <div
              ref={desktopBarRef}
              className="absolute inset-y-0 left-0 w-full origin-left bg-[#C9A96A] will-change-transform"
              style={{ transform: "scaleX(0)" }}
            />
          </div>

          {DCORP_SERVICES_HOME.map((service, index) => {
            const reached = index <= active;
            const selected = index === active;
            return (
              <motion.li key={service} className="relative" {...stepAnim}>
                <button
                  type="button"
                  onMouseEnter={() => snapTo(index)}
                  onFocus={() => {
                    setPaused(true);
                    snapTo(index);
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
