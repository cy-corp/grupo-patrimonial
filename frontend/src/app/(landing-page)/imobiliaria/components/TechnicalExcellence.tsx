"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function TechnicalExcellence() {
  return (
    <section className="bg-white py-32 md:py-48 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-16 md:gap-24">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[450px] md:h-[650px] w-full rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/imobiliaria/arquitetura-negocio.jpg"
              alt="Arquitetura de Negócio"
              fill
              className="object-cover"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>

          {/* Text Section */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[#C9A14A]" />
                <span className="font-sans text-[10px] tracking-[0.4em] uppercase font-bold text-[#C9A14A]">
                  EXCELÊNCIA TÉCNICA
                </span>
              </div>
              <h2 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tight md:tracking-tighter leading-tight text-[#0F172A] mb-8">
                A ARQUITETURA DE <br />
                UM <span className="text-[#C9A14A] italic">BOM NEGÓCIO</span>
              </h2>
              <p className="font-sans text-[#0F172A]/70 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
                Não apenas vendemos imóveis, desenhamos estratégias de patrimônio. Cada negociação passa por um rigoroso crivo técnico que avalia não apenas o valor presente, mas o potencial de liquidez e valorização futura.
              </p>

              {/* Bullet points with checkmarks */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A14A] mt-1 shrink-0" />
                  <div>
                    <h4 className="font-heading text-base font-black uppercase tracking-widest text-[#0F172A] mb-1">
                      CURADORIA RIGOROSA
                    </h4>
                    <p className="font-sans text-[#0F172A]/60 text-sm md:text-base">
                      Apenas ativos com conformidade documental absoluta e valor real.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A14A] mt-1 shrink-0" />
                  <div>
                    <h4 className="font-heading text-base font-black uppercase tracking-widest text-[#0F172A] mb-1">
                      INTELIGÊNCIA DE DADOS
                    </h4>
                    <p className="font-sans text-[#0F172A]/60 text-sm md:text-base">
                      Decisões pautadas em métricas reais do mercado de luxo.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
