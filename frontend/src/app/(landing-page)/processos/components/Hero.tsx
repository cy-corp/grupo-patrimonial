"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] lg:h-screen w-full flex flex-col lg:flex-row items-center overflow-hidden bg-[#F8F1E3]">
      {/* BACKGROUND IMAGE - CINEMATIC DESKTOP / EDITORIAL MOBILE */}
      <div className="relative w-full h-[50vh] lg:absolute lg:inset-0 lg:h-full z-0">
        <Image
          src="/processos/processos-hero.jpg"
          alt="Processos e Qualidade"
          fill
          className="object-cover object-center brightness-[0.8] lg:brightness-100"
          priority
        />
        {/* DESKTOP OVERLAY GRADIENT */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#F8F1E3] via-[#F8F1E3]/85 to-transparent z-10" />
      </div>

      {/* CONTENT - EDITORIAL OVERLAP ON MOBILE / OVERLAY ON DESKTOP */}
      <div className="container relative z-20 mx-auto px-6 lg:px-12 -mt-28 lg:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#F8F1E3] lg:bg-transparent rounded-t-[3.5rem] lg:rounded-none px-6 py-12 lg:p-0 max-w-4xl"
        >
          <h1 className="font-heading text-5xl md:text-7xl lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] text-[#0F172A]">
            Processos,<br />
            <span className="text-primary italic font-serif lowercase block my-2 lg:my-3">qualidade</span>
            & Pós-Venda
          </h1>

          <div className="mt-8 lg:mt-12 max-w-xl">
            <p className="text-[#0F172A]/70 text-lg md:text-xl lg:text-2xl leading-relaxed font-sans">
              Transparência, controle e acompanhamento total em cada etapa do seu <span className="text-[#0F172A] font-bold">investimento imobiliário.</span>
            </p>
          </div>

          <div className="mt-12 md:mt-16 flex items-center gap-6">
            <div className="h-[1px] w-24 bg-primary" />
            <div className="text-primary text-[10px] font-bold uppercase tracking-[0.3em]">Padrão Institucional</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
