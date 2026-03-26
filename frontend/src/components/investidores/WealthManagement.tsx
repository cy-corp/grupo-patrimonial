"use client";

import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    icon: "monitoring",
    title: "Alpha-Focused Returns",
    description: "Identificamos assimetrias no mercado imobiliário para capturar valor antes da maturação do ciclo."
  },
  {
    icon: "gavel",
    title: "Compliance & Rigor",
    description: "Estruturas fiduciárias robustas e processos de due diligence que garantem a blindagem do capital."
  },
  {
    icon: "diamond",
    title: "Exclusividade",
    description: "Acesso a deals off-market e oportunidades restritas ao ecossistema Grupo Patrimonial."
  }
];

export function WealthManagement() {
  return (
    <section className="relative py-40 px-6 md:px-12 overflow-hidden bg-surface">
      <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block overflow-hidden">
        <motion.img 
          initial={{ scale: 1.2, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          alt="Abstract concrete architectural angles" 
          className="w-full h-full object-cover grayscale" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuARNwDGkEsjn0JDdvEupMnGPfcvVtX0__9AYPSV4d_CsZOlzHblm5mARjtFHJfR3L-StrSrZLfknxxecm2jyfBMzwcTR0xAnzLf2SMNUvDVmx54gBYjM26dieP1OOtYOnyM7VuPwSEramyKiTgOXQ5Eb3wBeAGb7uWwVlH9ojOnIHNKHIen94qUhvHxHiMX5kXZ4ELebYrXU09ELYml8Cy3jJdXC--61NwG7gSCQ2nT2ibvyi9Or968EaSR-n4qylMZCyJkY20ar1gW"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-surface"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="lg:w-1/2">
          <div className="mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-1 h-12 bg-primary"></div>
              <h2 className="font-headline text-3xl md:text-5xl text-on-surface">Wealth Management & Appreciation</h2>
            </motion.div>
            <p className="font-body text-on-surface-variant text-lg leading-relaxed tracking-wide">
              Nossa gestão transcende a simples administração. Aplicamos inteligência de mercado e análise preditiva para garantir retornos superiores ajustados ao risco.
            </p>
          </div>
          
          <div className="space-y-12">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-8 group"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-surface-container-highest/60 backdrop-blur-xl border border-outline-variant/20 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <span className="material-symbols-outlined text-primary text-2xl">{feature.icon}</span>
                </div>
                <div>
                  <h4 className="text-on-surface font-label text-sm tracking-[0.2em] uppercase mb-2 group-hover:text-primary transition-colors">{feature.title}</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed max-w-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
