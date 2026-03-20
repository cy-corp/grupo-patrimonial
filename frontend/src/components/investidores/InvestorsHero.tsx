"use client";

import React from "react";
import { motion } from "framer-motion";
import { GoldButton } from "@/components/ui/gold-button";

export function InvestorsHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center px-6 md:px-12 overflow-hidden bg-surface">
      <div className="absolute inset-0 z-0">
        <img
          alt="Monolithic skyscraper architecture in dramatic low light"
          className="w-full h-full object-cover opacity-25 grayscale brightness-[1.6]"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeqdsLOOfmjOONOKUAEYy_tandQeYopNUCtb1CjG_vTdG1KUTZUuJSFJS-4-216beTcl7M5PTbrnufp1yhQNyzIJbgnid92zV0Odoobmak4ws9kwm4eXPTjBbx_XJx4z0zzKH0LlX6k_TgLZV5EhiurzCUE7Z_mSY-GR6Zv710rOODLxoCvfS9nySWtkkHeDY9nJzHGqw8FsfputjPrLXhOH1PDK4qqaCXhmuoVdaeWxzmowupztkcHOL9FWf4ibxpuyBCaddqMmkR"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-5xl md:ml-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="h-[2px] w-12 bg-primary"></div>
          <span className="font-label text-primary text-sm tracking-[0.3em] uppercase">Private Equity & Real Estate</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-headline text-5xl md:text-8xl font-bold text-on-surface leading-tight mb-8"
        >
          Investidores &<br />
          <span className="text-primary italic">Parcerias</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-body text-xl text-on-surface-variant max-w-2xl leading-relaxed mb-12 tracking-wide"
        >
          Estruturamos parcerias patrimoniais e imobiliárias com visão de longo prazo e segurança jurídica, focadas na preservação e expansão de capital institucional e privado.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <GoldButton className="px-10 py-5 font-bold text-xs tracking-[0.2em] uppercase rounded-lg shadow-2xl hover:scale-[1.05] transition-all">
            Seja um Parceiro Estratégico
          </GoldButton>
          <button className="bg-surface-container-high border border-outline-variant/20 text-on-surface px-10 py-5 font-label text-xs tracking-[0.2em] uppercase rounded-lg hover:bg-surface-bright transition-all">
            Portfólio de Ativos
          </button>
        </motion.div>
      </div>
    </section>
  );
}
