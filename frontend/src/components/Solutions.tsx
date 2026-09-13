"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const brands = [
  {
    number: "01",
    name: "Rendal",
    role: "Incorporação",
    statement: "A origem do empreendimento.",
    description:
      "Identifica oportunidades e estrutura produto, capital, aprovações e estratégia para transformar potencial em negócio imobiliário.",
    capabilities: ["Viabilidade", "Estruturação", "Desenvolvimento"],
    logo: "/brands/rendal-logo.png",
    href: "/incorporadora",
    panelClass: "bg-[#F3EEE4] text-[#1F1F1F]",
    mutedClass: "text-[#1F1F1F]/55",
  },
  {
    number: "02",
    name: "DCorp",
    role: "Engenharia",
    statement: "Da decisão à execução.",
    description:
      "Converte a estratégia em engenharia, coordenando projetos, soluções técnicas e obra com precisão em cada etapa.",
    capabilities: ["Projeto", "Técnica", "Execução"],
    logo: "/brands/dcorp-logo.png",
    href: "/engenharia",
    panelClass: "bg-[#E4DDD0] text-[#1F1F1F]",
    mutedClass: "text-[#1F1F1F]/55",
  },
];

export function Solutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.82], ["-102%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.82], ["102%", "0%"]);
  const contentOpacity = useTransform(scrollYProgress, [0.35, 0.72], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="projetos"
      className="relative z-[60] -mt-6 scroll-mt-24 overflow-clip rounded-t-[40px] bg-[#171717] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] md:-mt-10 md:h-[170vh] md:rounded-t-[60px]"
    >
      {/* Mobile: the same story, stacked and immediately usable. */}
      <div className="px-4 py-20 md:hidden">
        <div className="mb-12 px-2 text-white">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-primary">
              Duas marcas, uma entrega
            </span>
          </div>
          <h2 className="max-w-[10ch] font-serif text-4xl leading-[1.05] tracking-tight">
            Do negócio à obra.
          </h2>
        </div>

        <div className="space-y-3">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, x: index === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={brand.href}
                className={`group relative flex min-h-[31rem] flex-col overflow-hidden rounded-[28px] p-7 ${brand.panelClass}`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-primary">
                    {brand.number} — {brand.role}
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>

                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={1016}
                  height={813}
                  className="mt-10 h-24 w-auto max-w-[15rem] object-contain object-left"
                />

                <div className="mt-auto">
                  <p className="font-serif text-3xl leading-tight">{brand.statement}</p>
                  <p className={`mt-4 text-sm leading-6 ${brand.mutedClass}`}>
                    {brand.description}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-black/10 pt-5">
                    {brand.capabilities.map((capability) => (
                      <span
                        key={capability}
                        className="text-[9px] font-semibold uppercase tracking-[0.18em]"
                      >
                        {capability}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop: the panels close from both sides as the section enters. */}
      <div className="sticky top-0 hidden h-screen overflow-hidden pt-24 md:block">
        <div className="absolute inset-x-0 top-24 flex h-[calc(100vh-6rem)] items-center justify-center text-center text-white">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-primary">
              Um fluxo completo
            </span>
            <p className="mt-5 font-serif text-5xl leading-tight lg:text-7xl">
              Duas marcas.
              <br />
              Uma entrega.
            </p>
          </div>
        </div>

        <div className="relative flex h-[calc(100vh-6rem)] w-full">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              style={{
                x: index === 0 ? leftX : rightX,
                opacity: contentOpacity,
              }}
              className={`group relative min-w-0 flex-1 overflow-hidden transition-[flex-grow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:flex-[1.12] ${brand.panelClass}`}
            >
              <Link
                href={brand.href}
                className="flex h-full flex-col p-10 lg:p-14 xl:p-20"
                aria-label={`Conheça a ${brand.name} — ${brand.role}`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-primary">
                    {brand.number} — {brand.role}
                  </span>
                  <span className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.24em]">
                    Conheça
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </span>
                </div>

                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={1016}
                  height={813}
                  className="mt-10 h-28 w-auto max-w-[19rem] object-contain object-left transition-transform duration-700 ease-out group-hover:scale-[1.04] lg:h-36"
                />

                <div className="mt-auto max-w-xl">
                  <p className="font-serif text-4xl leading-[1.05] tracking-tight lg:text-5xl xl:text-6xl">
                    {brand.statement}
                  </p>
                  <p className={`mt-6 max-w-[42ch] text-sm leading-7 lg:text-base ${brand.mutedClass}`}>
                    {brand.description}
                  </p>

                  <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t border-black/10 pt-6">
                    {brand.capabilities.map((capability) => (
                      <span
                        key={capability}
                        className="text-[9px] font-semibold uppercase tracking-[0.22em] lg:text-[10px]"
                      >
                        {capability}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-700 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
