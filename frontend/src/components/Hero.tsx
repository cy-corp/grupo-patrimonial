"use client";

import React from "react";
import { GoldButton } from "@/components/ui/gold-button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 overflow-hidden bg-surface">
      {/* Background Image Overlay from HTML */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Architectural background"
          className="w-full h-full object-cover grayscale brightness-[0.25]"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHOGhjAPWosOO_TkxO1MqXh8n3K5HG6Y4z3X12g1HFnmW4OGj3ey79MUAL1uviZhVRnpq_GRZcthskaYQ9tlAlDcHmpySWlxWetSkfwfnAKbkKyLoQHlyGFf6QI4zj0xzam8zpGbTe-jfVttdg7t617yaWRSpllVUKJQxT_UXV80fXrcrwkBfXp3wZVfu6mSog-dLIvMTVV6ru6SYelgGo1R54YmYTvT28LaGpUCFvAFMX54G6Xqq2srsI_3tN7b3bdiKjUAiES5tN"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/60 via-surface/30 to-transparent"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-5xl"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-[2px] bg-primary-dim"></div>
          <span className="font-label text-xs tracking-[0.2em] uppercase text-on-surface-variant">Excelência consolidada</span>
        </div>

        <h1 className="font-headline text-4xl md:text-7xl leading-tight text-on-surface mb-8">
          Engenharia, Incorporação, <br className="hidden md:block" />
          Construção, Imobiliária e <br className="hidden md:block" />
          Gestão Patrimonial
        </h1>

        <p className="font-headline text-lg md:text-xl text-primary-dim mb-6 max-w-2xl">
          Soluções completas para desenvolver, proteger, valorizar e perpetuar patrimônios imobiliários.
        </p>

        <p className="font-body text-on-surface-variant text-sm tracking-[0.05em] leading-relaxed mb-12 max-w-xl">
          Atuamos de forma integrada desde a origem do ativo (terra ou imóvel), passando pelo desenvolvimento técnico e construtivo, até a gestão patrimonial e comercialização estratégica.
        </p>

        <div className="flex flex-wrap gap-6">
          <GoldButton className="px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-3 active:scale-95 transition-all">
            Fale com um especialista
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </GoldButton>
          <button className="border border-outline-variant/20 text-on-surface px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] hover:bg-primary/10 hover:border-primary/50 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer">
            Solicite uma análise
          </button>
        </div>
      </motion.div>

      {/* Static Scroll Indicator from HTML style */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 opacity-50">
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
        <span className="font-label text-[10px] tracking-[0.3em] uppercase text-primary font-bold">Desça</span>
      </div>
    </section>
  );
}
