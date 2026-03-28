"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Execution() {
  return (
    <section className="py-24 md:py-48 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-sm shadow-2xl"
          >
            <Image
              src="/construtora-execucao.jpg"
              alt="Execução Institucional"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-8"
          >
            <h2 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-[#0F172A]">
              A arte da <span className="text-[#C9A14A]">execução</span> <br /> institucional
            </h2>
            <div className="space-y-6">
              <p className="font-sans text-[#0F172A]/70 text-lg md:text-xl leading-relaxed tracking-wide">
                Mais do que realizar o patrimonial, construir não é apenas erguer estruturas, é materializar ativos. Nossa abordagem combina o rigor da engenharia civil com uma visão estratégica de preservação de valor.
              </p>
              <p className="font-sans text-[#0F172A]/70 text-lg md:text-xl leading-relaxed tracking-wide">
                Utilizamos processos industrializados e gestão orientadora por dados para mitigar riscos inerentes à construção, asseguramos que cada projeto cumpra rigorosamente cronogramas e orçamentos.
              </p>
            </div>
            <div className="w-20 h-px bg-[#C9A14A]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
