"use client";

import { motion } from "framer-motion";
import { FileCheck, Scale, Target, Users, BarChart3 } from "lucide-react";

const pillars = [
  {
    icon: FileCheck,
    title: "Check-list técnico e jurídico",
    desc: "Auditamos cada detalhe documental e físico com rigor institucional.",
  },
  {
    icon: Scale,
    title: "Contratos claros",
    desc: "Transparência absoluta em termos, prazos e responsabilidades mútuas.",
  },
  {
    icon: Target,
    title: "Monitoramento de processos",
    desc: "Acompanhamento em tempo real de cada marco evolutivo do projeto.",
  },
  {
    icon: Users,
    title: "Comunicação contínua",
    desc: "Canais diretos e resolutivos para suporte e alinhamento estratégico.",
  },
  {
    icon: BarChart3,
    title: "Relatórios ao cliente",
    desc: "Dados estruturados e inteligência aplicada em reportes periódicos.",
  },
];

export function Pillars() {
  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16 lg:mb-24">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-[#0F172A] leading-none">
            Os cinco <span className="text-primary italic font-serif lowercase">pilares</span> de confiança
          </h2>
          <p className="mt-6 text-[#0F172A]/70 text-lg lg:text-xl leading-relaxed">
            Nossa metodologia é fundamentada na precisão técnica e na clareza jurídica, garantindo que cada processo seja um marco de excelência e segurança para nossos clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#F8F1E3] text-primary">
                <pillar.icon size={24} strokeWidth={1.5} />
              </div>
              <div className="space-y-3">
                <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-[#0F172A] leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-[#0F172A]/60 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
