"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

const FRAMES = [
  {
    src: "/morph/frame-01.jpg",
    label: "Do terreno ao traço",
    sub: "Antes da fachada, o critério começa no papel.",
  },
  {
    src: "/morph/frame-02.jpg",
    label: "Uso no desenho",
    sub: "Vagas, acesso, o dia a dia já entram no projeto.",
  },
  {
    src: "/morph/frame-03.jpg",
    label: "Elevação fechada",
    sub: "Proporção definida. Sem improviso na obra.",
  },
  {
    src: "/morph/frame-04.jpg",
    label: "Presença na rua",
    sub: "Volume e sombra — o que o cliente sente de fora.",
  },
  {
    src: "/morph/frame-05.jpg",
    label: "Valor onde se vê",
    sub: "Madeira, laje e luz preenchendo o que era linha.",
  },
  {
    src: "/morph/frame-06.jpg",
    label: "Produto legível",
    sub: "Do croqui à decisão: a casa já se vende sozinha.",
  },
  {
    src: "/morph/frame-07.jpg",
    label: "Casa que parece cara",
    sub: "Preço que cabe. Presença de empreendimento Rendal.",
  },
] as const;

const LAST = FRAMES.length - 1;
/** Hold no frame final antes de liberar o pin */
const HOLD_END = 0.12;

function mapFrameExact(t: number) {
  const clamped = Math.min(1, Math.max(0, t));
  if (clamped >= 1 - HOLD_END) return LAST;
  return (clamped / (1 - HOLD_END)) * LAST;
}

/** Stepper chega a 100% quando o frame final trava (não só no fim absoluto do scroll) */
function mapStepper(t: number) {
  const clamped = Math.min(1, Math.max(0, t));
  const end = 1 - HOLD_END;
  if (clamped >= end) return 1;
  return clamped / end;
}

export function RendalMorphScroll() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [exact, setExact] = useState(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    // Progress only while the pin is active (section fills the viewport).
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 34,
    mass: 0.3,
    restDelta: 0.0001,
  });

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      FRAMES.map(
        (frame) =>
          new Promise<void>((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = frame.src;
          }),
      ),
    ).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useMotionValueEvent(smooth, "change", (v) => {
    if (reduceMotion) return;
    const t = Math.min(1, Math.max(0, v));
    const frameExact = mapFrameExact(t);
    setExact(frameExact);
    // Fecha o último tick quando o frame final já é o dominante
    const onFinal = frameExact >= LAST - 0.05;
    setProgress(onFinal ? 1 : mapStepper(t));
  });

  useEffect(() => {
    if (reduceMotion) {
      setProgress(1);
      setExact(LAST);
    }
  }, [reduceMotion]);

  const base = Math.min(LAST - 1, Math.floor(exact));
  const next = Math.min(LAST, base + 1);
  const blend = exact - Math.floor(exact);
  const soft = blend * blend * (3 - 2 * blend);
  const stageIndex = Math.min(LAST, Math.round(exact));
  const stage = FRAMES[stageIndex] ?? FRAMES[0];

  return (
    <section
      ref={trackRef}
      className={
        reduceMotion
          ? "relative z-0 bg-transparent pt-10 md:pt-28"
          : // Tall track = pin stays mid-screen while scroll only advances frames; unlocks after last.
            "relative z-0 h-[300vh] bg-transparent pt-10 md:h-[320vh] md:pt-28"
      }
      aria-label="Do croqui ao produto Rendal"
    >
      <div
        className={
          reduceMotion
            ? "relative flex flex-col"
            : "sticky top-0 flex min-h-dvh flex-col justify-center"
        }
      >
        <div className="flex w-full flex-col px-3 py-4 sm:px-5 sm:pb-8 sm:pt-6 md:px-8 md:pt-8 lg:px-10">
          <div className="mx-auto w-full max-w-[1100px] rounded-[1.75rem] border border-white/80 bg-[#FBFCFC] px-4 pb-5 pt-5 shadow-[0_18px_50px_rgba(31,31,31,0.08)] sm:px-6 sm:pb-6 sm:pt-6 md:rounded-[2.25rem] md:px-8 md:pb-7 md:pt-7">
            <div className="mb-4 flex items-end justify-between gap-4 md:mb-5">
              <div className="min-w-0">
                <p className="m-0 font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-[#0F5B63]">
                  Do papel à obra
                </p>
                <div className="mt-2.5 md:mt-3">
                  <motion.p
                    key={stage.label}
                    initial={reduceMotion ? false : { y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="m-0 font-display text-[clamp(1.5rem,4vw,2.75rem)] leading-[1.08] tracking-[-0.03em] text-graphite"
                  >
                    {stage.label}
                  </motion.p>
                </div>
                <div className="mt-1.5 md:mt-2">
                  <motion.p
                    key={stage.sub}
                    initial={reduceMotion ? false : { y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="m-0 max-w-[42ch] font-sans text-[13px] leading-snug text-graphite/60 sm:text-sm md:text-base"
                  >
                    {stage.sub}
                  </motion.p>
                </div>
              </div>

              <p className="shrink-0 pb-0.5 font-sans text-xs font-semibold tabular-nums tracking-[0.2em] text-graphite/45 md:text-sm">
                {String(stageIndex + 1).padStart(2, "0")}
                <span className="mx-1 text-graphite/25">/</span>
                {String(FRAMES.length).padStart(2, "0")}
              </p>
            </div>

            <div
              className="relative mx-auto aspect-video w-full overflow-hidden rounded-[1.15rem] border border-graphite/10 bg-[#EDE6DA] md:rounded-[1.5rem]"
              style={{ opacity: ready || reduceMotion ? 1 : 0.55 }}
            >
              {!reduceMotion && (
                <>
                  <div className="absolute inset-0">
                    <Image
                      src={FRAMES[base].src}
                      alt=""
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 1100px"
                      className="object-contain object-center"
                      draggable={false}
                    />
                  </div>
                  {next !== base && (
                    <div className="absolute inset-0" style={{ opacity: soft }}>
                      <Image
                        src={FRAMES[next].src}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 1100px"
                        className="object-contain object-center"
                        draggable={false}
                      />
                    </div>
                  )}
                </>
              )}

              {reduceMotion && (
                <div className="absolute inset-0">
                  <Image
                    src={FRAMES[LAST].src}
                    alt={FRAMES[LAST].label}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 1100px"
                    className="object-contain object-center"
                    draggable={false}
                  />
                </div>
              )}

              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 52%, rgba(15,20,25,0.18) 100%)",
                }}
              />
            </div>

            <div
              className="mt-4 flex items-center gap-1.5 md:mt-5 md:gap-2"
              aria-hidden
            >
              {FRAMES.map((frame, i) => {
                const fill = progress * FRAMES.length;
                const barWidth = Math.min(100, Math.max(0, fill - i) * 100);
                return (
                  <div
                    key={frame.src}
                    className="h-1 flex-1 overflow-hidden rounded-full bg-graphite/10"
                  >
                    <div
                      className="h-full rounded-full bg-[#0F5B63]"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
