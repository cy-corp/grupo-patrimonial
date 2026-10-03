"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { pillars } from "@/lib/content";

// Três curvas de nível em volta do pin: cada pilar é uma delas.
const RINGS = [
  "M0 -92 C52 -98 96 -58 98 -4 C100 52 60 96 6 98 C-50 100 -98 62 -98 6 C-98 -48 -54 -88 0 -92 Z",
  "M4 -136 C80 -142 140 -84 142 -6 C144 76 88 140 8 142 C-74 144 -142 90 -142 8 C-142 -70 -76 -130 4 -136 Z",
  "M-4 -182 C100 -190 186 -112 188 -8 C190 100 118 186 10 188 C-98 190 -188 120 -188 12 C-188 -94 -106 -174 -4 -182 Z",
] as const;

const blocks = [
  ...pillars.map((p) => ({ title: p.title, paragraphs: p.long as readonly string[] })),
  {
    title: "O “i”",
    paragraphs: [
      "O mais importante. O “i” representa o indivíduo.",
      "A pessoa que conduz com garra, resiliência e persistência. Que enfrenta desafios técnicos e burocráticos. Que assume responsabilidade pelo que entrega.",
      "Sem o indivíduo, não há excelência.",
    ],
  },
];

function Block({ index, onActive, title, paragraphs }: { index: number; onActive: (i: number) => void; title: string; paragraphs: readonly string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="flex min-h-[70vh] flex-col justify-center py-12">
      <h2 className={`text-4xl font-bold tracking-tight min-[400px]:text-5xl sm:text-7xl ${index === 3 ? "text-orange" : "text-brand"}`}>{title}</h2>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-graphite/85 sm:text-xl">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="max-w-[52ch]">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

export function PillarsOrbit() {
  const [active, setActive] = useState(0);
  const all = active === 3;

  return (
    <section className="bg-[#F6F4EF]">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:px-10 lg:grid-cols-2 lg:px-16">
        <div className="sticky top-16 z-10 -mx-6 bg-[#F6F4EF]/95 px-6 py-4 sm:top-20 lg:top-24 lg:mx-0 lg:h-[calc(100svh-6rem)] lg:bg-transparent lg:px-0 lg:py-0">
          <div className="mx-auto flex h-full max-w-[9rem] items-center lg:max-w-md">
            <svg viewBox="-200 -200 400 400" className="w-full overflow-visible" fill="none" aria-hidden="true">
              {RINGS.map((d, i) => {
                const on = all || active === i;
                return (
                  <g
                    key={i}
                    className="i3-rotate"
                    style={{ "--i3-rotate-duration": `${50 + i * 22}s`, animationDirection: i % 2 ? "reverse" : "normal" } as React.CSSProperties}
                  >
                    <motion.path
                      d={d}
                      initial={{ pathLength: 0 }}
                      animate={{
                        pathLength: 1,
                        stroke: on ? (all ? "#FF6A13" : "#005C74") : "rgba(0,92,116,0.2)",
                        strokeWidth: on ? 3 : 1.2,
                      }}
                      transition={{ pathLength: { duration: 1.6, delay: i * 0.2 }, default: { duration: 0.5 } }}
                    />
                    <motion.circle
                      cx={[98, 142, 188][i]}
                      cy={[-4, -6, -8][i]}
                      r={6}
                      animate={{ fill: on ? "#FF6A13" : "rgba(0,92,116,0.25)", scale: on ? 1 : 0.6 }}
                    />
                  </g>
                );
              })}
              <motion.image
                href="/brand/logo-i3geo-pin.svg"
                x={-46}
                y={-62}
                width={92}
                height={117}
                animate={{ scale: all ? 1.18 : 1 }}
                transition={{ type: "spring", stiffness: 160, damping: 14 }}
              />
            </svg>
          </div>
        </div>
        <div>
          {blocks.map((block, i) => (
            <Block key={block.title} index={i} onActive={setActive} title={block.title} paragraphs={block.paragraphs} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Equation() {
  return (
    <section className="bg-[#03121A] py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <p className="flex flex-wrap items-baseline gap-x-5 gap-y-2 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          {pillars.map((pillar, i) => (
            <motion.span
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.7, delay: i * 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-baseline gap-x-5"
            >
              {pillar.title}
              <span className="text-orange">×</span>
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 180, damping: 12 }}
            className="text-[#A9E3F0]"
          >
            o indivíduo.
          </motion.span>
        </p>
        <p className="mt-10 max-w-2xl text-xl leading-relaxed text-white/80">
          Não buscamos apenas executar serviços. Buscamos construir confiança, segurança jurídica e valorização
          patrimonial.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/orcamento" className="bg-orange px-7 py-4 text-base font-bold text-graphite transition-colors hover:bg-white">
            Solicitar orçamento
          </Link>
          <Link href="/servicos" className="border border-white/30 px-7 py-4 text-base font-semibold transition-colors hover:border-white">
            Ver serviços
          </Link>
        </div>
      </div>
    </section>
  );
}
