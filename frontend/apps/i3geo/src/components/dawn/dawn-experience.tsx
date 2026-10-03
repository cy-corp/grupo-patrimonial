"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { brand, colors } from "@/lib/brand";
import { ramp } from "../hero/beats";
import { facts, fmt } from "../hero/terrain";
import { PAPER, css, skyAt, stageAt } from "./dawn-stage";

const DawnScene = dynamic(() => import("./dawn-scene"), { ssr: false });

function supportsWebGL2() {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

// Estrelas fixas (semente constante para o servidor e o cliente coincidirem).
const STARS = (() => {
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: 90 }, () => ({ x: rnd() * 100, y: rnd() * 42, r: 0.4 + rnd() * 0.9, o: 0.25 + rnd() * 0.6 }));
})();

const rise = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
};

function mixHex(a: string, b: string, t: number) {
  const p = (h: string, i: number) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
  const c = [0, 1, 2].map((i) => Math.round(p(a, i) + (p(b, i) - p(a, i)) * t));
  return `rgb(${c.join(",")})`;
}

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
    <section className={`relative flex items-start sm:items-center ${className}`}>
      <div className="px-4 pt-[16vh] sm:px-10 sm:pt-0 lg:px-16">
        <motion.div {...rise} className="max-w-xl bg-[#F6F4EF]/85 p-5 backdrop-blur-sm sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
          <p className="flex items-baseline gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-graphite/60">
            <span className="text-orange tabular-nums">{index}</span>
            {label}
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-[1.02] tracking-tight text-brand sm:text-6xl">{title}</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-graphite/75 sm:text-lg">{text}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {data.map((d) => (
              <li
                key={d}
                className="border border-brand/15 bg-white/70 px-3 py-1.5 text-xs font-semibold text-brand tabular-nums backdrop-blur-sm"
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

function useDay(scroll: MotionValue<number>) {
  return useTransform(scroll, (v) => stageAt(v).day);
}

export function DawnExperience() {
  const reduceMotion = useReducedMotion();
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const { scrollY } = useScroll();
  const scroll = useTransform(scrollY, (y) => y / (typeof window === "undefined" ? 1 : window.innerHeight));
  const day = useDay(scroll);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => setWebgl(supportsWebGL2()), []);
  const live = webgl === true && !reduceMotion;

  const sky = useTransform(day, (d) => {
    const s = skyAt(d);
    const glow = ramp(d, 0.05, 0.3) * (1 - ramp(d, 0.45, 0.85));
    return [
      `radial-gradient(ellipse 55% 38% at 82% 34%, rgba(255,176,112,${0.75 * glow}) 0%, rgba(255,140,90,${0.25 * glow}) 45%, rgba(255,140,90,0) 100%)`,
      `linear-gradient(180deg, ${css(s.top)} 0%, ${css(s.horizon)} 36%, ${css(s.ground)} 64%, ${css(s.ground)} 100%)`,
    ].join(", ");
  });
  const scrim = useTransform(day, (d) => {
    const g = skyAt(d).ground;
    return `linear-gradient(90deg, ${css(g, 0.92)} 0%, ${css(g, 0.6)} 30%, ${css(g, 0)} 58%), linear-gradient(0deg, ${css(g, 0.92)} 0%, ${css(g, 0.5)} 18%, ${css(g, 0)} 40%)`;
  });
  const topScrim = useTransform(day, (d) => {
    const s = skyAt(d);
    return `linear-gradient(180deg, ${css(s.top, 0.96)} 0%, ${css(s.top, 0.8)} 45%, ${css(s.top, 0)} 100%)`;
  });
  const stars = useTransform(day, (d) => 1 - ramp(d, 0.02, 0.32));
  const nightLogo = useTransform(day, (d) => 1 - ramp(d, 0.35, 0.6));
  const dayLogo = useTransform(day, (d) => ramp(d, 0.35, 0.6));
  const navInk = useTransform(day, (d) => mixHex("#FFFFFF", colors.graphite, ramp(d, 0.35, 0.6)));
  const ctaBg = useTransform(day, (d) => mixHex("#FFFFFF", colors.petroleum, ramp(d, 0.35, 0.6)));
  const interludeInk = useTransform(day, (d) => mixHex("#FFFFFF", colors.petroleum, ramp(d, 0.4, 0.62)));
  const interludeText = useTransform(day, (d) => mixHex("#D5E3E7", colors.graphite, ramp(d, 0.4, 0.62)));
  const ctaInk = useTransform(day, (d) => mixHex(colors.petroleum, "#FFFFFF", ramp(d, 0.35, 0.6)));

  return (
    <div className="relative" style={{ backgroundColor: PAPER }}>
      <motion.div className="fixed inset-0" style={{ background: sky }} aria-hidden="true">
        <motion.svg className="absolute inset-0 h-full w-full" style={{ opacity: stars }} preserveAspectRatio="none">
          {STARS.map((s, i) => (
            <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="#fff" opacity={s.o} />
          ))}
        </motion.svg>
        {!live && (
          <div
            className="absolute inset-0 bg-brand/30"
            style={{
              maskImage: "url(/hero/contours.svg)",
              WebkitMaskImage: "url(/hero/contours.svg)",
              maskSize: "cover",
              WebkitMaskSize: "cover",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          />
        )}
        {live && (
          <div className={`absolute inset-0 transition-opacity duration-[1500ms] ${ready ? "opacity-100" : "opacity-0"}`}>
            <DawnScene scroll={scroll} onReady={onReady} />
          </div>
        )}
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: scrim }} />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-20 h-24 sm:h-28"
        style={{ background: topScrim }}
        aria-hidden="true"
      />

      <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between px-6 sm:h-20 sm:px-10 lg:px-16">
        <Link href="/" aria-label={brand.fullName} className="relative block h-8 w-[122px] sm:h-9 sm:w-[137px]">
          <motion.img
            src="/brand/logo-i3geo-wordmark-negativo.svg"
            alt={brand.name}
            className="absolute inset-0 h-full w-auto"
            style={{ opacity: nightLogo }}
          />
          <motion.img
            src="/brand/logo-i3geo-wordmark.svg"
            alt=""
            className="absolute inset-0 h-full w-auto"
            style={{ opacity: dayLogo }}
          />
        </Link>
        <nav className="flex items-center gap-5">
          <motion.span style={{ color: navInk }} className="hidden text-sm font-medium sm:inline">
            <Link href="/" className="opacity-75 transition-opacity hover:opacity-100">
              Ver o site
            </Link>
          </motion.span>
          <motion.span style={{ backgroundColor: ctaBg, color: ctaInk }} className="inline-block">
            <Link href="/#contato" className="block px-4 py-2 text-sm font-semibold">
              Fale conosco
            </Link>
          </motion.span>
        </nav>
      </header>

      <main className="relative z-10">
        <section className="relative flex h-screen flex-col justify-end px-6 pb-[18vh] text-white sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.2 }}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/60"
          >
            <span className="block size-1.5 rotate-45 bg-orange" />
            {brand.fullName}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-4xl text-[3.1rem] font-bold leading-[0.95] tracking-[-0.03em] sm:text-7xl lg:text-[7rem]"
          >
            Enxergar o território
            <br />
            <span className="text-[#A9E3F0]">como ele é.</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex max-w-xl flex-col gap-6"
          >
            <p className="text-base leading-relaxed text-white/70 sm:text-lg">
              Topografia, georreferenciamento e meio ambiente para decisões seguras sobre a terra.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="/#contato"
                className="bg-orange px-5 py-3 text-sm font-bold text-graphite transition-colors hover:bg-white"
              >
                Solicitar orçamento
              </Link>
              <a href="#amanhecer" className="text-sm font-semibold text-white/70 transition-colors hover:text-white">
                Role para amanhecer ↓
              </a>
            </div>
          </motion.div>
        </section>

        <section id="amanhecer" className="relative flex h-screen items-center justify-center px-6 text-center">
          <motion.div {...rise} className="max-w-3xl">
            <motion.h2 style={{ color: interludeInk }} className="text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
              Quando a luz chega, o relevo aparece.
            </motion.h2>
            <motion.p style={{ color: interludeText }} className="mx-auto mt-6 max-w-lg text-base leading-relaxed sm:text-lg">
              Cada sombra é uma encosta, cada curva é uma cota. É isso que a i3Geo mede, ponto a ponto, para você decidir
              com clareza.
            </motion.p>
          </motion.div>
        </section>

        <Chapter
          className="h-[110vh]"
          index="01"
          label="Topografia"
          title="Cada metro, medido."
          text="Levantamentos planialtimétricos que transformam o relevo em cotas, perfis e curvas de nível para projetar com segurança."
          data={[`Curvas a cada ${facts.contourInterval} m`, `Recorte de ${fmt.km(facts.extentKm[0])} × ${fmt.km(facts.extentKm[1])}`]}
        />
        <Chapter
          className="h-[120vh]"
          index="02"
          label="Georreferenciamento"
          title="Limites que não deixam dúvida."
          text="Vértices medidos em SIRGAS 2000, perímetro fechado e área calculada para matrícula, cartório e certificação no INCRA."
          data={[`${facts.vertices} vértices`, `Área ${fmt.ha(facts.areaHa)}`, facts.datum]}
        />
        <Chapter
          className="h-[120vh]"
          index="03"
          label="Meio Ambiente"
          title="Onde a água passa, a decisão muda."
          text="Rede de drenagem, APP e reserva legal mapeadas sobre o mesmo dado, para licenciar e planejar com responsabilidade."
          data={[`APP ${facts.appWidthM} m · ${fmt.ha(facts.appHa)}`, `Reserva legal ${fmt.ha(facts.reserveHa)} (${fmt.pct(facts.reservePct)})`]}
        />

        <section className="relative flex h-screen flex-col items-center justify-end px-6 pb-14 text-center sm:pb-20">
          <motion.div {...rise} className="flex flex-col items-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-graphite/60">{brand.tagline}</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.02] tracking-tight text-brand sm:text-6xl lg:text-7xl">
              Precisão territorial.
              <br />
              <span className="text-graphite">Inteligência ambiental.</span>
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/#contato"
                className="bg-orange px-7 py-4 text-base font-bold text-graphite transition-colors hover:bg-brand hover:text-white"
              >
                Vamos medir o seu território
              </Link>
              <Link
                href="/"
                className="border border-brand/25 px-7 py-4 text-base font-semibold text-brand transition-colors hover:border-brand"
              >
                Conhecer a i3Geo
              </Link>
            </div>
            <p className="mt-10 text-[10px] text-graphite/45">
              Conceito i3Geo · Imóvel ilustrativo · Relevo: AWS Terrain Tiles (SRTM)
            </p>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
