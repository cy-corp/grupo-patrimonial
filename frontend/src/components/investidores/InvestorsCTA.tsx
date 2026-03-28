"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { GoldButton } from "@/components/ui/gold-button";
import { Landmark } from "lucide-react";

export function InvestorsCTA() {
  return (
    <section className="py-48 px-6 md:px-24 bg-white relative overflow-hidden border-t border-[#F8F1E3]">
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none overflow-hidden">
        <span className="font-heading text-[25vw] font-black text-primary whitespace-nowrap leading-none uppercase tracking-tighter italic">CAPITAL</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <div className="flex justify-center mb-12">
          <Landmark className="text-primary w-16 h-16 opacity-80" />
        </div>

        <h3 className="font-heading text-4xl md:text-6xl text-[#0F172A] mb-10 font-black uppercase tracking-tighter leading-tight">
          Quer Estruturar uma <br />
          <span className="font-light not-italic text-primary">Parceria</span>?
        </h3>

        <p className="font-sans text-[#0F172A]/40 mb-16 text-lg md:text-xl max-w-xl mx-auto leading-relaxed italic font-light">
          Agende uma reunião estratégica com nosso conselho de investimentos.
        </p>

        <div className="flex justify-center">
          <Link href="/contato#form-contato">
            <GoldButton className="px-12 py-6 font-bold text-xs tracking-[0.4em] uppercase rounded-xl">
              Falar com um Consultor
            </GoldButton>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
