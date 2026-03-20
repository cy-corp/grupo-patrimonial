"use client";

import React from "react";
import { motion } from "framer-motion";
import { GoldButton } from "@/components/ui/gold-button";

export function InvestorsCTA() {
  return (
    <section className="py-32 px-6 md:px-12 bg-surface-container-highest">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <span className="material-symbols-outlined text-primary text-6xl mb-8" style={{ fontVariationSettings: "'FILL' 1" }}>
          workspace_premium
        </span>
        <h3 className="font-headline text-3xl md:text-5xl text-on-surface mb-8">
          Interessado em estruturar uma parceria?
        </h3>
        <p className="text-on-surface-variant mb-12 text-lg max-w-2xl mx-auto leading-relaxed italic">
          Nossa equipe de Investment Banking entrará em contato para uma análise confidencial de perfil e ativos.
        </p>
        <div className="flex justify-center">
          <GoldButton className="px-12 py-6 font-bold text-sm tracking-[0.2em] uppercase rounded-lg shadow-xl hover:scale-105 transition-all">
            Falar com um Consultor
          </GoldButton>
        </div>
      </motion.div>
    </section>
  );
}
