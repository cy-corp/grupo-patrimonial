"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { brand } from "@/lib/brand";
import { BEATS, beatAt } from "./beats";
import { facts, fmt } from "./terrain";
import { TerrainStatic } from "./terrain-static";

const TerrainScene = dynamic(() => import("./terrain-scene"), { ssr: false });

function supportsWebGL2() {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

const SHEET = [
  ["Datum", facts.datum],
  ["Equidistância", `${facts.contourInterval} m`],
  ["Recorte", `${fmt.km(facts.extentKm[0])} × ${fmt.km(facts.extentKm[1])}`],
  ["Folha", "01/01"],
] as const;

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const [beat, setBeat] = useState(0);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });

  useEffect(() => setWebgl(supportsWebGL2()), []);
  useMotionValueEvent(scrollYProgress, "change", (v) => setBeat(beatAt(v)));

  // Até montar (e saber se há WebGL), assume a versão animada, igual ao HTML do servidor.
  const animated = webgl === null || (webgl && !reduceMotion);
  const current = animated ? BEATS[beat] : BEATS[BEATS.length - 1];

  return (
    <section
      ref={section}
      aria-label={brand.fullName}
      className={animated ? "relative h-[240vh] lg:h-[320vh]" : "relative"}
    >
      <div
        className={
          animated
            ? "sticky top-0 flex h-svh flex-col lg:flex-row"
            : "flex min-h-[calc(100svh-4rem)] flex-col lg:flex-row"
        }
      >
        <div className="relative z-10 flex shrink-0 flex-col justify-center gap-4 px-6 pb-3 pt-6 sm:gap-5 lg:w-[42%] lg:max-w-[40rem] lg:py-12 lg:pl-12 lg:pr-10 xl:pl-20">
          <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-brand sm:text-xs sm:tracking-[0.16em]">
            <span className="block size-1.5 bg-orange" aria-hidden="true" />
            Topografia · Georreferenciamento · Meio Ambiente
          </p>
          <h1 className="text-[2rem] font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
            Precisão territorial.{" "}
            <span className="text-brand">Inteligência ambiental.</span>
          </h1>
          <p className="hidden max-w-md text-base leading-relaxed text-muted sm:block lg:text-lg">
            {brand.tagline} Medimos, georreferenciamos e interpretamos o
            território para decisões técnicas, jurídicas e ambientais mais
            seguras.
          </p>
          <div className="flex flex-wrap gap-2 pt-1 sm:gap-3">
            <a
              href="#contato"
              className="inline-flex items-center gap-2 bg-brand px-4 py-3 sm:px-5 text-sm font-semibold text-white transition-colors hover:bg-graphite"
            >
              <span className="block size-1.5 bg-orange" aria-hidden="true" />
              Solicitar orçamento
            </a>
            <a
              href="#areas"
              className="border border-border px-4 py-3 sm:px-5 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
            >
              Conhecer áreas
            </a>
          </div>
          <dl className="mt-4 hidden max-w-md grid-cols-2 border-l border-t border-border text-[11px] lg:grid">
            {SHEET.map(([label, value]) => (
              <div key={label} className="border-b border-r border-border px-3 py-2">
                <dt className="font-semibold uppercase tracking-[0.12em] text-gray-dark/70">
                  {label}
                </dt>
                <dd className="mt-0.5 font-medium text-graphite tabular-nums">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-3 mb-3 min-h-0 flex-1 overflow-hidden border border-border bg-white sm:mx-6 sm:mb-6 lg:my-8 lg:ml-0 lg:mr-8">
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              animated && ready ? "opacity-0" : "opacity-100"
            }`}
          >
            <TerrainStatic complete={!animated} />
          </div>
          {animated && webgl && (
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${
                ready ? "opacity-100" : "opacity-0"
              }`}
            >
              <TerrainScene progress={scrollYProgress} onReady={() => setReady(true)} />
            </div>
          )}

          <PlateFrame north={!animated || beat === 0} />

          <div className="pointer-events-none absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-sm">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="border border-border bg-white/92 px-4 py-3 shadow-sm backdrop-blur-sm"
              >
                <p className="flex items-baseline gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                  <span className="tabular-nums text-orange">{current.index}</span>
                  {current.title}
                </p>
                <p className="mt-1 text-sm leading-snug text-graphite">{current.text}</p>
                {animated ? (
                  <p className="mt-1.5 text-xs font-medium text-gray-dark tabular-nums">
                    {current.data}
                  </p>
                ) : (
                  <ul className="mt-1.5 space-y-0.5 text-xs font-medium text-gray-dark tabular-nums">
                    {BEATS.slice(1, 4).map((b) => (
                      <li key={b.id}>{b.data}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {animated && (
            <ol
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-3 flex gap-1 sm:right-5 sm:top-auto sm:bottom-5"
            >
              {BEATS.map((b, i) => (
                <li
                  key={b.id}
                  className={`h-1 w-5 transition-colors duration-300 ${
                    i <= beat ? "bg-brand" : "bg-gray-light"
                  }`}
                />
              ))}
            </ol>
          )}

          {animated && (
            <p
              className={`pointer-events-none absolute left-1/2 top-4 hidden -translate-x-1/2 bg-white/90 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-dark transition-opacity duration-500 sm:block ${
                beat === 0 ? "opacity-100" : "opacity-0"
              }`}
            >
              Role para explorar ↓
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

// Moldura de prancha técnica: marcas de grade, norte e créditos.
function PlateFrame({ north }: { north: boolean }) {
  const ticks = "repeating-linear-gradient(to right, var(--brand-petroleum) 0 1px, transparent 1px 48px)";
  const ticksY = "repeating-linear-gradient(to bottom, var(--brand-petroleum) 0 1px, transparent 1px 48px)";
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute inset-x-0 top-0 h-1.5 opacity-30" style={{ backgroundImage: ticks }} />
      <div className="absolute inset-x-0 bottom-0 h-1.5 opacity-30" style={{ backgroundImage: ticks }} />
      <div className="absolute inset-y-0 left-0 w-1.5 opacity-30" style={{ backgroundImage: ticksY }} />
      <div className="absolute inset-y-0 right-0 w-1.5 opacity-30" style={{ backgroundImage: ticksY }} />
      <svg
        viewBox="0 0 24 36"
        className={`absolute left-4 top-4 hidden h-9 w-6 text-brand transition-opacity duration-500 sm:block ${north ? "opacity-100" : "opacity-0"}`}
      >
        <path d="M12 2 L19 22 L12 18 L5 22 Z" fill="currentColor" />
        <text x="12" y="34" textAnchor="middle" fontSize="9" fontWeight="700" fill="currentColor">
          N
        </text>
      </svg>
      <p className="absolute right-4 top-3 hidden bg-white/85 px-1 text-[9px] text-gray-dark sm:block">
        Imóvel ilustrativo · Relevo: AWS Terrain Tiles (SRTM)
      </p>
    </div>
  );
}
