"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { RendalIslandNav } from "./RendalIslandNav";
import { cn } from "@/lib/utils";

const EASE = "cubic-bezier(0.32,0.72,0,1)";

const FRAMES = [
  { src: "/morph/frame-01.jpg", label: "Do terreno ao traço" },
  { src: "/morph/frame-02.jpg", label: "Uso no desenho" },
  { src: "/morph/frame-03.jpg", label: "Elevação fechada" },
  { src: "/morph/frame-04.jpg", label: "Presença na rua" },
  { src: "/morph/frame-05.jpg", label: "Valor onde se vê" },
  { src: "/morph/frame-06.jpg", label: "Produto legível" },
  { src: "/morph/frame-07.jpg", label: "Casa pronta" },
] as const;
const LAST = FRAMES.length - 1;
const RENDER = FRAMES[LAST].src;
const DUSK = "/wireframes/scroll-fachada-dusk.jpg";

const EXPAND: [number, number] = [0.02, 0.2];
const MORPH: [number, number] = [0.2, 0.7];
const LIGHTS: [number, number] = [0.72, 0.82];
const FINALE: [number, number] = [0.84, 0.9];

const CTA =
  "inline-flex h-12 items-center justify-center rounded-full bg-[#0F5B63] px-6 text-base font-semibold text-white transition-all duration-700 hover:bg-[#0A474E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5B63] active:scale-[0.98]";

const HEADLINE_GRADIENT =
  "bg-gradient-to-r from-[#000000] to-[#666666] bg-clip-text text-transparent";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function FrameLayer({
  src,
  index,
  frame,
}: {
  src: string;
  index: number;
  frame: MotionValue<number>;
}) {
  const opacity = useTransform(frame, (f) => clamp01(f - index + 1));
  return (
    <motion.div
      className="absolute inset-0"
      style={index === 0 ? undefined : { opacity }}
    >
      <Image
        src={src}
        alt=""
        fill
        priority={index === 0}
        sizes="(max-width: 768px) 100vw, 1400px"
        className="object-cover"
        draggable={false}
      />
    </motion.div>
  );
}

function HeroCopy({ hint }: { hint: string }) {
  return (
    <div className="mx-auto flex max-w-[680px] flex-col items-center text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
        <span className={cn("block pb-1", HEADLINE_GRADIENT)}>
          Casa que parece cara.
        </span>
        <span className={cn("block pb-1", HEADLINE_GRADIENT)}>
          Preço que cabe.
        </span>
      </h1>
      <p className="mt-4 max-w-[34rem] text-base leading-7 text-pretty text-[#1F1F1F]/70 sm:text-lg sm:leading-8">
        Laje que vira lazer, lavabo no social e fachada de empreendimento, no
        preço de casa popular.
      </p>
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
        <Link
          href="/empreendimentos"
          className={CTA}
          style={{ transitionTimingFunction: EASE }}
        >
          Ver empreendimentos
        </Link>
        <p className="hidden text-sm font-semibold text-[#1F1F1F]/50 sm:block">
          {hint}
        </p>
      </div>
    </div>
  );
}

