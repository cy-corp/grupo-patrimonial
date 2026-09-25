"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { RendalTaglineReveal } from "./RendalTaglineReveal";

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
    sub: "Volume e sombra: o que o cliente sente de fora.",
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

function mapStepper(t: number) {
  const clamped = Math.min(1, Math.max(0, t));
  const end = 1 - HOLD_END;
  if (clamped >= end) return 1;
  return clamped / end;
}

export function RendalMorphScroll() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [exact, setExact] = useState(0);
  const [ready, setReady] = useState(false);
  const [arriveProgress, setArriveProgress] = useState(reduceMotion ? 1 : 0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 40,
    mass: 0.12,
    restDelta: 0.0001,
  });

  /** Whole sticky cluster fades in as it leaves the hero */
  const { scrollYProgress: clusterArrive } = useScroll({
    target: trackRef,
    offset: ["start 0.92", "start 0.35"],
  });
  const clusterOpacity = useTransform(
    clusterArrive,
    [0, 0.45, 1],
    reduceMotion ? [1, 1, 1] : [0, 0.9, 1],
  );
  const clusterY = useTransform(
    clusterArrive,
    [0, 1],
    reduceMotion ? [0, 0] : [28, 0],
  );

  const { scrollYProgress: arrive } = useScroll({
    target: frameRef,
    offset: ["start 1", "start 0.72"],
  });
  const pageY = useTransform(arrive, [0, 1], ["78%", "0%"]);
  const pageOpacity = useTransform(arrive, [0, 0.2, 1], [0, 0.65, 1]);

  const stickyRef = useRef<HTMLDivElement>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState(0);

  useMotionValueEvent(clusterArrive, "change", (v) => {
    setArriveProgress(Math.min(1, Math.max(0, v)));
  });

  useEffect(() => {
    if (reduceMotion) {
      setArriveProgress(1);
      return;
    }
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const sticky = stickyRef.current;
    const cluster = clusterRef.current;
    if (!sticky || !cluster) return;
    const measure = () => {
      const breathing = window.innerWidth >= 768 ? 96 : 72;
      const empty =
        sticky.getBoundingClientRect().bottom -
        cluster.getBoundingClientRect().bottom;
      setTrail(Math.round(empty - breathing));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(sticky);
    ro.observe(cluster);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduceMotion]);

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
      id="conteudo"
      ref={trackRef}
      className={
        reduceMotion
          ? "relative z-0 bg-transparent pt-8 md:pt-14"
          : "pointer-events-none relative z-0 h-[230vh] bg-transparent md:h-[250vh]"
      }
      style={reduceMotion ? undefined : { marginBottom: -trail }}
      aria-label="Do croqui ao produto Rendal"
    >
      <div
        ref={stickyRef}
        className={
          reduceMotion
            ? "relative flex flex-col"
            : "pointer-events-auto sticky top-0 flex min-h-svh flex-col justify-center md:min-h-dvh"
        }
      >
        <motion.div
          ref={clusterRef}
          className="relative z-0 flex w-full flex-col gap-5 px-3 py-4 sm:gap-6 sm:px-5 sm:py-6 md:gap-7 md:px-8 lg:px-10"
          style={
            reduceMotion
              ? undefined
              : {
                  opacity: clusterOpacity,
                  y: clusterY,
                }
          }
        >
          <RendalTaglineReveal progress={arriveProgress} />

          <div className="mx-auto w-full max-w-[1100px] rounded-2xl border border-white/80 bg-[#FBFCFC] px-4 pb-5 pt-5 shadow-[0_18px_50px_rgba(31,31,31,0.08)] sm:px-6 sm:pb-6 sm:pt-6 md:rounded-[2rem] md:px-8 md:pb-7 md:pt-7">
            <div className="mb-4 flex items-end justify-between gap-4 md:mb-5">
              <div className="min-w-0">
                <p className="m-0 font-sans text-xs font-semibold uppercase tracking-widest text-[#0F5B63]">
                  Do papel à obra
                </p>
                <div className="mt-1 md:mt-1.5">
                  <motion.p
                    key={stage.label}
                    initial={reduceMotion ? false : { y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                    className="m-0 font-sans text-2xl font-semibold leading-8 tracking-tight text-balance text-[#1F1F1F] sm:text-3xl sm:leading-9 md:text-4xl md:leading-10"
                  >
                    {stage.label}
                  </motion.p>
                </div>
                <div className="mt-1 md:mt-1.5">
                  <motion.p
                    key={stage.sub}
                    initial={reduceMotion ? false : { y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                    className="m-0 max-w-[42ch] font-sans text-sm leading-5 text-pretty text-[#1F1F1F]/60 sm:text-base sm:leading-7"
                  >
                    {stage.sub}
                  </motion.p>
                </div>
              </div>

              <p className="shrink-0 pb-0.5 font-sans text-xs font-semibold tabular-nums tracking-widest text-[#1F1F1F]/45 md:text-sm">
                {String(stageIndex + 1).padStart(2, "0")}
                <span className="mx-1 text-[#1F1F1F]/25">/</span>
                {String(FRAMES.length).padStart(2, "0")}
              </p>
            </div>

            <div
              ref={frameRef}
              className="relative mx-auto aspect-video max-h-[min(36svh,18rem)] w-full overflow-hidden rounded-xl border border-[#1F1F1F]/10 bg-[#EDE6DA] sm:max-h-[min(42svh,24rem)] md:max-h-[min(48svh,30rem)] md:rounded-2xl lg:max-h-none"
              style={{ opacity: ready || reduceMotion ? 1 : 0.55 }}
            >
              {!reduceMotion && (
                <motion.div
                  className="absolute inset-0"
                  style={{ y: pageY, opacity: pageOpacity }}
                >
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
                </motion.div>
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
                    className="h-1 flex-1 overflow-hidden rounded-full bg-[#1F1F1F]/10"
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
        </motion.div>
      </div>
    </section>
  );
}
