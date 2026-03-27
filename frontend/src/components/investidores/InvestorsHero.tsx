"use client";

import React from "react";
import { motion } from "framer-motion";

export function InvestorsHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden bg-[#F8F1E3]">
      <div className="absolute inset-0 z-0">
        <img
          alt="Prestigious metropolitan skyscraper architecture"
          className="w-full h-full object-cover transition-all duration-700"
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=3000&auto=format&fit=crop"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F1E3] via-[#F8F1E3]/85 to-transparent"></div>
      </div>

      <div className="relative z-10 px-6 md:px-24 md:ml-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="h-[2px] w-12 bg-primary"></div>
          <span className="font-sans text-primary text-[10px] tracking-[0.4em] uppercase font-bold">Private Equity & Real Estate</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-4xl md:text-8xl font-black text-[#0F172A] leading-[0.9] mb-12 uppercase tracking-tighter"
        >
          Investidores &<br />
          <span className="text-primary italic font-light lowercase">Parcerias</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans text-[#0F172A]/70 text-lg md:text-xl max-w-2xl leading-relaxed tracking-wide font-medium border-l-2 border-primary/20 pl-10"
        >
          Estruturamos parcerias patrimoniais e imobiliárias com visão de longo prazo e segurança jurídica, focadas na preservação e expansão de capital institucional e privado.
        </motion.p>
      </div>
    </section>
  );
}
