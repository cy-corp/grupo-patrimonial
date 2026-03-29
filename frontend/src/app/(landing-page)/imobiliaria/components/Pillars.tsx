"use client";

import { motion } from "framer-motion";
import { Home, LineChart, ShieldCheck, TrendingUp, Map, ArrowRight } from "lucide-react";

/**
 * STRATEGIC PILLARS COMPONENT
 * Minimalist editorial grid for real estate services.
 */

const pillars = [
  {
    title: "COMPRA E VENDA",
    description: "Intermediação de imóveis de alto padrão com curadoria especializada, focada no perfil de investimento e estilo de vida de nossos clientes.",
    icon: Home,
    hasLink: true,
  },
  {
    title: "AVALIAÇÕES",
    description: "Laudos técnicos precisos baseados em inteligência de mercado e dados reais de transações contemporâneas.",
    icon: LineChart,
  },
  {
    title: "ASSESSORIA DOCUMENTAL",
    description: "Segurança jurídica total em todas as etapas da transação imobiliária, mitigando riscos e garantindo fluidez.",
    icon: ShieldCheck,
  },
  {
    title: "CONSULTORIA PARA INVESTIDORES",
    description: "Direcionamento estratégico para maximização de retorno e proteção de capital através de ativos imobiliários selecionados.",
    icon: TrendingUp,
  },
  {
    title: "INTERMEDIAÇÃO DE ÁREAS",
    description: "Identificação e negociação de terrenos com alto potencial de desenvolvimento para incorporadores e projetos especiais.",
    icon: Map,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

export function Pillars() {
  return (
    <section className="bg-white py-32 md:py-48">
      <div className="container mx-auto px-6 lg:px-24">
        {/* Header Section */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tight md:tracking-tighter leading-tight text-[#0F172A] mb-4"
          >
            NOSSOS <span className="text-[#C9A14A]">PILARES</span> ESTRATÉGICOS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-[#0F172A]/70 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Soluções integradas para o mercado de alto padrão, fundamentadas em segurança jurídica e inteligência de mercado.
          </motion.p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-6 border border-[#0F172A]/10 bg-white">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            
            // Grid spanning logic: 
            // 2 items top row (span 3/6), 3 items bottom row (span 2/6)
            const spanClass = idx < 2 ? "lg:col-span-3" : "lg:col-span-2";
            
            // Border logic to prevent doubling
            // Desktop (lg): 
            // - Right border for card 0 (idx 0)
            // - Top border for cards 2, 3, 4 (idx >= 2)
            // - Right border for cards 2, 3 (idx 2, 3)
            const borderClasses = `
              border-[#0F172A]/10
              ${idx === 0 ? "lg:border-r" : ""}
              ${idx >= 2 ? "lg:border-t" : ""}
              ${(idx === 2 || idx === 3) ? "lg:border-r" : ""}
              border-b lg:border-b-0
              ${idx === 4 ? "border-b-0" : ""}
            `;

            return (
              <motion.div
                key={pillar.title}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`group flex flex-col items-start p-10 md:p-16 ${spanClass} ${borderClasses} bg-white transition-all duration-500 hover:bg-[#F8F1E3]/30`}
              >
                <div className="mb-10 text-[#C9A14A]">
                  <Icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                
                <h3 className="font-heading text-2xl md:text-3xl font-black uppercase tracking-tight text-[#0F172A] mb-6 leading-tight">
                  {pillar.title}
                </h3>
                
                <p className="font-sans text-[#0F172A]/70 text-base md:text-lg leading-relaxed mb-10 max-w-[360px]">
                  {pillar.description}
                </p>

                {pillar.hasLink && (
                  <button className="group/link flex items-center gap-2 font-sans text-[10px] tracking-[0.3em] font-bold text-[#C9A14A] uppercase hover:gap-3 transition-all duration-300">
                    SABER MAIS <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
