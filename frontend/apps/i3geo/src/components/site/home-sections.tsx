"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { coverage, diagnosis, processSteps, services, stats } from "@/lib/content";
import fotoEstacao from "@/assets/fotos/campo-estacao-total.jpg";
import fotoGnss from "@/assets/fotos/campo-gnss.jpg";
import fotoReceptor from "@/assets/fotos/campo-receptor.jpg";
import { ServiceDiagram } from "./service-diagram";

const shell = "mx-auto max-w-7xl px-6 sm:px-10 lg:px-16";
const h2 = "text-balance text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl";
const ease = [0.22, 1, 0.36, 1] as const;
const integer = new Intl.NumberFormat("pt-BR");

function Count({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, { duration: 1.8, ease, onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {integer.format(value)}
      {suffix}
    </span>
  );
}

const PROFILE =
  "M0 300 C60 300 90 150 150 150 S260 262 300 252 S390 84 450 84 S560 226 600 214 S690 170 750 170 S860 284 900 274 S990 44 1050 44 S1150 244 1200 232";
const PEAKS = [
  [150, 150],
  [450, 84],
  [750, 170],
  [1050, 44],
] as const;

// Os números ficam cravados nos picos de um perfil de terreno, como cotas.
export function Stats() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "center 0.5"] });
  const drawn = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="overflow-hidden pt-24 sm:pt-32">
      <div className={shell}>
        <h2 className={`${h2} max-w-3xl text-brand`}>A i3Geo em números.</h2>
        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="lg:text-center">
              <dd className="whitespace-nowrap text-[clamp(1.25rem,6.4vw,2.25rem)] font-bold tracking-tight text-graphite sm:text-5xl">
                <Count to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </dd>
              <dt className="mt-2 text-sm leading-snug text-graphite/75 sm:text-base">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
      <svg viewBox="0 0 1200 320" preserveAspectRatio="none" className="mt-6 block h-40 w-full sm:h-64" fill="none" aria-hidden="true">
        <path d={`${PROFILE} V320 H0 Z`} className="fill-brand/[0.07]" />
        {[40, 80, 120].map((dy) => (
          <path key={dy} d={PROFILE} transform={`translate(0 ${dy})`} className="stroke-brand/15" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        ))}
        <motion.path d={PROFILE} style={{ pathLength: drawn }} className="stroke-brand" strokeWidth={2} vectorEffect="non-scaling-stroke" />
        {PEAKS.map(([x, y]) => (
          <g key={x}>
            <path d={`M${x} 0 V${y}`} className="stroke-orange" strokeWidth={1} strokeDasharray="4 5" vectorEffect="non-scaling-stroke" />
            <ellipse cx={x} cy={y} rx={5} ry={7} className="fill-orange" />
          </g>
        ))}
      </svg>
    </section>
  );
}

