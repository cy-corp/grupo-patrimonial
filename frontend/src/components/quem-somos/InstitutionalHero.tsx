"use client";

import React from "react";
import { motion } from "framer-motion";

export function InstitutionalHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden bg-surface">
      <div className="absolute inset-0 z-0">
        <img
          alt="Modern high-rise architectural building exterior in grayscale"
          className="w-full h-full object-cover opacity-25 grayscale brightness-[0.9]"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkTT1Tt34prZGqrVJ_93OTbaG-Jmex4B3wcT5CNEUyuzEmAdpVkavI2Nb76bqWmxvUW_ZWWqFs6JO7BNfUwEAh7ib-dguD5etqN9dzqr9mfy37JWr_mXlNDFrWPQN0uJsUgHtfwH1FExYLmajI5Oc2Srcbnr6tnMCwylQHRgsfxpmZYODNnrwNLGMZlOoBtxcz1EyeqAUvWUEtqsKkfhIOKPI_gM5AHU1TnKpn7lUjvNgX2uFkaqKdcw3i5Ll2XISaWuou_p-dkGph"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent"></div>
      </div>

      <div className="relative z-10 px-6 md:px-24 md:ml-12 max-w-6xl">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 48 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-[2px] bg-primary mb-8"
        ></motion.div>

        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-headline text-4xl md:text-7xl text-on-surface mb-8 leading-tight tracking-tight"
        >
          Grupo Patrimonial:<br />
          <span className="text-primary italic">Solidez e Visão de Futuro</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-body text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed tracking-wide mb-12"
        >
          Um ecossistema empresarial de alta performance que integra Engenharia, Incorporação, Construção e Inteligência Imobiliária para criar o amanhã.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { id: "01.", label: "Engenharia" },
            { id: "02.", label: "Incorporadora" },
            { id: "03.", label: "Construtora" },
            { id: "04.", label: "Imobiliária" }
          ].map((item, index) => (
            <div key={index} className="p-6 bg-surface-container-low border-l border-primary/20 backdrop-blur-sm hover:border-primary transition-colors cursor-default">
              <span className="text-primary font-headline block mb-2">{item.id}</span>
              <span className="text-[10px] uppercase tracking-widest font-label text-on-surface-variant">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
