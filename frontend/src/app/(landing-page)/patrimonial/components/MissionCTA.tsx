"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { GoldButton } from "@/components/ui/gold-button";

export function MissionCTA() {
  return (
    <section className="bg-[#F8F1E3] py-32 md:py-48 text-center px-6">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-[10px] tracking-[0.4em] uppercase font-bold text-[#C9A14A] block mb-12 opacity-80"
          >
            NOSSA MISSÃO FUNDAMENTAL
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-7xl font-black uppercase tracking-tight md:tracking-tighter leading-tight text-[#0F172A] mb-16 md:mb-24"
          >
            Preservar, organizar, expandir e <br />
            <span className="text-[#C9A14A] italic">perpetuar</span> o patrimônio <br />
            imobiliário com segurança e <br />
            estratégia.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <Link href="/contato#form-contato">
              <GoldButton className="py-6 px-12 md:text-base tracking-[0.4em]">
                AGENDAR CONSULTORIA
              </GoldButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
