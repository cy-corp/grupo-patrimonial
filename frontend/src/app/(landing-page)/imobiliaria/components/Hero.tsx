"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Desktop Hero */}
      <div className="hidden md:flex relative min-h-[90vh] items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/imobiliaria/imobiliaria-hero.jpg"
            alt="Divisão Imobiliária"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8F1E3] via-[#F8F1E3]/85 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full relative"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-[1px] bg-[#C9A14A]" />
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase font-bold text-[#C9A14A] opacity-80">
                REAL ESTATE DIVISION
              </span>
            </div>
            <h1 className="font-heading text-6xl lg:text-[10rem] font-black uppercase tracking-tighter leading-none text-[#0F172A] mb-8">
              IMOBILIÁRIA<br />
              <span className="text-[#C9A14A] italic">PATRIMONIAL</span>
            </h1>
            <div className="w-24 h-1 bg-[#C9A14A] mb-8" />
            <p className="font-sans text-[#0F172A]/70 text-xl leading-relaxed tracking-wide max-w-xl border-l-2 border-[#C9A14A]/30 pl-8">
              Intermediação imobiliária com análise técnica e patrimonial, voltada à segurança da negociação e valorização do imóvel.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mobile Hero (Editorial Overlap) */}
      <div className="md:hidden flex flex-col">
        <div className="relative h-[45vh] w-full">
          <Image
            src="/imobiliaria/imobiliaria-hero.jpg"
            alt="Divisão Imobiliária"
            fill
            className="object-cover brightness-90"
          />
        </div>
        <div className="relative -mt-28 bg-[#F8F1E3] rounded-t-[3rem] px-8 pt-12 pb-16 z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-[#C9A14A]" />
            <span className="font-sans text-[8px] tracking-[0.3em] uppercase font-bold text-[#C9A14A]">
              REAL ESTATE DIVISION
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-tight md:tracking-tighter leading-tight md:leading-none text-[#0F172A] mb-6">
            IMOBILIÁRIA<br />
            <span className="text-[#C9A14A] italic">PATRIMONIAL</span>
          </h1>
          <div className="w-16 h-1 bg-[#C9A14A] mb-6" />
          <p className="font-sans text-[#0F172A]/80 text-lg leading-relaxed">
            Intermediação imobiliária com foco em segurança jurídica e valorização técnica do seu patrimônio.
          </p>
        </div>
      </div>
    </section>
  );
}
