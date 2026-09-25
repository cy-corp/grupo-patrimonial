"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const LINE_A = ["Casa", "que", "parece", "cara."];
const LINE_B = ["Preço", "que", "cabe."];
const WORDS = [...LINE_A, ...LINE_B];
const EASE = "cubic-bezier(0.32,0.72,0,1)";

/** Tagline pinned with the morph card — phrases always one line each. */
export function RendalTaglineReveal({
  progress = 1,
}: {
  /** 0–1 scroll arrive into the sticky cluster */
  progress?: number;
}) {
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState<boolean[]>(() =>
    WORDS.map(() => false),
  );

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setActive(WORDS.map(() => true));
      return;
    }

    // Reveal words as the sticky cluster fades in
    setActive(
      WORDS.map((_, i) => {
        const threshold = 0.18 + (i / WORDS.length) * 0.55;
        return progress >= threshold;
      }),
    );
  }, [progress]);

  const renderLine = (words: string[], offset: number) => (
    <p className="m-0 flex flex-nowrap justify-center gap-x-2 whitespace-nowrap text-[clamp(1.55rem,6.8vw,3.25rem)] font-semibold tracking-tight sm:gap-x-3">
      {words.map((word, i) => {
        const index = offset + i;
        return (
          <span
            key={`${word}-${index}`}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            className={cn(
              "inline-block transition-[color,opacity,transform] duration-700",
              active[index]
                ? "translate-y-0 text-[#1F1F1F] opacity-100"
                : "translate-y-2 text-[#1F1F1F]/25 opacity-60",
            )}
            style={{ transitionTimingFunction: EASE }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );

  return (
    <div
      className="mx-auto flex w-full max-w-[680px] flex-col items-center gap-1 text-center sm:gap-1.5"
      aria-label="Promessa Rendal"
    >
      {renderLine(LINE_A, 0)}
      {renderLine(LINE_B, LINE_A.length)}
    </div>
  );
}
