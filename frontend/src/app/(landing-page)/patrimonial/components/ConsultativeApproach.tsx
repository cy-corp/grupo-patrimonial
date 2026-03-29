"use client";

import { motion } from "framer-motion";

export function ConsultativeApproach() {
  return (
    <section className="bg-white py-32 md:py-48">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Label Sector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <h3 className="font-heading text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-[#0F172A] flex flex-col">
              ABORDAGEM <span className="text-[#C9A14A]">CONSULTIVA</span>
            </h3>
            <div className="w-24 h-[2px] bg-[#C9A14A] mt-12" />
          </motion.div>

          {/* Quote Sector */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-6 border-l border-[#0F172A]/10 pl-8 lg:pl-16 mt-12 lg:mt-0"
          >
            <p className="font-sans text-[#0F172A] text-xl md:text-3xl lg:text-4xl leading-tight md:leading-snug tracking-tight font-medium italic">
              "Nosso trabalho vai além da simples administração de imóveis. Atuamos de forma próxima e estratégica, analisando cada ativo como parte de um ecossistema patrimonial maior."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
