"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GoldButton } from "@/components/ui/gold-button";

export function CTA() {
  return (
    <section className="py-32 md:py-64 bg-[#111111] relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A14A]/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C9A14A]/5 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="container mx-auto px-6 lg:px-24 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-12"
        >
          <h2 className="font-heading text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight md:tracking-tighter leading-tight md:leading-none text-white max-w-5xl">
            PRONTO PARA INICIAR SUA <span className="text-[#C9A14A]">OBRA?</span>
          </h2>

          <p className="font-sans text-white/50 text-xl md:text-2xl uppercase tracking-[0.3em] font-light max-w-3xl">
            SOLUÇÕES COMPLETAS DO PROJETO À ENTREGA DAS CHAVES
          </p>

          <Link href="/contato#form-contato">
            <GoldButton className="px-12 py-6 text-sm tracking-[0.4em]">
              FALAR COM ESPECIALISTA
            </GoldButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
