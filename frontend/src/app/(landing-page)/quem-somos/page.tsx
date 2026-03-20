"use client";

import React from "react";
import { motion } from "framer-motion";
import { InstitutionalHero } from "@/components/quem-somos/InstitutionalHero";
import { MissionAndPublic } from "@/components/quem-somos/MissionAndPublic";
import { Georeferencing } from "@/components/quem-somos/Georeferencing";
import { Leadership } from "@/components/quem-somos/Leadership";
import { GoldButton } from "@/components/ui/gold-button";

export default function QuemSomos() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Section 1: Hero Institucional */}
      <InstitutionalHero />

      {/* Section 2: Missão e Público */}
      <MissionAndPublic />

      {/* Section 4: Liderança Estratégica */}
      <Leadership />

      {/* CTA Section */}
      <section className="py-24 px-6 bg-surface-container-lowest relative overflow-hidden">
        {/* Subtle decorative background element */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(201,161,74,0.1),transparent_70%)]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="font-headline text-3xl md:text-5xl text-on-surface mb-8 tracking-tight">Interessado em nossa visão?</h2>
          <p className="font-body text-on-surface-variant mb-12 max-w-xl mx-auto text-lg leading-relaxed">
            Explore as oportunidades de investimento e parceria com o Grupo Patrimonial.
          </p>
          <div className="flex justify-center">
            <GoldButton className="px-12 py-5 text-sm font-bold uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all">
              Fale com um Especialista
            </GoldButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
