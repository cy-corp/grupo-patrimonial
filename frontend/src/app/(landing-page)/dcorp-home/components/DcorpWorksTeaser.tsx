"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DCORP_WORKS_HOME } from "@/lib/dcorp-content";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -10% 0px" } as const;

export function DcorpWorksTeaser() {
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const reduceMotion = useReducedMotion();

  const headerAnim = reduceMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: VIEWPORT,
        transition: { duration: 0.65, ease: EASE, delay: 0.28 },
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
            transition: { staggerChildren: 0.18, delayChildren: 0.4 },
          },
        },
      };

  const cardAnim = reduceMotion
    ? undefined
    : {
        variants: {
          hidden: {
            clipPath: "inset(100% 0 0 0)",
          },
          show: {
            clipPath: "inset(0% 0 0 0)",
            transition: { duration: 0.85, ease: EASE },
          },
        },
      };

  const imageAnim = reduceMotion
    ? undefined
    : {
        variants: {
          hidden: { scale: 1.08 },
          show: {
            scale: 1,
            transition: { duration: 1.05, ease: EASE },
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
                Obras
              </p>
            </div>
            <h2 className="text-balance font-sans text-3xl font-bold text-[#1F1F1F] md:text-4xl lg:text-5xl">
              Obra no canteiro.
            </h2>
            <p className="mt-5 max-w-md text-pretty font-sans text-base leading-relaxed text-[#4D4D4D] md:text-lg">
              Residencial, condomínios e execução para incorporadoras.
            </p>
          </div>
          <Link
            href="/obras"
            className="t-learn inline-flex shrink-0 items-center gap-2 self-start font-sans text-[12px] font-semibold text-[#1F1F1F] md:self-auto"
          >
            Ver portfólio
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

        <motion.ul
          className="grid gap-px bg-[#D9D9D9] md:grid-cols-3"
          {...listAnim}
        >
          {DCORP_WORKS_HOME.map((work, index) => {
            const ready = Boolean(loaded[work.id]);
            return (
              <motion.li
                key={work.id}
                className="group bg-white"
                {...cardAnim}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#1F1F1F]">
                  <motion.div className="absolute inset-0" {...imageAnim}>
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(145deg, #2c2c2c 0%, #1F1F1F 48%, #3d3426 100%)",
                      }}
                      aria-hidden="true"
                    />
                    <Image
                      src={work.image}
                      alt={work.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={cn(
                        "object-cover transition-transform duration-500 ease-[var(--ease-smooth-out)] group-hover:scale-[1.03]",
                        ready ? "opacity-100" : "opacity-0",
                      )}
                      onLoadingComplete={() =>
                        setLoaded((prev) => ({ ...prev, [work.id]: true }))
                      }
                      onError={() =>
                        setLoaded((prev) => ({ ...prev, [work.id]: false }))
                      }
                      priority={index === 0}
                    />
                  </motion.div>

                  <span className="absolute left-5 top-5 z-[1] font-sans text-[11px] font-semibold tabular-nums text-[#C9A96A]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {!ready ? (
                    <span className="absolute bottom-5 left-5 z-[1] font-sans text-[10px] font-semibold uppercase tracking-wide text-white/40">
                      Imagem em breve
                    </span>
                  ) : null}
                </div>

                <div className="border-t border-[#D9D9D9] px-5 py-5">
                  <h3 className="font-sans text-lg font-semibold text-[#1F1F1F]">
                    {work.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-[#4D4D4D]">
                    {work.meta}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
