"use client";

import React from "react";
import { motion } from "framer-motion";
import { useActiveImage } from "@/hooks/useActiveImage";

export function InstitutionalHero() {
  const { imageUrl, altText } = useActiveImage("quem_somos_hero", "/quem-somos/quem-somos-hero.jpg");

  return (
    <section className="relative flex min-h-[100vh] flex-col overflow-hidden bg-[#F8F1E3] md:min-h-[90vh] md:flex-row md:items-center">
      <div className="relative z-0 h-[45vh] w-full overflow-hidden md:absolute md:inset-0 md:h-full">
        <img
          alt={altText || "Arquitetura institucional"}
          className="h-full w-full object-cover"
          src={imageUrl}
        />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#F8F1E3] via-[#F8F1E3]/85 to-transparent md:block" />
      </div>

      <div className="relative z-10 -mt-28 max-w-6xl rounded-t-[3rem] bg-[#F8F1E3] px-6 py-12 md:-mt-0 md:ml-12 md:rounded-none md:bg-transparent md:px-24 md:py-24">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 48 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 w-[2px] bg-primary"
        />

        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 font-display text-4xl leading-[1.08] text-balance text-graphite md:text-6xl"
        >
          Duas empresas, o mesmo critério.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12 max-w-2xl font-sans text-base font-medium leading-relaxed text-pretty text-graphite/70 md:text-xl"
        >
          A Rendal estrutura o empreendimento. A DCorp projeta e constrói. Papéis separados, decisão alinhada.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid max-w-xl grid-cols-2 gap-4"
        >
          {[
            { id: "01.", label: "Rendal — Incorporação" },
            { id: "02.", label: "DCorp — Engenharia" },
          ].map((item) => (
            <div key={item.id} className="border-l border-primary/20 bg-white p-4 md:p-6">
              <span className="mb-1 block font-heading text-sm font-bold text-primary md:mb-2 md:text-base">{item.id}</span>
              <span className="font-sans text-[8px] font-bold uppercase tracking-widest text-graphite/60 md:text-[10px]">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
