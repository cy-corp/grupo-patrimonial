"use client";

import React from "react";
import { motion } from "framer-motion";

export function InstitutionalHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden bg-[#F8F1E3]">
      <div className="absolute inset-0 z-0">
        <img
          alt="Modern prestigious building architecture"
          className="w-full h-full object-cover transition-all duration-700"
          src="https://images.unsplash.com/photo-1757924432508-d4e92411caeb?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F1E3] via-[#F8F1E3]/85 to-transparent"></div>
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
          className="font-heading text-4xl md:text-7xl text-[#0F172A] mb-8 leading-tight tracking-tight uppercase font-black"
        >
          Grupo Patrimonial:<br />
          <span className="text-primary italic font-light lowercase">Solidez e Visão de Futuro</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans text-[#0F172A]/70 text-lg md:text-xl max-w-2xl leading-relaxed tracking-wide mb-12"
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
            <div key={index} className="p-6 bg-white/50 backdrop-blur-sm border-l border-primary/20 hover:border-primary transition-colors cursor-default">
              <span className="text-primary font-heading block mb-2 font-bold">{item.id}</span>
              <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#0F172A]/60">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
