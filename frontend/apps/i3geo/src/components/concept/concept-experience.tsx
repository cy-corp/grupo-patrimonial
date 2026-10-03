"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { brand } from "@/lib/brand";
import { facts, fmt } from "../hero/terrain";
import { ConceptHud } from "./concept-hud";
import type { Readout } from "./concept-stage";

const ConceptScene = dynamic(() => import("./concept-scene"), { ssr: false });

const BG = "#021419";

function supportsWebGL2() {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

const rise = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
};

function Chapter({
  index,
  label,
  title,
  text,
  data,
  className,
}: {
  index: string;
  label: string;
  title: string;
  text: string;
  data: string[];
  className: string;
}) {
  return (
    <section className={`relative flex items-center ${className}`}>
      <div className="px-6 sm:px-10 lg:px-16">
        <motion.div {...rise} className="max-w-xl">
          <p className="flex items-baseline gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            <span className="text-orange tabular-nums">{index}</span>
            {label}
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl">
            {title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">{text}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {data.map((d) => (
              <li
                key={d}
                className="border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/85 tabular-nums backdrop-blur-sm"
              >
                {d}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

export function ConceptExperience() {
  const reduceMotion = useReducedMotion();
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const readout = useRef<Readout | null>(null);
  const { scrollY } = useScroll();
  const scroll = useTransform(scrollY, (y) => y / (typeof window === "undefined" ? 1 : window.innerHeight));
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => setWebgl(supportsWebGL2()), []);

  const live = webgl === true && !reduceMotion;

  return (
    <div className="relative text-white" style={{ backgroundColor: BG }}>
      <div className="fixed inset-0" style={{ backgroundColor: BG }} aria-hidden="true">
        <div
          className={`absolute inset-0 bg-white/25 transition-opacity duration-1000 ${
            live && ready ? "opacity-0" : "opacity-100"
          }`}
          style={{
            maskImage: "url(/hero/contours.svg)",
            WebkitMaskImage: "url(/hero/contours.svg)",
            maskSize: "cover",
            WebkitMaskSize: "cover",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
        {live && (
          <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
            <ConceptScene scroll={scroll} readout={readout} onReady={onReady} />
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(90deg, ${BG}F2 0%, ${BG}B3 28%, ${BG}00 58%), linear-gradient(0deg, ${BG}CC 0%, ${BG}00 30%), linear-gradient(180deg, ${BG}F2 0%, ${BG}CC 9%, ${BG}00 22%)`,
          }}
        />
      </div>

      {live && <ConceptHud readout={readout} />}

      <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between px-6 sm:h-20 sm:px-10 lg:px-16">
        <Link href="/" aria-label={brand.fullName}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-i3geo-wordmark-negativo.svg" alt={brand.name} className="h-8 w-auto sm:h-9" />
        </Link>
        <nav className="flex items-center gap-5">
          <Link href="/" className="hidden text-sm font-medium text-white/70 transition-colors hover:text-white sm:inline">
            Ver o site
          </Link>
          <Link
            href="/#contato"
            className="bg-white px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-gray-light"
          >
            Fale conosco
          </Link>
        </nav>
      </header>

      <main className="relative z-10">
        <section className="relative flex h-screen flex-col justify-end px-6 pb-[30vh] sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/60"
          >
            <span className="block size-1.5 rotate-45 bg-orange" />
            {brand.fullName}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-4xl text-[3.25rem] font-bold leading-[0.95] tracking-[-0.03em] sm:text-7xl lg:text-[7.5rem]"
          >
            O território,
            <br />
            <span className="text-[#A9E3F0]">medido.</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex max-w-xl flex-col gap-6"
          >
            <p className="text-base leading-relaxed text-white/70 sm:text-lg">
              {live
                ? "Passe o cursor sobre o relevo. Cada ponto tem coordenada, cota e contexto. É assim que a i3Geo enxerga um terreno."
                : "Cada ponto do relevo tem coordenada, cota e contexto. É assim que a i3Geo enxerga um terreno."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#contato"
                className="inline-flex items-center gap-2 bg-orange px-5 py-3 text-sm font-bold text-graphite transition-colors hover:bg-white"
              >
                Solicitar orçamento
              </Link>
              <a
                href="#topografia"
                className="border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                Ver como trabalhamos ↓
              </a>
            </div>
          </motion.div>
        </section>

        <div id="topografia">
          <Chapter
            className="h-[140vh]"
            index="01"
            label="Topografia"
            title="Cada metro, medido."
            text="Levantamentos planialtimétricos que transformam o relevo em cotas, perfis e curvas de nível para projetar com segurança."
            data={[`Curvas a cada ${facts.contourInterval} m`, `Recorte de ${fmt.km(facts.extentKm[0])} × ${fmt.km(facts.extentKm[1])}`]}
          />
        </div>
        <Chapter
          className="h-[130vh]"
          index="02"
          label="Georreferenciamento"
          title="Limites que não deixam dúvida."
          text="Vértices medidos em SIRGAS 2000, perímetro fechado e área calculada para matrícula, cartório e certificação no INCRA."
          data={[`${facts.vertices} vértices`, `Área ${fmt.ha(facts.areaHa)}`, facts.datum]}
        />
        <Chapter
          className="h-[130vh]"
          index="03"
          label="Meio Ambiente"
          title="Onde a água passa, a decisão muda."
          text="Rede de drenagem, APP e reserva legal mapeadas sobre o mesmo dado, para licenciar e planejar com responsabilidade."
          data={[`APP ${facts.appWidthM} m · ${fmt.ha(facts.appHa)}`, `Reserva legal ${fmt.ha(facts.reserveHa)} (${fmt.pct(facts.reservePct)})`]}
        />

        <section className="relative flex h-screen flex-col items-center justify-end px-6 pb-16 text-center sm:pb-20">
          <motion.div {...rise} className="flex flex-col items-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">{brand.tagline}</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Precisão territorial.
              <br />
              <span className="text-[#A9E3F0]">Inteligência ambiental.</span>
            </h2>
            <Link
              href="/#contato"
              className="mt-8 bg-orange px-7 py-4 text-base font-bold text-graphite transition-colors hover:bg-white"
            >
              Vamos medir o seu território
            </Link>
            <p className="mt-10 text-[10px] text-white/40">
              Conceito i3Geo · Imóvel ilustrativo · Relevo: AWS Terrain Tiles (SRTM)
            </p>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
