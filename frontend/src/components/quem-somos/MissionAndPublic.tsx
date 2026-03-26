"use client";

import React from "react";
import { motion } from "framer-motion";

export function MissionAndPublic() {
  return (
    <section className="py-32 px-6 md:px-24 bg-surface-container-low overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="md:col-span-5"
        >
          <h2 className="font-headline text-2xl md:text-3xl text-primary mb-12 uppercase tracking-[0.2em]">Nossa Missão</h2>
          <p className="font-headline text-2xl text-on-surface leading-snug italic mb-8">
            "Transformar imóveis e áreas em ativos sólidos, legais e rentáveis, com visão de longo prazo, segurança jurídica e eficiência técnica."
          </p>
          <div className="h-[1px] w-full bg-outline-variant/30 mb-8"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="md:col-start-7 md:col-span-6 space-y-20"
        >
          <div>
            <h2 className="font-headline text-2xl md:text-3xl text-primary mb-10 uppercase tracking-[0.2em]">A Quem Atendemos</h2>
            <div className="space-y-12">
              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-primary text-3xl">corporate_fare</span>
                </div>
                <div>
                  <h4 className="text-on-surface font-semibold tracking-wide uppercase text-sm mb-2 group-hover:text-primary transition-colors">Empresas & Investidores</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed tracking-wide">Diversificação de portfólio e estruturação de ativos com alta liquidez e segurança jurídica.</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-primary text-3xl">family_restroom</span>
                </div>
                <div>
                  <h4 className="text-on-surface font-semibold tracking-wide uppercase text-sm mb-2 group-hover:text-primary transition-colors">Proprietários & Famílias</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed tracking-wide">Organização, crescimento e preservação de legado através de incorporações e gestão estratégica.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
