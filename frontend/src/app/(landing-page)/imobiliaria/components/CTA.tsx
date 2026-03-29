"use client";

import { motion } from "framer-motion";
import { GoldButton } from "@/components/ui/gold-button";
import Link from "next/link";

export function CTA() {
  return (
    <section className="bg-[#F8F1E3] py-32 md:py-48 text-center px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="font-heading text-4xl md:text-7xl font-black uppercase tracking-tight md:tracking-tighter leading-tight text-[#0F172A] mb-12"
        >
          SUA SEGURANÇA PATRIMONIAL<br />
          COMEÇA COM UMA <span className="text-[#C9A14A]">ANÁLISE PRECISA.</span>
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
              AGENDE UMA CONSULTORIA
            </GoldButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
