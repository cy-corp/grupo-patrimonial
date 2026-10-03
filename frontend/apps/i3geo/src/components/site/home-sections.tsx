"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { coverage, pillars, services, situations } from "@/lib/content";
import { ServiceDiagram } from "./service-diagram";

const shell = "mx-auto max-w-7xl px-6 sm:px-10 lg:px-16";
const h2 = "text-balance text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl";

export function Services() {
  return (
    <section id="servicos" className="py-24 sm:py-32">
      <div className={`${shell} grid gap-14 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2 className={`${h2} text-brand`}>O que fazemos</h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-graphite/80">
              Você não contrata apenas topografia. Contrata confiança, segurança jurídica e valorização do seu
              patrimônio.
            </p>
            <Link
              href="/servicos"
              className="mt-8 inline-block border-b-2 border-orange pb-1 text-sm font-semibold text-brand transition-colors hover:text-graphite"
            >
              Ver os serviços em detalhe
            </Link>
          </div>
        </div>
        <ul className="lg:col-span-7">
          {services.map((service) => (
            <li key={service.id} className="grid gap-5 border-t border-brand/15 py-9 sm:grid-cols-[7.5rem_1fr] sm:gap-8">
              <ServiceDiagram id={service.id} className="w-28 sm:w-full" />
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-graphite sm:text-3xl">{service.title}</h3>
                <p className="mt-3 max-w-[60ch] leading-relaxed text-graphite/80">{service.text}</p>
                <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-brand">
                  <span className="font-semibold">Quando você precisa:</span> {service.when}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Situations() {
  return (
    <section className="border-t border-brand/15 py-24 sm:py-32">
      <div className={shell}>
        <h2 className={`${h2} max-w-3xl text-graphite`}>
          Nem sempre a necessidade de um levantamento aparece de forma óbvia.
        </h2>
        <ul className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-6">
          {situations.map((item, i) => (
            <li key={item.title} className={i < 3 ? "lg:col-span-2" : "lg:col-span-3"}>
              <span className="block h-0.5 w-10 bg-orange" />
              <h3 className="mt-5 text-xl font-bold leading-snug tracking-tight text-brand sm:text-2xl">{item.title}</h3>
              <p className="mt-3 max-w-[48ch] leading-relaxed text-graphite/80">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

const RINGS = [50, 100, 150, 200];

export function Coverage() {
  return (
    <section className="overflow-hidden bg-brand py-24 text-white sm:py-32">
      <div className={`${shell} grid items-center gap-16 lg:grid-cols-2`}>
        <div>
          <h2 className={h2}>
            {coverage.states.join(" e ")}, em um raio de até {coverage.radiusKm} km.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">
            Equipe técnica especializada e rapidez no atendimento em toda a região.
          </p>
          <dl className="mt-12 grid grid-cols-[1.7fr_1fr_1fr] gap-6 border-t border-white/25 pt-8">
            {[
              { value: <Count to={coverage.radiusKm} suffix=" km" />, label: "Raio de atendimento" },
              { value: <Count to={coverage.states.length} />, label: "Estados: MG e SP" },
              { value: <Count to={services.length} />, label: "Serviços técnicos" },
            ].map((stat) => (
              <div key={stat.label}>
                <dd className="whitespace-nowrap text-3xl font-bold tracking-tight sm:text-5xl">{stat.value}</dd>
                <dt className="mt-2 text-sm leading-snug text-white/75">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden="true">
          <svg viewBox="-110 -110 220 220" className="size-full" fill="none">
            {RINGS.map((km, i) => (
              <motion.circle
                key={km}
                r={km / 2}
                className="stroke-white/35"
                strokeWidth={0.5}
                strokeDasharray={km === coverage.radiusKm ? undefined : "2 3"}
                initial={{ scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.2, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
            <path d="M-104 0 H104 M0 -104 V104" className="stroke-white/20" strokeWidth={0.4} />
            {RINGS.map((km) => (
              <text key={km} x={3} y={-km / 2 + 7} className="fill-white/70 text-[5px] font-semibold">
                {km} km
              </text>
            ))}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 9, ease: "linear", repeat: Infinity }}
              style={{ originX: "0px", originY: "0px" }}
            >
              <path d="M0 0 L100 0 A100 100 0 0 0 86.6 -50 Z" className="fill-white/10" />
              <path d="M0 0 L100 0" className="stroke-orange" strokeWidth={0.8} />
            </motion.g>
            <circle r={3} className="fill-orange" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export function Pillars() {
  return (
    <section className="bg-[#03121A] py-24 text-white sm:py-32">
      <div className={`${shell} grid gap-14 lg:grid-cols-12`}>
        <div className="lg:col-span-4">
          <p className="text-[9rem] font-bold leading-none tracking-tight text-[#A9E3F0] sm:text-[12rem]">
            i<sup className="text-[0.5em] text-orange">3</sup>
          </p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Três pilares, multiplicados pela força do indivíduo.</h2>
        </div>
        <div className="lg:col-span-8">
          <ul className="grid gap-10 sm:grid-cols-3">
            {pillars.map((pillar) => (
              <li key={pillar.title} className="border-t border-white/25 pt-6">
                <h3 className="text-xl font-bold tracking-tight">{pillar.title}</h3>
                <p className="mt-3 leading-relaxed text-white/75">{pillar.short}</p>
              </li>
            ))}
          </ul>
          <Link
            href="/sobre"
            className="mt-12 inline-block border-b-2 border-orange pb-1 text-sm font-semibold text-white transition-colors hover:text-[#A9E3F0]"
          >
            Conheça o padrão i3Geo
          </Link>
        </div>
      </div>
    </section>
  );
}
