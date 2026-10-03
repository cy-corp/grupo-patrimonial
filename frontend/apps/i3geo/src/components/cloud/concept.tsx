"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { facts, fmt, terrain } from "@/components/hero/terrain";
import { brand } from "@/lib/brand";

const CloudScene = dynamic(() => import("./cloud-scene"), { ssr: false });

const integer = new Intl.NumberFormat("pt-BR");
const mono = "font-[family-name:var(--font-concept-mono)]";

const CHAPTERS = [
  {
    id: "topografia",
    index: "01",
    label: "Topografia",
    title: "O relevo, ponto a ponto.",
    text: brand.areas[0].description,
    data: [
      ["Equidistância", `${facts.contourInterval} m`],
      ["Altitudes", `${integer.format(terrain.hMin)} a ${integer.format(terrain.hMax)} m`],
      ["Recorte", `${fmt.km(facts.extentKm[0])} × ${fmt.km(facts.extentKm[1])}`],
    ],
    side: "left",
  },
  {
    id: "georreferenciamento",
    index: "02",
    label: "Georreferenciamento",
    title: "Um perímetro que fecha.",
    text: brand.areas[1].description,
    data: [
      ["Vértices", `${facts.vertices}`],
      ["Datum", facts.datum],
      ["Área do imóvel", fmt.ha(facts.areaHa)],
    ],
    side: "right",
  },
  {
    id: "meio-ambiente",
    index: "03",
    label: "Meio Ambiente",
    title: "O que precisa ficar de pé.",
    text: brand.areas[2].description,
    data: [
      ["APP", `${facts.appWidthM} m · ${fmt.ha(facts.appHa)}`],
      ["Reserva legal", fmt.ha(facts.reserveHa)],
      ["Do imóvel", fmt.pct(facts.reservePct)],
    ],
    side: "left",
  },
] as const;

const STEPS = ["Ponto", ...CHAPTERS.map((c) => c.label), "i3Geo"];

function supportsWebGL2() {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { amount: 0.5 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
} as const;

export function Concept() {
  const track = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });

  useEffect(() => setWebgl(supportsWebGL2()), []);
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setStep(Math.min(STEPS.length - 1, Math.floor(v * 4 + 0.35))),
  );

  const animated = webgl === true && !reduceMotion;

  return (
    <div className="relative">
      <div className="fixed inset-0" aria-hidden="true">
        {animated ? (
          <div className={`size-full transition-opacity duration-1000 ${count ? "opacity-100" : "opacity-0"}`}>
            <CloudScene progress={scrollYProgress} onReady={setCount} />
          </div>
        ) : (
          webgl !== null && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/hero/contours.svg"
              alt=""
              className="size-full object-cover opacity-40 [filter:invert(1)_hue-rotate(180deg)_brightness(1.6)]"
            />
          )
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#03161c_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#03161c] to-transparent" />
      </div>

      <header className="fixed inset-x-0 top-0 z-20 flex h-16 items-center justify-between px-6 lg:px-12">
        <Link href="/" aria-label={brand.fullName}>
          <Image
            src="/brand/logo-i3geo-wordmark.svg"
            alt={brand.name}
            width={116}
            height={36}
            priority
            unoptimized
            className="h-8 w-auto brightness-0 invert"
          />
        </Link>
        <Link
          href="/#contato"
          className="border border-white/25 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-orange hover:text-orange"
        >
          Fale conosco
        </Link>
      </header>

      <ol
        aria-hidden="true"
        className={`fixed right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 lg:right-12 md:flex ${mono}`}
      >
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center justify-end gap-3">
            <span
              className={`text-[10px] uppercase tracking-[0.18em] transition-opacity duration-300 ${
                i === step ? "text-white opacity-100" : "opacity-0"
              }`}
            >
              {label}
            </span>
            <span
              className={`block h-px transition-all duration-300 ${
                i === step ? "w-8 bg-orange" : "w-4 bg-white/30"
              }`}
            />
          </li>
        ))}
      </ol>

      <div ref={track} className="relative z-10">
        <section className="flex h-[150vh] flex-col">
          <div className="sticky top-0 flex h-svh flex-col justify-end px-6 pb-14 lg:px-12 lg:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl"
            >
              <p className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/70 ${mono}`}>
                <span className="block size-1.5 bg-orange" />
                Topografia · Georreferenciamento · Meio Ambiente
              </p>
              <h1 className="mt-5 text-[clamp(2.6rem,8.2vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.035em] [text-shadow:0_2px_40px_#03161c]">
                Todo território começa com <span className="text-orange">um ponto.</span>
              </h1>
              <div className="mt-7 flex flex-wrap items-end justify-between gap-6">
                <p className="max-w-md text-base leading-relaxed text-white/75 lg:text-lg">
                  {count ? `${integer.format(count)} pontos` : "Milhares de pontos"} de elevação real
                  formam este relevo. Medimos, georreferenciamos e interpretamos cada um deles.
                </p>
                <p className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/60 ${mono}`}>
                  Role para levantar
                  <span className="block h-10 w-px animate-pulse bg-orange" />
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {CHAPTERS.map((chapter) => (
          <section key={chapter.id} id={chapter.id} className="h-[150vh]">
            <div
              className={`sticky top-0 flex h-svh items-end px-6 pb-14 md:items-center md:pb-0 lg:px-12 ${
                chapter.side === "right" ? "md:justify-end md:pr-32 lg:pr-40" : ""
              }`}
            >
              <motion.div {...reveal} className="relative max-w-md">
                <div className="absolute -inset-10 -z-10 bg-[radial-gradient(closest-side,#03161cdd,transparent)]" />
                <p className={`flex items-baseline gap-3 text-[11px] uppercase tracking-[0.22em] text-white/70 ${mono}`}>
                  <span className="text-orange">{chapter.index}</span>
                  {chapter.label}
                </p>
                <h2 className="mt-4 text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                  {chapter.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-white/75 lg:text-lg">{chapter.text}</p>
                <dl className={`mt-7 grid grid-cols-3 border-t border-white/20 ${mono}`}>
                  {chapter.data.map(([label, value]) => (
                    <div key={label} className="border-white/20 pr-3 pt-3 [&:not(:first-child)]:border-l [&:not(:first-child)]:pl-3">
                      <dt className="text-[9px] uppercase tracking-[0.16em] text-white/50">{label}</dt>
                      <dd className="mt-1 text-xs tabular-nums text-white sm:text-[13px]">{value}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </div>
          </section>
        ))}

        <section className="flex h-svh flex-col justify-end px-6 pb-12 lg:px-12">
          <motion.div {...reveal} className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-xl">
              <p className={`text-[11px] uppercase tracking-[0.22em] text-white/70 ${mono}`}>
                {brand.tagline}
              </p>
              <h2 className="mt-4 text-4xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Precisão territorial. <span className="text-orange">Inteligência ambiental.</span>
              </h2>
            </div>
            <div className="flex flex-col items-start gap-4 md:items-end">
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#contato"
                  className="bg-orange px-6 py-3.5 text-sm font-semibold text-[#03161c] transition-colors hover:bg-white"
                >
                  Solicitar orçamento
                </Link>
                <Link
                  href="/#areas"
                  className="border border-white/30 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-white"
                >
                  Conhecer áreas
                </Link>
              </div>
              <p className={`text-[10px] text-white/45 ${mono}`}>
                Imóvel ilustrativo · Relevo: AWS Terrain Tiles (SRTM)
              </p>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
