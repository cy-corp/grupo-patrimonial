"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export function Quality() {
  return (
    <section className="py-24 lg:py-48 bg-[#F8F1E3] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">

          {/* LEFT CONTENT - IMAGE & SEAL */}
          <div className="relative w-full lg:w-1/2 group">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square w-full max-w-[600px] mx-auto overflow-hidden bg-[#0F172A]"
            >
              <Image
                src="/processos/quality-seal.png"
                alt="Selo de Qualidade"
                fill
                className="object-cover object-center"
              />
            </motion.div>

            {/* FLOATING CARD */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute -bottom-6 -left-4 lg:-left-12 bg-[#C9A14A] p-6 lg:p-10 rounded-xl shadow-2xl max-w-[240px] lg:max-w-[280px]"
            >
              <p className="text-white text-base lg:text-lg font-bold uppercase leading-tight tracking-wide">
                Compromisso com a Excelência
              </p>
            </motion.div>
          </div>

          {/* RIGHT CONTENT - SPECS */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="mb-6">
              <span className="text-primary text-[10px] lg:text-xs font-bold uppercase tracking-[0.4em]">
                Excelência em Qualidade
              </span>
            </div>

            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-[#0F172A] mb-8">
              Infraestrutura de<br />
              <span className="text-primary italic font-serif lowercase">alta fidelidade</span>
            </h2>

            <p className="text-[#0F172A]/70 text-lg lg:text-xl leading-relaxed">
              Nosso departamento de Qualidade e Pós-Venda não é apenas um serviço de suporte, mas sim a espinha dorsal de nossa integridade institucional. Operamos com padrões de auditoria internacional para garantir que o produto final não apenas atenda, mas supere as expectativas técnicas.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
