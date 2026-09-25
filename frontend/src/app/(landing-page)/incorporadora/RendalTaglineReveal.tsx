"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const LINE_A = ["Casa", "que", "parece", "cara."];
const LINE_B = ["Preço", "que", "cabe."];
const WORDS = [...LINE_A, ...LINE_B];
const EASE = "cubic-bezier(0.32,0.72,0,1)";

export function RendalTaglineReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState<boolean[]>(() =>
    WORDS.map(() => false),
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setActive(WORDS.map(() => true));
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const trigger = window.innerHeight * 0.62;
      setActive((prev) => {
        let changed = false;
        const next = prev.map((was, i) => {
          const el = wordRefs.current[i];
          if (!el) return was;
          const top = el.getBoundingClientRect().top;
          const on = top <= trigger;
          if (on !== was) changed = true;
          return on;
        });
        return changed ? next : prev;
      });
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const renderLine = (words: string[], offset: number) => (
    <p className="m-0 flex flex-wrap justify-center gap-x-3 gap-y-2 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
      {words.map((word, i) => {
        const index = offset + i;
        return (
          <span
            key={`${word}-${index}`}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            className={cn(
              "inline-block transition-colors duration-700",
              active[index] ? "text-[#1F1F1F]" : "text-[#1F1F1F]/30",
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
    <section
      id="conteudo"
      ref={sectionRef}
      className="bg-[#F8F1E3] px-6 pb-8 pt-16 sm:pb-10 sm:pt-20 md:pb-12 md:pt-24"
      aria-label="Promessa Rendal"
    >
      <div className="mx-auto flex max-w-[680px] flex-col items-center gap-4 text-center text-balance">
        {renderLine(LINE_A, 0)}
        {renderLine(LINE_B, LINE_A.length)}
      </div>
    </section>
  );
}
