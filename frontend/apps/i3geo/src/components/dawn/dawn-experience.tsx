"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { brand, colors } from "@/lib/brand";
import { ramp } from "../hero/beats";
import { QuoteExperience } from "../site/quote-experience";
import { Coverage, Diagnosis, Field, Process, Stats } from "../site/home-sections";
import { MobileMenu } from "../site/mobile-menu";
import { SiteFooter, nav } from "../site/site-chrome";
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

function mixHex(a: string, b: string, t: number) {
  const p = (h: string, i: number) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
  const c = [0, 1, 2].map((i) => Math.round(p(a, i) + (p(b, i) - p(a, i)) * t));
  return `rgb(${c.join(",")})`;
}

function Chapter({
  title,
  text,
  data,
  className,
}: {
  title: string;
  text: string;
  data: string[];
  className: string;
}) {
  return (
    <section className={`relative flex items-start sm:items-center ${className}`}>
      <div className="px-4 pt-[16vh] sm:px-10 sm:pt-0 lg:px-16">
        <div className="max-w-xl bg-[#F6F4EF]/85 p-5 backdrop-blur-sm sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
          <h2 className="text-balance text-[1.7rem] font-bold leading-[1.05] tracking-tight text-brand sm:text-5xl lg:text-6xl">{title}</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-graphite/80 sm:text-lg">{text}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {data.map((d) => (
              <li
                key={d}
                className="border border-brand/15 bg-white px-3 py-1.5 text-xs font-semibold text-brand tabular-nums"
              >
                {d}
              </li>
            ))}
          </ul>
        </div>
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
  const { scrollY, scrollYProgress } = useScroll();
  const scroll = useTransform(scrollY, (y) => y / (typeof window === "undefined" ? 1 : window.innerHeight || 1));
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
    return css(s.top, 1);
  });
  const stars = useTransform(day, (d) => 1 - ramp(d, 0.02, 0.32));
  const nightLogo = useTransform(day, (d) => 1 - ramp(d, 0.35, 0.6));
  const dayLogo = useTransform(day, (d) => ramp(d, 0.35, 0.6));
  const ctaBg = useTransform(day, (d) => mixHex("#FFFFFF", colors.petroleum, ramp(d, 0.35, 0.6)));
  const interludeInk = useTransform(day, (d) => mixHex("#FFFFFF", colors.petroleum, ramp(d, 0.4, 0.62)));
  const interludeText = useTransform(day, (d) => mixHex("#D5E3E7", colors.graphite, ramp(d, 0.4, 0.62)));
  const ctaInk = useTransform(day, (d) => mixHex(colors.petroleum, "#FFFFFF", ramp(d, 0.35, 0.6)));

  return (
    <div className="relative [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-orange" style={{ backgroundColor: PAPER }}>
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
      {/* Barra do cabeçalho: cor do céu, régua de coordenadas e progresso da página. */}
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-20 h-16 sm:h-20"
        style={{ backgroundColor: topScrim, color: ctaBg }}
        aria-hidden="true"
      >
        <span className="header-ruler absolute inset-x-0 bottom-0 block h-2 opacity-45" />
        <motion.span className="absolute inset-x-0 bottom-0 block h-0.5 origin-left bg-orange" style={{ scaleX: scrollYProgress }} />
      </motion.div>

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
        <nav aria-label="Principal" className="flex items-center gap-3 sm:gap-6">
          {nav.map((item) => (
            <motion.span key={item.href} style={{ color: ctaBg }} className="hidden text-sm font-medium sm:inline">
              <Link href={item.href} className="opacity-85 transition-opacity hover:opacity-100">
                {item.label}
              </Link>
            </motion.span>
          ))}
          <motion.span style={{ backgroundColor: ctaBg, color: ctaInk }} className="inline-block">
            <Link href="#contato" className="block px-4 py-2 text-sm font-semibold">
              <span className="sm:hidden">Orçamento</span>
              <span className="hidden sm:inline">Solicitar orçamento</span>
            </Link>
          </motion.span>
          <motion.span style={{ color: ctaBg }} className="flex sm:hidden">
            <MobileMenu />
          </motion.span>
        </nav>
      </header>

      <main className="relative z-10">
        <section className="relative flex h-screen flex-col justify-end px-6 pb-[18vh] text-white sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(3rem,6.2vw,6rem)] font-bold leading-[0.95] tracking-[-0.03em]"
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
              Levantamento topográfico, georreferenciamento de imóveis rurais e estudos ambientais.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="#contato"
                className="bg-orange px-5 py-3 text-sm font-bold text-graphite transition-colors hover:bg-white"
              >
                Solicitar orçamento
              </Link>
              <a href="#amanhecer" className="text-sm font-semibold text-white/70 transition-colors hover:text-white">
                Veja como trabalhamos
              </a>
            </div>
          </motion.div>
        </section>

        <section id="amanhecer" className="relative flex h-screen items-center justify-center px-6 text-center">
          <div className="max-w-3xl">
            <motion.h2 style={{ color: interludeInk }} className="text-balance text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
              Do levantamento em campo ao documento entregue.
            </motion.h2>
            <motion.p style={{ color: interludeText }} className="mx-auto mt-6 max-w-lg text-base leading-relaxed sm:text-lg">
              A i3Geo atua em três frentes: topografia, georreferenciamento e meio ambiente. A seguir, o que
              entregamos em cada uma.
            </motion.p>
            {/* Falta prova real da empresa aqui (anos de atuação, hectares levantados, CREA e INCRA). */}
          </div>
        </section>

        <Chapter
          className="h-[110vh]"
          title="Levantamento topográfico"
          text="Medimos o terreno em campo e entregamos a planta com curvas de nível, cotas e perfis, pronta para projeto de engenharia, loteamento ou obra."
          data={["Planta planialtimétrica", "Curvas de nível", "Perfis e cotas"]}
        />
        <Chapter
          className="h-[120vh]"
          title="Georreferenciamento de imóveis rurais"
          text="Medimos os vértices da divisa, fechamos o perímetro e calculamos a área, no padrão exigido para o registro em cartório e a certificação no INCRA."
          data={["Planta georreferenciada", "Memorial descritivo", "Certificação no INCRA"]}
        />
        <Chapter
          className="h-[120vh]"
          title="Regularização ambiental"
          text="Mapeamos as áreas de preservação permanente e a reserva legal sobre o mesmo levantamento, base para a regularização e o licenciamento ambiental do imóvel."
          data={["APP", "Reserva legal", "Licenciamento ambiental"]}
        />

        {/* O fecho segura meia tela de rolagem a mais, para o pin não passar direto. */}
        <section className="relative h-[150vh]">
          <div className="sticky top-0 flex h-screen flex-col items-center justify-end px-6 pb-14 text-center sm:pb-20">
            <h2 className="max-w-4xl text-4xl font-bold leading-[1.02] tracking-tight text-brand sm:text-6xl lg:text-7xl">
              Precisão territorial.
              <br />
              <span className="text-graphite">Inteligência ambiental.</span>
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="#contato"
                className="bg-orange px-7 py-4 text-base font-bold text-graphite transition-colors hover:bg-brand hover:text-white"
              >
                Solicitar orçamento
              </Link>
            </div>
            <p className="mt-10 text-[11px] text-graphite/70">
              Imóvel ilustrativo · Fonte do relevo: SRTM (NASA), via Terrain Tiles
            </p>
          </div>
        </section>
        <div className="relative bg-[#F6F4EF]">
          <Stats />
          <Diagnosis />
          <Process />
          <Field />
          <Coverage />
          <QuoteExperience />
          <SiteFooter />
        </div>
      </main>
    </div>
  );
}