function FinaleCopy() {
  return (
    <>
      <p className="text-sm font-semibold text-[#0F5B63]">Do traço à casa</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-balance text-[#1F1F1F] sm:text-3xl">
        Parece cara. Agora, o preço.
      </h2>
      <p className="mt-2 hidden text-base leading-7 text-pretty text-[#1F1F1F]/70 sm:block">
        Antes de ver o valor, chute quanto você pagaria por ela.
      </p>
      <Link
        href="#chute"
        className={cn(CTA, "mt-4")}
        style={{ transitionTimingFunction: EASE }}
      >
        Chutar o preço
      </Link>
    </>
  );
}

function StaticHero() {
  return (
    <section
      id="conteudo"
      className="relative bg-[#F8F1E3] px-4 pb-16 pt-28 sm:px-6 sm:pt-36"
    >
      <HeroCopy hint="Do croqui à casa pronta, no mesmo preço." />
      <div className="relative mx-auto mt-12 aspect-[4/5] w-full max-w-6xl overflow-hidden rounded-3xl bg-[#EDE6DA] md:aspect-video">
        <Image
          src={DUSK}
          alt="Fachada Rendal ao entardecer, com laje de lazer e luz acesa"
          fill
          sizes="(max-width: 768px) 100vw, 1150px"
          className="object-cover"
        />
      </div>
      <div className="mx-auto mt-8 max-w-6xl">
        <FinaleCopy />
      </div>
    </section>
  );
}

export function RendalConceptHero() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const [wide, setWide] = useState(true);
  const [step, setStep] = useState(0);

  const startScale = useMotionValue(0.55);
  const startY = useMotionValue(220);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 40,
    mass: 0.12,
    restDelta: 0.0001,
  });

  const expand = useTransform(progress, EXPAND, [0, 1]);
  const scale = useTransform([expand, startScale], ([k, s]: number[]) => s + (1 - s) * k);
  const y = useTransform([expand, startY], ([k, y0]: number[]) => y0 * (1 - k));
  const radius = useTransform(scale, (s) => 28 / s);

  const copyOpacity = useTransform(progress, [0.02, 0.09], [1, 0]);
  const copyY = useTransform(progress, [0.02, 0.14], [0, -80]);
  const copyEvents = useTransform(progress, (v) => (v < 0.05 ? "auto" : "none"));
  const lensOpacity = useTransform(progress, [0.02, 0.08], [1, 0]);

  const frame = useTransform(progress, MORPH, [0, LAST]);
  const lights = useTransform(progress, LIGHTS, [0, 1]);
  const stepOpacity = useTransform(progress, [0.16, 0.22, 0.8, 0.84], [0, 1, 1, 0]);
  const stepBar = useTransform(progress, [MORPH[0], LIGHTS[1]], [0, 1]);
  const finaleOpacity = useTransform(progress, FINALE, [0, 1]);
  const finaleY = useTransform(progress, FINALE, [24, 0]);
  const finaleEvents = useTransform(progress, (v) => (v > FINALE[0] ? "auto" : "none"));

  useMotionValueEvent(frame, "change", (value) => {
    setStep(Math.round(value));
  });

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const sync = () => setWide(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const stage = stageRef.current;
    const copy = copyRef.current;
    const area = areaRef.current;
    const card = cardRef.current;
    if (!stage || !copy || !area || !card) return;

    const measure = () => {
      const gap = 24;
      const copyBottom = copy.offsetTop + copy.offsetHeight + gap;
      const center = area.offsetTop + area.offsetHeight / 2;
      const height = card.offsetHeight;
      const room = stage.clientHeight - 16 - copyBottom;
      const max = window.innerWidth >= 768 ? 0.56 : 0.7;
      const s0 = Math.min(max, Math.max(0.3, room / height));
      startScale.set(s0);
      startY.set(copyBottom - center + (s0 * height) / 2);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(copy);
    observer.observe(card);
    return () => observer.disconnect();
  }, [reduceMotion, startScale, startY]);

  useEffect(() => {
    if (reduceMotion) return;
    const card = cardRef.current;
    if (!card) return;
    let raf = 0;
    const began = performance.now();
    const [cx, cy, ax, ay] = wide ? [36, 30, 16, 10] : [34, 30, 20, 10];
    const tick = (now: number) => {
      if (!hovering.current && progress.get() < 0.08) {
        const t = (now - began) / 1000;
        card.style.setProperty("--lx", `${cx + ax * Math.sin(t * 0.42)}%`);
        card.style.setProperty("--ly", `${cy + ay * Math.sin(t * 0.77)}%`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, wide, progress]);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    hovering.current = true;
    event.currentTarget.style.setProperty(
      "--lx",
      `${((event.clientX - rect.left) / rect.width) * 100}%`,
    );
    event.currentTarget.style.setProperty(
      "--ly",
      `${((event.clientY - rect.top) / rect.height) * 100}%`,
    );
  };

  if (reduceMotion) {
    return (
      <>
        <RendalIslandNav />
        <StaticHero />
      </>
    );
  }

  const lensMask =
    "radial-gradient(circle var(--lr) at var(--lx) var(--ly), #000 calc(100% - 1.5px), transparent 100%)";

  return (
    <>
      <RendalIslandNav />
      <section
        id="conteudo"
        ref={trackRef}
        className="relative h-[340vh] bg-[#F8F1E3] md:h-[400vh]"
        aria-label="Do traço à casa Rendal"
      >
        <div ref={stageRef} className="sticky top-0 h-svh overflow-hidden">
          <motion.div
            ref={copyRef}
            className="absolute inset-x-0 top-0 z-20 px-6 pt-24 sm:pt-32"
            style={{ opacity: copyOpacity, y: copyY, pointerEvents: copyEvents }}
          >
            <HeroCopy hint="Passe o cursor no desenho: o traço já é a casa." />
          </motion.div>

          <div
            ref={areaRef}
            className="absolute inset-x-0 bottom-4 top-20 flex items-center justify-center sm:bottom-6 sm:top-24"
          >
            <motion.div
              ref={cardRef}
              onPointerMove={onPointerMove}
              onPointerLeave={() => {
                hovering.current = false;
              }}
              className="relative aspect-[4/5] max-h-full w-[calc(100vw-2rem)] overflow-hidden bg-[#F2EEE6] shadow-[0_28px_60px_rgba(31,31,31,0.16)] md:aspect-video md:w-[min(calc(100vw-3rem),calc((100svh-7.5rem)*16/9))]"
              style={
                {
                  scale,
                  y,
                  borderRadius: radius,
                  "--lx": "36%",
                  "--ly": "30%",
                  "--lr": wide ? "10rem" : "6rem",
                } as unknown as CSSProperties
              }
            >
              {FRAMES.map((item, index) => (
                <FrameLayer key={item.src} src={item.src} index={index} frame={frame} />
              ))}

              <motion.div className="absolute inset-0" style={{ opacity: lights }}>
                <Image
                  src={DUSK}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 1400px"
                  className="object-cover"
                  draggable={false}
                />
              </motion.div>

              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ opacity: lensOpacity }}
              >
                <div
                  className="absolute inset-0"
                  style={{ maskImage: lensMask, WebkitMaskImage: lensMask }}
                >
                  <Image
                    src={RENDER}
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 1400px"
                    className="object-cover"
                    draggable={false}
                  />
                </div>
                <span
                  className="absolute rounded-full border-2 border-white shadow-[0_12px_40px_rgba(31,31,31,0.28)]"
                  style={{
                    left: "var(--lx)",
                    top: "var(--ly)",
                    width: "calc(var(--lr) * 2)",
                    height: "calc(var(--lr) * 2)",
                    translate: "-50% -50%",
                  }}
                />
              </motion.div>

              <span className="sr-only">
                Croqui da fachada Rendal que se transforma na casa pronta,
                com laje de lazer, madeira ripada e iluminação ao entardecer.
              </span>

              <motion.div
                aria-hidden
                className="absolute bottom-4 left-4 rounded-2xl bg-white/85 px-4 py-3 shadow-[0_12px_32px_rgba(31,31,31,0.12)] backdrop-blur-xl md:bottom-6 md:left-6"
                style={{ opacity: stepOpacity }}
              >
                <p className="text-xs font-semibold tabular-nums tracking-widest text-[#1F1F1F]/50">
                  {String(step + 1).padStart(2, "0")}
                  <span className="mx-1 text-[#1F1F1F]/25">/</span>
                  {String(FRAMES.length).padStart(2, "0")}
                </p>
                <motion.p
                  key={step}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                  className="mt-1 text-base font-semibold text-[#1F1F1F]"
                >
                  {FRAMES[step]?.label}
                </motion.p>
                <div className="mt-3 h-1 w-40 overflow-hidden rounded-full bg-[#1F1F1F]/10">
                  <motion.div
                    className="h-full origin-left rounded-full bg-[#0F5B63]"
                    style={{ scaleX: stepBar }}
                  />
                </div>
              </motion.div>

              <motion.div
                className="absolute inset-x-4 bottom-4 rounded-3xl bg-white/90 p-5 sm:p-6 shadow-[0_16px_40px_rgba(31,31,31,0.16)] backdrop-blur-xl sm:right-auto sm:max-w-md md:bottom-6 md:left-6"
                style={{ opacity: finaleOpacity, y: finaleY, pointerEvents: finaleEvents }}
              >
                <FinaleCopy />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
