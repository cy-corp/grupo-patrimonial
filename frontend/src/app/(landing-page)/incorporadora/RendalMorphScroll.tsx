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
  type MotionValue,
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

const PROOFS = [
  {
    title: "Laje de lazer",
    body: "Em vez de telhado que só gasta, a cobertura vira área de estar.",
  },
  {
    title: "Lavabo social",
    body: "Visitante se atende sem entrar na área íntima da casa.",
  },
  {
    title: "Acabamento que se vê",
    body: "Alto padrão no olho. Racionalização só no que não aparece.",
  },
] as const;

const CARD_H = 76;
const CARD_GAP = 8;
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

function ProofSlideTile({
  card,
  index,
  progress,
  reduceMotion,
}: {
  card: (typeof PROOFS)[number];
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  const start = index === 0 ? 0 : 0.08 + (index - 1) * 0.4;
  const end = index === 0 ? 0 : start + 0.4;

  const opacity = useTransform(
    progress,
    index === 0 ? [0, 1] : [start, start + 0.2, end],
    index === 0 || reduceMotion ? [1, 1] : [0, 1, 1],
  );
  const y = useTransform(progress, (p) => {
    if (reduceMotion) return index * (CARD_H + CARD_GAP);
    if (index === 0) return 0;
    let offset = 0;
    for (let j = 1; j <= index; j += 1) {
      const s = 0.08 + (j - 1) * 0.4;
      const e = s + 0.4;
      const t = Math.min(1, Math.max(0, (p - s) / (e - s)));
      const soft = t * t * (3 - 2 * t);
      offset += soft * (CARD_H + CARD_GAP);
    }
    return offset;
  });

  return (
    <motion.article
      style={{
        y: reduceMotion ? index * (CARD_H + CARD_GAP) : y,
        opacity: reduceMotion ? 1 : opacity,
        zIndex: index + 1,
      }}
      className="absolute inset-x-0 top-0 rounded-[1.15rem] border border-black/[0.05] bg-white px-3.5 py-2.5 shadow-[0_10px_28px_rgba(15,20,25,0.12)]"
    >
      <h2 className="m-0 text-[13px] font-bold tracking-[-0.02em] text-[#1F1F1F]">
        {card.title}
      </h2>
      <p className="mt-0.5 m-0 text-[12px] leading-snug text-[#4D4D4D]">
        {card.body}
      </p>
    </motion.article>
  );
}

export function RendalMorphScroll() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [exact, setExact] = useState(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Spring curto: o frame acompanha o scroll em vez de atrasar
  const smooth = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 40,
    mass: 0.12,
    restDelta: 0.0001,
  });

  // Primeira imagem sobe pra dentro do quadro quando o frame entra na tela
  const { scrollYProgress: arrive } = useScroll({
    target: frameRef,
    offset: ["start 1", "start 0.72"],
  });
  const pageY = useTransform(arrive, [0, 1], ["78%", "0%"]);
  const pageOpacity = useTransform(arrive, [0, 0.2, 1], [0, 0.65, 1]);

  // Cards começam a abrir antes do pin e terminam logo que ele engata
  const { scrollYProgress: proofRaw } = useScroll({
    target: trackRef,
    offset: ["start 0.85", "start 0.05"],
  });
  const proofProgress = useSpring(proofRaw, {
    stiffness: 280,
    damping: 40,
    mass: 0.12,
    restDelta: 0.001,
  });

  // Espaço vazio abaixo do card pinado; a próxima seção sobe até sobrar só o respiro
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const sticky = stickyRef.current;
    const card = cardRef.current;
    if (!sticky || !card) return;
    const measure = () => {
      const breathing = window.innerWidth >= 768 ? 96 : 72;
      const empty =
        sticky.getBoundingClientRect().bottom -
        card.getBoundingClientRect().bottom;
      setTrail(Math.round(empty - breathing));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(sticky);
    ro.observe(card);
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
  const stackH = CARD_H * PROOFS.length + CARD_GAP * (PROOFS.length - 1);

  return (
    <section
      ref={trackRef}
      className={
        reduceMotion
          ? "relative z-0 bg-transparent pt-10 md:pt-28"
          : "pointer-events-none relative z-0 h-[230vh] bg-transparent md:h-[250vh] md:pt-16"
      }
      style={reduceMotion ? undefined : { marginBottom: -trail }}
      aria-label="Do croqui ao produto Rendal"
    >
      <div
        ref={stickyRef}
        className={
          reduceMotion
            ? "relative flex flex-col"
            : // Morph sempre no meio; cards mobile absolutos no topo do pin
              "pointer-events-auto sticky top-0 flex min-h-dvh flex-col justify-center"
        }
      >
        {/* Mobile: 3 cards entram no scroll e ficam no topo enquanto o morph trava no meio */}
        {!reduceMotion && (
          <div className="pointer-events-none absolute inset-x-0 top-2 z-20 px-3 sm:px-4 md:hidden">
            <div
              className="pointer-events-auto relative mx-auto w-full max-w-[21rem]"
              style={{ height: stackH }}
              aria-label="Diferenciais do produto"
            >
              {PROOFS.map((card, i) => (
                <ProofSlideTile
                  key={card.title}
                  card={card}
                  index={i}
                  progress={proofProgress}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>
        )}

        {reduceMotion && (
          <div className="relative z-10 mb-6 px-3 md:hidden">
            <div className="mx-auto flex max-w-[21rem] flex-col gap-3">
              {PROOFS.map((card) => (
                <article
                  key={card.title}
                  className="rounded-[1.25rem] border border-black/[0.05] bg-white px-4 py-4 shadow-[0_14px_36px_rgba(15,20,25,0.14)]"
                >
                  <h2 className="m-0 text-[14px] font-bold tracking-[-0.02em] text-[#1F1F1F]">
                    {card.title}
                  </h2>
                  <p className="mt-1.5 m-0 text-[12.5px] leading-relaxed text-[#4D4D4D]">
                    {card.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}

        <div className="relative z-0 flex w-full translate-y-12 flex-col px-3 py-4 sm:px-5 sm:pb-8 sm:pt-6 md:translate-y-0 md:px-8 md:pt-8 lg:px-10">
          <div
            ref={cardRef}
            className="mx-auto w-full max-w-[1100px] rounded-[1.75rem] border border-white/80 bg-[#FBFCFC] px-4 pb-5 pt-5 shadow-[0_18px_50px_rgba(31,31,31,0.08)] sm:px-6 sm:pb-6 sm:pt-6 md:rounded-[2.25rem] md:px-8 md:pb-7 md:pt-7"
          >
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
              ref={frameRef}
              className="relative mx-auto aspect-video w-full overflow-hidden rounded-[1.15rem] border border-graphite/10 bg-[#EDE6DA] md:rounded-[1.5rem]"
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