// O cliente escolhe a situação e a página responde com o serviço e o desenho dele.
export function Diagnosis() {
  const [active, setActive] = useState(0);
  const item = diagnosis[active];
  const service = services.find((s) => s.id === item.service)!;

  return (
    <section id="servicos" className="bg-white py-24 sm:py-32">
      <div className={`${shell} grid gap-12 lg:grid-cols-12`}>
        <div className="min-w-0 lg:col-span-6">
          <h2 className={`${h2} text-graphite`}>Qual é a sua situação?</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-graphite/80">
            Nem sempre a necessidade de um levantamento aparece de forma óbvia. Escolha o que mais se parece com o seu
            caso.
          </p>
          <ul className="mt-10" role="tablist" aria-label="Situações">
            {diagnosis.map((d, i) => (
              <li key={d.title}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`group flex w-full items-center gap-4 border-t border-brand/15 py-5 text-left text-lg font-semibold tracking-tight transition-colors sm:text-xl ${
                    i === active ? "text-brand" : "text-graphite/65 hover:text-graphite"
                  }`}
                >
                  <span
                    className={`block h-0.5 shrink-0 bg-orange transition-all duration-500 ${i === active ? "w-10" : "w-3 opacity-40"}`}
                  />
                  {d.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 lg:col-span-6">
          <div className="rounded-3xl border border-brand/15 bg-[#F6F4EF] p-6 sm:p-10 lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease }}
              >
                <ServiceDiagram id={service.id} className="mx-auto w-full max-w-xs" />
                <p className="mt-6 text-sm font-semibold text-orange">O que resolve</p>
                <h3 className="mt-1 break-words text-[clamp(1.2rem,5.6vw,1.875rem)] font-bold tracking-tight text-brand sm:text-4xl">{service.title}</h3>
                <p className="mt-4 leading-relaxed text-graphite/85">{item.text}</p>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <a
                    href="#contato"
                    onClick={() => window.dispatchEvent(new CustomEvent("i3geo:service", { detail: service.id }))}
                    className="bg-brand rounded-full px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-graphite"
                  >
                    Pedir orçamento deste serviço
                  </a>
                  <Link
                    href={`/servicos#${service.id}`}
                    className="border-b-2 border-orange pb-0.5 text-sm font-semibold text-brand transition-colors hover:text-graphite"
                  >
                    Entender o serviço
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

const ROUTE = "M30 118 L330 46 L630 126 L930 40 L1170 96";
const STATIONS = [
  [30, 118],
  [330, 46],
  [630, 126],
  [930, 40],
] as const;

// As etapas do trabalho como uma poligonal de campo, traçada conforme a rolagem.
export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.75"] });
  const drawn = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="py-24 sm:py-32">
      <div className={shell}>
        <h2 className={`${h2} max-w-3xl text-brand`}>Do primeiro contato à entrega.</h2>
        <svg viewBox="0 0 1200 160" className="mt-14 hidden w-full lg:block" fill="none" aria-hidden="true">
          <path d={ROUTE} className="stroke-brand/15" strokeWidth={2} strokeDasharray="6 8" />
          <motion.path d={ROUTE} style={{ pathLength: drawn }} className="stroke-orange" strokeWidth={2.5} strokeLinejoin="round" />
          {STATIONS.map(([x, y], i) => (
            <g key={x}>
              <circle cx={x} cy={y} r={9} className="fill-[#F6F4EF] stroke-brand" strokeWidth={2} />
              <circle cx={x} cy={y} r={3} className="fill-brand" />
              <text x={x + 16} y={y - 12} className="fill-brand text-[13px] font-bold">
                {processSteps[i].station}
              </text>
            </g>
          ))}
        </svg>
        <ol className="relative mt-12 grid gap-12 lg:mt-6 lg:grid-cols-4 lg:gap-8">
          {/* No celular a poligonal desce pela esquerda e se traça conforme a rolagem. */}
          <li aria-hidden="true" className="pointer-events-none absolute bottom-3 left-[10px] top-3 w-0.5 lg:hidden">
            <span className="absolute inset-0 border-l-2 border-dashed border-brand/25" />
            <motion.span className="absolute inset-0 origin-top bg-orange" style={{ scaleY: drawn }} />
          </li>
          {processSteps.map((step) => (
            <li key={step.station} className="relative pl-12 lg:pl-0">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 flex size-[22px] items-center justify-center rounded-full border-2 border-brand bg-[#F6F4EF] lg:hidden"
              >
                <span className="block size-2 rounded-full bg-brand" />
              </span>
              <p className="text-sm font-bold text-brand lg:hidden">{step.station}</p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-graphite lg:mt-0 lg:text-2xl">{step.title}</h3>
              <p className="mt-3 max-w-[36ch] leading-relaxed text-graphite/80">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// A foto se revela de cima para baixo. O recorte fica num elemento interno,
// porque um elemento totalmente recortado não dispara a entrada na tela.
function Photo({ src, alt, sizes, className, delay = 0 }: { src: StaticImageData; alt: string; sizes: string; className: string; delay?: number }) {
  return (
    <motion.div initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.25 }} className={`relative overflow-hidden rounded-2xl sm:rounded-3xl ${className}`}>
      <motion.div
        className="absolute inset-0"
        variants={{ hidden: { clipPath: "inset(0 0 100% 0)" }, shown: { clipPath: "inset(0 0 0% 0)" } }}
        transition={{ duration: 1.1, ease, delay }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} quality={70} placeholder="blur" className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

// Fotos de campo. Provisórias, de banco gratuito: ver src/assets/fotos/CREDITOS.md.
// O mosaico é o mesmo em qualquer largura: duas fotos lado a lado, o texto e uma foto larga.
export function Field() {
  return (
    <section className="pb-24 sm:pb-32">
      <div className={`${shell} grid grid-cols-12 gap-2 sm:gap-4`}>
        <Photo
          src={fotoGnss}
          alt="Receptor GNSS sobre tripé em uma área rural"
          sizes="(min-width: 1280px) 670px, 58vw"
          className="col-span-7 aspect-[4/5] sm:aspect-[16/11]"
        />
        <Photo
          src={fotoEstacao}
          alt="Topógrafo operando uma estação total em campo"
          sizes="(min-width: 1280px) 480px, 42vw"
          className="col-span-5"
          delay={0.15}
        />
        <div className="col-span-12 flex flex-col justify-center py-8 lg:col-span-5 lg:py-0 lg:pr-10">
          <h2 className="text-balance text-3xl font-bold leading-[1.05] tracking-tight text-brand sm:text-5xl">
            Não existe uma única maneira de medir todos os terrenos.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-graphite/80">
            Relevo, vegetação, construções, acessos e pontos de referência mudam a forma de trabalhar. A equipe avalia a
            situação, define a metodologia e interpreta os dados coletados.
          </p>
        </div>
        <Photo
          src={fotoReceptor}
          alt="Receptor GNSS instalado sobre um ponto elevado do terreno"
          sizes="(min-width: 1280px) 670px, (min-width: 1024px) 58vw, 100vw"
          className="col-span-12 aspect-[16/9] lg:col-span-7"
        />
      </div>
    </section>
  );
}

const RINGS = [50, 100, 150, 200];

// O raio de atendimento se preenche conforme a rolagem.
export function Coverage() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "center 0.45"] });
  const radius = useTransform(scrollYProgress, [0, 1], [0, coverage.radiusKm / 2]);
  const [km, setKm] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setKm(Math.round((v * coverage.radiusKm) / 10) * 10));

  return (
    <section ref={ref} className="overflow-hidden bg-brand py-24 text-white sm:py-32">
      <div className={`${shell} grid items-center gap-16 lg:grid-cols-2`}>
        <div>
          <h2 className={h2}>
            {coverage.states.join(" e ")}, em um raio de até {coverage.radiusKm} km.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">
            Equipe técnica especializada e rapidez no atendimento em toda a região.
          </p>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden="true">
          <svg viewBox="-110 -110 220 220" className="size-full" fill="none">
            <motion.circle r={radius} className="fill-white/15 stroke-orange" strokeWidth={1.2} />
            {RINGS.map((ring) => (
              <circle
                key={ring}
                r={ring / 2}
                className={ring <= km ? "stroke-white/70" : "stroke-white/25"}
                strokeWidth={0.5}
                strokeDasharray={ring === coverage.radiusKm ? undefined : "2 3"}
              />
            ))}
            <path d="M-104 0 H104 M0 -104 V104" className="stroke-white/20" strokeWidth={0.4} />
            {RINGS.map((ring) => (
              <text
                key={ring}
                x={3}
                y={-ring / 2 + 7}
                className={`text-[5px] font-semibold ${ring <= km ? "fill-white" : "fill-white/45"}`}
              >
                {ring} km
              </text>
            ))}
            <circle r={3} className="fill-orange" />
          </svg>
          <p className="absolute bottom-0 right-0 text-right text-4xl font-bold tabular-nums tracking-tight sm:text-5xl">
            {km} km
          </p>
        </div>
      </div>
    </section>
  );
}
