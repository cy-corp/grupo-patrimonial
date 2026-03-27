"use client";

import React from "react";
import { motion } from "framer-motion";
import { Handshake, Building2, Map, Layout, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

const models = [
  {
    icon: Handshake,
    title: "Permutas",
    description: "Viabilização de terrenos estratégicos através de troca por área construída ou participação financeira, otimizando o fluxo de capital.",
    bg: "bg-[#F8F1E3]"
  },
  {
    icon: Building2,
    title: "SPEs",
    description: "Sociedades de Propósito Específico garantindo segregação patrimonial e transparência total na governança de cada projeto.",
    bg: "bg-white"
  },
  {
    icon: Map,
    title: "Loteamentos",
    description: "Desenvolvimento urbano planejado com foco em infraestrutura de alto padrão e valorização acelerada de m².",
    bg: "bg-[#F8F1E3]"
  },
  {
    icon: Layout,
    title: "Desenvolvimento",
    description: "Transformação de glebas brutas em ativos imobiliários de alta liquidez através de estudos de masterplan avançados.",
    bg: "bg-white"
  },
  {
    icon: LineChart,
    title: "Gestão de Ativos",
    description: "Estratégias personalizadas para geração de renda passiva ou valorização patrimonial agressiva através de curadoria imobiliária.",
    bg: "bg-[#F8F1E3]",
    span: "md:col-span-2",
  }
];

export function BusinessModels() {
  return (
    <section className="py-32 px-6 md:px-24 bg-white overflow-hidden relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-4xl md:text-6xl text-[#0F172A] font-black uppercase tracking-tighter leading-none"
          >
            Modelos de <span className="font-light text-primary">Negócio</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-[1.5px] bg-primary mx-auto mt-8"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#0F172A]/5 overflow-hidden rounded-2xl border border-[#0F172A]/5">
          {models.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.99 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative ${model.bg} min-h-[350px] overflow-hidden p-10 lg:p-12 flex flex-col justify-end transition-all duration-700 ${model.span || ""}`}
            >
              <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-100 transition-all duration-500">
                <model.icon className="text-primary w-10 h-10 group-hover:scale-110 transition-transform" />
              </div>

              <div className="relative z-10">
                <h3 className={`font-heading ${model.span ? 'text-4xl' : 'text-3xl'} text-[#0F172A] mb-4 font-black uppercase leading-tight tracking-tighter`}>{model.title}</h3>
                
                {/* Responsive Reveal: Always visible on mobile (with entrance animation), Hover-only on Desktop */}
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className={cn(
                    "font-sans text-[#0F172A]/60 text-sm leading-relaxed mb-6 transition-all duration-500 font-bold max-w-lg",
                    "opacity-100 translate-y-0",
                    "md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0"
                  )}
                >
                  {model.description}
                </motion.p>
                <div className={cn(
                  "h-[1.5px] bg-primary transition-all duration-700",
                  "w-full md:w-0 md:group-hover:w-full"
                )}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
