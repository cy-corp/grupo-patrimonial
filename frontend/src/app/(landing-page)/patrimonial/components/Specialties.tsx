"use client";

import { motion } from "framer-motion";
import { Building, Gavel, MapPin, Users, Coins, TrendingUp } from "lucide-react";

const specialties = [
  {
    title: "DIAGNÓSTICO PATRIMONIAL IMOBILIÁRIO",
    description: "Análise técnica e mercadológica profunda para identificação de gargalos e oportunidades no portfólio.",
    icon: Building,
  },
  {
    title: "ORGANIZAÇÃO E REGULARIZAÇÃO",
    description: "Saneamento jurídico e administrativo de ativos para garantir liquidez e segurança institucional.",
    icon: Gavel,
  },
  {
    title: "PLANEJAMENTO DE USO",
    description: "Definição estratégica entre venda, locação, incorporação ou manutenção de ativos de alto valor.",
    icon: MapPin,
  },
  {
    title: "SUCESSÃO PATRIMONIAL",
    description: "Estruturação técnica para a transição geracional segura de legados imobiliários familiares.",
    icon: Users,
  },
  {
    title: "HOLDINGS PATRIMONIAIS",
    description: "Apoio técnico na constituição de veículos jurídicos para otimização fiscal e proteção de bens.",
    icon: Coins,
  },
  {
    title: "VALORIZAÇÃO DE ATIVOS",
    description: "Intervenções estratégicas e reposicionamento de mercado para maximizar a rentabilidade do patrimônio.",
    icon: TrendingUp,
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

export function Specialties() {
  return (
    <section className="bg-white py-32 md:py-48 border-t border-[#0F172A]/10">
      <div className="container mx-auto px-6 lg:px-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-32">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-sans text-[10px] tracking-[0.4em] uppercase font-bold text-[#C9A14A] block mb-4"
            >
              ESPECIALIDADES
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight md:tracking-tighter leading-tight md:leading-[1.1] text-[#0F172A]"
            >
              PRINCIPAIS <br />
              <span className="text-[#C9A14A]">ATUAÇÕES</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-sans text-[#0F172A]/70 text-base md:text-lg max-w-sm mb-2"
          >
            Estruturação de soluções imobiliárias complexas com rigor institucional e transparência.
          </motion.p>
        </div>

        {/* Portfolio Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[#0F172A]/10 bg-white">
          {specialties.map((item, idx) => {
            const Icon = item.icon;
            
            // Border logic for grid (3 columns)
            const borderClasses = `
              border-[#0F172A]/10
              ${idx % 3 !== 2 ? "lg:border-r" : ""}
              ${idx >= 3 ? "lg:border-t" : ""}
              border-b lg:border-b-0
              ${idx === 5 ? "border-b-0" : ""}
            `;

            return (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`group flex flex-col p-10 md:p-14 ${borderClasses} hover:bg-[#F8F1E3]/30 transition-all duration-500`}
              >
                <div className="mb-10 text-[#C9A14A]">
                  <Icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-black uppercase tracking-tight text-[#0F172A] mb-4 leading-none">
                  {item.title}
                </h3>
                <p className="font-sans text-[#0F172A]/70 text-base md:text-lg leading-relaxed max-w-[280px]">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
