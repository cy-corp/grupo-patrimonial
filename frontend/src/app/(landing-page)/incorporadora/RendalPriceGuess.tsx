"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RendalReveal } from "./RendalReveal";
import { cn } from "@/lib/utils";

const EASE = "cubic-bezier(0.32,0.72,0,1)";
const FACADE = "/wireframes/fachada-noite.jpg";

// TODO(comercial): substituir pelo "a partir de" real do empreendimento.
const PRICE_FROM = 289_000;
const MIN = 150_000;
const MAX = 900_000;
const STEP = 10_000;
const START = 450_000;

const TAG_SHAPE =
  "polygon(22% 0, 78% 0, 100% 16%, 100% 100%, 0 100%, 0 16%)";

function formatPrice(value: number) {
  return `R$ ${Math.round(value / 1000)} mil`;
}

export function RendalPriceGuess() {
  const reduceMotion = useReducedMotion();
  const sliderId = useId();
  const [guess, setGuess] = useState(START);
  const [revealed, setRevealed] = useState(false);
  const [tilt, setTilt] = useState(0);
  const settleRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(settleRef.current), []);

  const onGuess = (next: number) => {
    const delta = next - guess;
    setGuess(next);
    if (reduceMotion || delta === 0) return;
    setTilt(Math.max(-10, Math.min(10, (delta / STEP) * -3)));
    window.clearTimeout(settleRef.current);
    settleRef.current = window.setTimeout(() => setTilt(0), 90);
  };

  const reset = () => {
    setRevealed(false);
    setTilt(0);
  };

  const gap = guess - PRICE_FROM;
  const fill = ((guess - MIN) / (MAX - MIN)) * 100;

  return (
    <section
      id="chute"
      className="relative z-10 scroll-mt-24 bg-[#F8F1E3] px-6 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-10"
      aria-labelledby="chute-titulo"
    >
      <RendalReveal className="mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-4xl bg-[#0E2A2D] text-white shadow-[0_28px_60px_rgba(31,31,31,0.18)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-auto lg:min-h-[36rem]">
            <Image
              src={FACADE}
              alt="Fachada Rendal à noite, com laje de lazer iluminada e madeira ripada"
              fill
              sizes="(max-width: 1024px) 100vw, 640px"
              className="object-cover object-center"
            />
            <motion.div
              aria-hidden
              className="absolute left-[4%] top-0 flex flex-col items-center sm:left-[6%]"
              style={{ transformOrigin: "50% 0%" }}
              animate={
                revealed && !reduceMotion
                  ? { rotate: [0, 9, -6, 3, -1, 0] }
                  : { rotate: tilt }
              }
              transition={
                revealed && !reduceMotion
                  ? { duration: 1.4, ease: "easeOut" }
                  : { type: "spring", stiffness: 180, damping: 7, mass: 0.6 }
              }
            >
              <span className="h-8 w-px bg-white/70 sm:h-20" />
              <div className="relative h-36 w-32 perspective-[900px] sm:h-52 sm:w-40">
                <div
                  className={cn(
                    "relative size-full transition-transform duration-1000 transform-3d motion-reduce:transition-none",
                    revealed && "rotate-y-180",
                  )}
                  style={{ transitionTimingFunction: EASE }}
                >
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center bg-[#F8F1E3] px-3 pt-6 text-center text-[#1F1F1F] backface-hidden"
                    style={{ clipPath: TAG_SHAPE }}
                  >
                    <span className="absolute top-3 size-3 rounded-full bg-[#0E2A2D] ring-2 ring-[#C9A96A]" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#1F1F1F]/50">
                      Preço
                    </span>
                    <span className="mt-1 text-5xl font-semibold tracking-tight text-[#C9A96A]">
                      ?
                    </span>
                  </div>
                  <div
                    className="absolute inset-0 flex rotate-y-180 flex-col items-center justify-center bg-[#C9A96A] px-3 pt-6 text-center text-[#1F1F1F] backface-hidden"
                    style={{ clipPath: TAG_SHAPE }}
                  >
                    <span className="absolute top-3 size-3 rounded-full bg-[#0E2A2D] ring-2 ring-[#F8F1E3]" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#1F1F1F]/60">
                      A partir de
                    </span>
                    <span className="mt-1 whitespace-nowrap text-xl font-semibold sm:text-2xl tabular-nums tracking-tight">
                      {formatPrice(PRICE_FROM)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-16">
            <span className="mb-6 block h-px w-12 bg-[#C9A96A]" aria-hidden />
            <h2
              id="chute-titulo"
              className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
            >
              Quanto custa essa casa?
            </h2>
            <p className="mt-4 max-w-[36ch] text-lg leading-8 text-pretty text-white/70">
              Arraste até o valor que você pagaria. Depois, vire a etiqueta.
            </p>

            <div className="mt-10">
              <div className="flex items-baseline justify-between gap-4">
                <label
                  htmlFor={sliderId}
                  className="text-sm font-semibold text-white/60"
                >
                  Seu chute
                </label>
                <output
                  htmlFor={sliderId}
                  className="relative text-3xl font-semibold tabular-nums tracking-tight sm:text-4xl"
                >
                  <span className={cn(revealed && "text-white/40")}>
                    {formatPrice(guess)}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-1/2 h-0.5 origin-left bg-[#C9A96A] transition-transform duration-700 motion-reduce:transition-none",
                      "w-full",
                      revealed ? "scale-x-100" : "scale-x-0",
                    )}
                    style={{ transitionTimingFunction: EASE }}
                  />
                </output>
              </div>

              <input
                id={sliderId}
                type="range"
                min={MIN}
                max={MAX}
                step={STEP}
                value={guess}
                disabled={revealed}
                aria-valuetext={formatPrice(guess)}
                onChange={(event) => onGuess(Number(event.target.value))}
                className={cn(
                  "mt-5 h-2 w-full cursor-pointer appearance-none rounded-full outline-none disabled:cursor-default disabled:opacity-50",
                  "focus-visible:ring-2 focus-visible:ring-[#C9A96A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0E2A2D]",
                  "[&::-webkit-slider-thumb]:size-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#0E2A2D] [&::-webkit-slider-thumb]:bg-[#C9A96A] [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_rgba(201,169,106,0.6)]",
                  "[&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-[#0E2A2D] [&::-moz-range-thumb]:bg-[#C9A96A]",
                )}
                style={{
                  background: `linear-gradient(to right, #C9A96A ${fill}%, rgba(255,255,255,0.15) ${fill}%)`,
                }}
              />
              <div className="mt-3 flex justify-between text-xs font-semibold tabular-nums text-white/40">
                <span>{formatPrice(MIN)}</span>
                <span>{formatPrice(MAX)}</span>
              </div>
            </div>

            <div aria-live="polite" className="mt-10 min-h-[9.5rem]">
              {revealed ? (
                <motion.div
                  initial={reduceMotion ? false : { y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.45, ease: [0.32, 0.72, 0, 1] }}
                >
                  <p className="text-sm font-semibold text-[#C9A96A]">
                    Preço real: a partir de {formatPrice(PRICE_FROM)}
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                    {gap > 0
                      ? `${formatPrice(gap)} a menos do que você imaginou.`
                      : "Olho bom. Você chegou no preço."}
                  </p>
                  <p className="mt-3 max-w-[40ch] text-base leading-7 text-pretty text-white/70">
                    {gap > 0
                      ? "Essa distância é o projeto: laje que vira lazer, lavabo no social e o orçamento racional onde ninguém olha."
                      : "Agora imagine a visita chutando. A casa entrega mais do que o preço sugere."}
                  </p>
                  <p className="mt-3 max-w-[40ch] text-sm leading-6 text-pretty text-white/50">
                    E não é só impressão: em casos de referência, a avaliação da
                    Caixa ficou 30 a 40% acima do preço de venda.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link
                      href="/empreendimentos"
                      className="inline-flex h-12 items-center justify-center rounded-full bg-[#C9A96A] px-6 text-base font-semibold text-[#1F1F1F] transition-colors duration-700 hover:bg-[#D8BC84] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
                      style={{ transitionTimingFunction: EASE }}
                    >
                      Ver empreendimentos
                    </Link>
                    <button
                      type="button"
                      onClick={reset}
                      className="text-sm font-semibold text-white/60 underline-offset-4 transition-colors duration-700 hover:text-white hover:underline"
                      style={{ transitionTimingFunction: EASE }}
                    >
                      Chutar de novo
                    </button>
                  </div>
                </motion.div>
              ) : (
                <button
                  type="button"
                  onClick={() => setRevealed(true)}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-base font-semibold text-[#0E2A2D] transition-colors duration-700 hover:bg-[#F8F1E3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A96A] active:scale-[0.98]"
                  style={{ transitionTimingFunction: EASE }}
                >
                  Virar a etiqueta
                </button>
              )}
            </div>
          </div>
        </div>
      </RendalReveal>
    </section>
  );
}
