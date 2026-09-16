"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DCORP_SYSTEMS, DCORP_SYSTEMS_HEADLINE } from "@/lib/dcorp-content";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.2, margin: "0px 0px -8% 0px" } as const;

export function DcorpSolutions() {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const reduceMotion = useReducedMotion();
  const current = DCORP_SYSTEMS[active] ?? DCORP_SYSTEMS[0];

  const headerAnim = reduceMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: VIEWPORT,
        transition: { duration: 0.65, ease: EASE, delay: 0.35 },
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
            transition: { staggerChildren: 0.1, delayChildren: 0.48 },
          },
        },
      };

  const itemAnim = reduceMotion
    ? undefined
    : {
        variants: {
          hidden: { opacity: 0, y: 14 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.55, ease: EASE },
          },
        },
      };

  return (
    <section className="bg-[#F7F7F7] px-6 py-20 md:px-12 md:py-24 lg:px-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-10 lg:items-stretch">
        <motion.div className="flex flex-col lg:col-span-7" {...headerAnim}>
          <div className="mb-5 flex items-center gap-3 md:mb-6">
            <span
              className="h-px w-12 bg-[#C9A96A] md:w-16 lg:w-20"
              aria-hidden="true"
            />
            <p className="font-sans text-sm font-semibold uppercase tracking-wide text-[#C9A96A] md:text-base">
              Sistemas
            </p>
          </div>
          <h2 className="max-w-[14ch] text-balance font-sans text-3xl font-bold text-[#1F1F1F] md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {DCORP_SYSTEMS_HEADLINE}
          </h2>
          <p className="mt-5 max-w-sm text-pretty font-sans text-base leading-relaxed text-[#4D4D4D]">
            Seco, semi-industrializado ou moldado in loco.
          </p>
          <Link
            href="/sistemas-construtivos"
            className="t-learn mt-6 inline-flex items-center gap-2 self-start font-sans text-[12px] font-semibold text-[#1F1F1F]"
          >
            Explorar sistemas
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

          {/* 3/2 matches the generated photos; object-contain = full frame, no crop/distort */}
          <div className="relative mt-10 aspect-[3/2] w-full overflow-hidden bg-[#1F1F1F] md:mt-auto lg:mt-12">
            {DCORP_SYSTEMS.map((system, index) => {
              const isActive = index === active;
              const ready = Boolean(loaded[system.id]);
              return (
                <div
                  key={system.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-150 ease-out",
                    isActive ? "z-[1] opacity-100" : "z-0 opacity-0",
                  )}
                  aria-hidden={!isActive}
                >
                  <Image
                    src={system.image}
                    alt={isActive ? system.alt : ""}
                    fill
                    sizes="(max-width: 1024px) 90vw, 55vw"
                    className={cn(
                      "object-contain transition-opacity duration-150",
                      ready ? "opacity-100" : "opacity-0",
                    )}
                    onLoadingComplete={() =>
                      setLoaded((prev) => ({ ...prev, [system.id]: true }))
                    }
                    priority={index === 0}
                  />
                </div>
              );
            })}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-black/70 via-black/25 to-transparent px-5 pb-5 pt-16 md:px-6 md:pb-6">
              <div className="flex items-center justify-between gap-3">
                <span className="font-sans text-[11px] font-semibold tabular-nums text-[#C9A96A]">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-[10px] font-semibold uppercase tracking-wide text-white/50">
                  {current.typeLabel}
                </span>
              </div>
              <p className="mt-1.5 font-sans text-sm font-medium text-white">
                {current.shortName}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.ul
          className="flex flex-col justify-center border-t border-[#D9D9D9] lg:col-span-5 lg:col-start-8"
          {...listAnim}
        >
          {DCORP_SYSTEMS.map((system, index) => {
            const selected = index === active;
            return (
              <motion.li key={system.id} {...itemAnim}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  aria-pressed={selected}
                  className={cn(
                    "group relative flex w-full cursor-pointer items-center gap-3 border-b border-[#D9D9D9] py-5 text-left transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] md:gap-4 md:py-6",
                    "hover:bg-white/80 focus-visible:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96A]/45",
                    selected && "bg-white",
                  )}
                >
                  <span
                    className={cn(
                      "absolute left-0 top-1/2 w-0.5 -translate-y-1/2 bg-[#C9A96A] transition-[height] duration-200 ease-[var(--ease-smooth-out)]",
                      selected ? "h-9" : "h-0 group-hover:h-5",
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      "shrink-0 pl-3 font-sans text-[11px] font-semibold tabular-nums transition-colors duration-200 md:pl-4",
                      selected
                        ? "text-[#C9A96A]"
                        : "text-[#C9A96A]/50 group-hover:text-[#C9A96A]",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block font-sans text-[15px] font-medium tracking-tight transition-[transform,color] duration-200 ease-[var(--ease-smooth-out)] md:text-base lg:text-lg",
                        selected
                          ? "translate-x-1 text-[#1F1F1F]"
                          : "text-[#1F1F1F]/70 group-hover:translate-x-1 group-hover:text-[#1F1F1F]",
                      )}
                    >
                      {system.shortName}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block font-sans text-[10px] font-semibold uppercase tracking-wide transition-opacity duration-200",
                        selected
                          ? "translate-x-1 text-[#4D4D4D] opacity-100"
                          : "text-[#4D4D4D] opacity-50 group-hover:translate-x-1 group-hover:opacity-80",
                      )}
                    >
                      {system.typeLabel}
                    </span>
                  </span>
                </button>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
