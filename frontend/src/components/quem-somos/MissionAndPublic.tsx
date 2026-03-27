"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Users } from "lucide-react";

export function MissionAndPublic() {
  return (
    <section className="py-32 px-6 md:px-24 bg-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none" 
           style={{ backgroundImage: "linear-gradient(45deg, #0F172A 25%, transparent 25%, transparent 50%, #0F172A 50%, #0F172A 75%, transparent 75%, transparent)" }}></div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="md:col-span-5"
        >
          <h2 className="font-heading text-2xl md:text-3xl text-primary mb-12 uppercase tracking-[0.2em] font-black">Nossa Missão</h2>
          <p className="font-heading text-3xl text-[#0F172A] leading-snug italic mb-8 font-light">
            "Transformar imóveis e áreas em ativos sólidos, legais e rentáveis, com visão de longo prazo, segurança jurídica e eficiência técnica."
          </p>
          <div className="h-[1px] w-full bg-primary/20 mb-8"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="md:col-start-7 md:col-span-6 space-y-20"
        >
          <div>
            <h2 className="font-heading text-2xl md:text-3xl text-primary mb-10 uppercase tracking-[0.2em] font-black">A Quem Atendemos</h2>
            <div className="space-y-12">
              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors">
                  <Building2 className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-[#0F172A] font-sans font-bold tracking-wide uppercase text-sm mb-2 group-hover:text-primary transition-colors">Empresas & Investidores</h4>
                  <p className="text-[#0F172A]/60 text-sm leading-relaxed tracking-wide font-sans">Diversificação de portfólio e estruturação de ativos com alta liquidez e segurança jurídica.</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors">
                  <Users className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-[#0F172A] font-sans font-bold tracking-wide uppercase text-sm mb-2 group-hover:text-primary transition-colors">Proprietários & Famílias</h4>
                  <p className="text-[#0F172A]/60 text-sm leading-relaxed tracking-wide font-sans">Organização, crescimento e preservação de legado através de incorporações e gestão estratégica.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
