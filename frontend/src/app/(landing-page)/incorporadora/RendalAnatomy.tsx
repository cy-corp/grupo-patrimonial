"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { RendalReveal } from "./RendalReveal";
import { cn } from "@/lib/utils";

const EASE = "cubic-bezier(0.32,0.72,0,1)";

const LINES = [
  ["Valor", "onde", "se", "vê."],
  ["Inteligência", "onde", "não", "se", "vê."],
] as const;
const TOTAL = LINES.reduce((sum, line) => sum + line.length, 0);

const SEEN = [
  {
    title: "Laje com pergola",
    body: "O dinheiro do telhado comum vira mesa, estar e vista.",
    x: 70,
    y: 36,
  },
  {
    title: "Jardineira na borda",
    body: "Verde na linha do olhar, de dentro da laje e da calçada.",
    x: 62,
    y: 64,
  },
  {
    title: "Madeira ripada",
    body: "Textura quente na fachada, bem onde a visita chega.",
    x: 22,
    y: 86,
  },
  {
    title: "Luz indireta",
    body: "Jardineiras e arandelas acesas fazem a casa render à noite.",
    x: 24,
    y: 50,
  },
] as const;

const HIDDEN = [
  {
    title: "Estrutura racional",
    body: "Dimensionada para a casa, sem excesso onde o olho não chega.",
  },
  {
    title: "Instalações desenhadas junto",
    body: "Tubulação e elétrica resolvidas na planta, antes da obra.",
  },
  {
    title: "Técnico no essencial",
    body: "O que não muda a percepção da casa fica no ponto certo.",
  },
] as const;

function Word({
  word,
  index,
  progress,
}: {
  word: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = (index / TOTAL) * 0.75;
  const opacity = useTransform(progress, [start, start + 0.25], [0.28, 1]);
  return (
    <motion.span className="inline-block" style={{ opacity }}>
      {word}
    </motion.span>
  );
}

export function RendalAnatomy() {
  const reduceMotion = useReducedMotion();
  const headRef = useRef<HTMLHeadingElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: headRef,
    offset: ["start 0.9", "start 0.35"],
  });

  let wordIndex = 0;

  return (
    <section
      id="valor"
      className="bg-[#F8F1E3] px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32"
      aria-labelledby="valor-titulo"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="valor-titulo"
          ref={headRef}
          className="mx-auto max-w-3xl text-center text-4xl font-semibold tracking-tight text-[#1F1F1F] sm:text-5xl"
        >
          {LINES.map((line) => (
            <span
              key={line.join(" ")}
              className="flex flex-wrap justify-center gap-x-3 pb-1"
            >
              {line.map((word) => {
                const index = wordIndex++;
                return reduceMotion ? (
                  <span key={index}>{word}</span>
                ) : (
                  <Word
                    key={index}
                    word={word}
                    index={index}
                    progress={scrollYProgress}
                  />
                );
              })}
            </span>
          ))}
        </h2>
        <RendalReveal>
          <p className="mx-auto mt-6 max-w-[36rem] text-center text-lg leading-8 text-pretty text-[#1F1F1F]/70">
            O orçamento vai para o que você sente ao chegar. O resto é
            engenharia sem desperdício.
          </p>
        </RendalReveal>

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <RendalReveal className="lg:sticky lg:top-28">
            <figure className="relative m-0 aspect-[4/3] overflow-hidden rounded-4xl bg-[#1F1F1F] shadow-[0_28px_60px_rgba(31,31,31,0.16)] lg:aspect-[16/10]">
              <Image
                src="/wireframes/scroll-laje-golden.jpg"
                alt="Laje de lazer Rendal ao pôr do sol, com pergolas, jardineiras e madeira ripada na fachada"
                fill
                sizes="(max-width: 1024px) 100vw, 720px"
                className="object-cover"
              />
              {SEEN.map((item, index) => {
                const on = active === index;
                return (
                  <button
                    key={item.title}
                    type="button"
                    aria-label={item.title}
                    aria-pressed={on}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                    className={cn(
                      "absolute flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-sm font-semibold tabular-nums shadow-[0_8px_24px_rgba(31,31,31,0.28)] transition-all duration-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                      on
                        ? "scale-110 bg-[#C9A96A] text-[#1F1F1F]"
                        : "bg-white/90 text-[#1F1F1F] hover:scale-105",
                    )}
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      transitionTimingFunction: EASE,
                    }}
                  >
                    {on ? (
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-[#C9A96A]/60 motion-safe:animate-ping"
                      />
                    ) : null}
                    <span className="relative">{index + 1}</span>
                  </button>
                );
              })}
            </figure>
          </RendalReveal>

          <RendalReveal delayMs={120}>
            <div>
              <p className="text-sm font-semibold text-[#0F5B63]">Onde se vê</p>
              <ol className="m-0 mt-4 flex list-none flex-col gap-2 p-0">
                {SEEN.map((item, index) => {
                  const on = active === index;
                  return (
                    <li key={item.title}>
                      <button
                        type="button"
                        onMouseEnter={() => setActive(index)}
                        onFocus={() => setActive(index)}
                        onClick={() => setActive(index)}
                        className={cn(
                          "flex w-full items-start gap-4 rounded-2xl p-4 text-left transition-all duration-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F5B63]",
                          on
                            ? "bg-white shadow-[0_12px_32px_rgba(31,31,31,0.08)]"
                            : "hover:bg-white/50",
                        )}
                        style={{ transitionTimingFunction: EASE }}
                      >
                        <span
                          className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold tabular-nums transition-colors duration-700",
                            on
                              ? "bg-[#C9A96A] text-[#1F1F1F]"
                              : "bg-[#1F1F1F]/5 text-[#1F1F1F]/60",
                          )}
                          style={{ transitionTimingFunction: EASE }}
                        >
                          {index + 1}
                        </span>
                        <span>
                          <span className="block text-lg font-semibold text-[#1F1F1F]">
                            {item.title}
                          </span>
                          <span className="mt-1 block text-base leading-7 text-pretty text-[#1F1F1F]/65">
                            {item.body}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <p className="mt-10 text-sm font-semibold text-[#1F1F1F]/50">
                Onde não se vê
              </p>
              <ul className="m-0 mt-4 grid list-none gap-4 p-0 sm:grid-cols-3 lg:grid-cols-1">
                {HIDDEN.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-2xl p-4 ring-1 ring-[#1F1F1F]/10"
                  >
                    <span className="block text-base font-semibold text-[#1F1F1F]">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-pretty text-[#1F1F1F]/60">
                      {item.body}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </RendalReveal>
        </div>
      </div>
    </section>
  );
}
