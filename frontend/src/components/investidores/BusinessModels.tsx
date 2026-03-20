"use client";

import React from "react";
import { motion } from "framer-motion";

const models = [
  {
    icon: "handshake",
    title: "Permutas",
    description: "Viabilização de terrenos estratégicos através de troca por área construída ou participação financeira, otimizando o fluxo de capital.",
    bg: "bg-surface-container"
  },
  {
    icon: "corporate_fare",
    title: "SPEs",
    description: "Sociedades de Propósito Específico garantindo segregação patrimonial e transparência total na governança de cada projeto.",
    bg: "bg-surface-container-high"
  },
  {
    icon: "landscape",
    title: "Loteamentos",
    description: "Desenvolvimento urbano planejado com foco em infraestrutura de alto padrão e valorização acelerada de m².",
    bg: "bg-surface-container"
  },
  {
    icon: "architecture",
    title: "Desenvolvimento de áreas",
    description: "Transformação de glebas brutas em ativos imobiliários de alta liquidez através de estudos de masterplan avançados.",
    bg: "bg-surface-container-high"
  },
  {
    title: "Gestão de Ativos",
    description: "Estratégias personalizadas para geração de renda passiva ou valorização patrimonial agressiva através de curadoria imobiliária.",
    bg: "bg-surface-container-lowest",
    span: "md:col-span-2",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyzVzPrraYp-EpdBOYfPJVcchgx9RsPc-wXURzys8dJ53yXQtQpWxXtoDqM7WEDP3EVmTdsYbr14hGWfde-M7mT58BjKQHwXL5nrEat3o6jmzpAYBTKy9SQCWunVXP_2YSIf2VNVmS7ZdRaBofLQtUbfmZUi2GWUDjvYH9wGMjDBlnmKraDj9uXuTDhYv_NGELI0kBWZwytJXLmbPwUWNDPsFhQhpa9KnLUlhhLLI24ditrM6drLQQH7hzU0_whcdH1aoStZz6YYgD"
  }
];

export function BusinessModels() {
  return (
    <section className="py-32 px-6 md:px-12 bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-8"
          >
            <h2 className="font-headline text-3xl md:text-4xl text-on-surface mb-6 italic">Modelos de Negócio</h2>
            <div className="w-24 h-[1px] bg-primary mb-8"></div>
            <p className="text-on-surface-variant max-w-xl text-lg tracking-wide leading-relaxed">
              Flexibilidade estrutural para viabilizar empreendimentos de alto impacto. Atuamos em toda a cadeia de valor imobiliária.
            </p>
          </motion.div>
          
          <div className="md:col-span-4 text-right hidden md:block">
            <span className="text-primary font-headline text-7xl opacity-10 font-bold">01 / 05</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/10">
          {models.map((model, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group relative ${model.bg} h-[500px] overflow-hidden p-10 flex flex-col justify-end transition-all duration-700 hover:bg-surface-container-highest ${model.span || ""}`}
            >
              {model.image && (
                <>
                  <img 
                    alt={model.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000" 
                    src={model.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
                </>
              )}
              
              <div className="absolute top-10 right-10 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                {model.icon && (
                  <span className="material-symbols-outlined text-primary text-4xl">
                    {model.icon}
                  </span>
                )}
              </div>
              
              <div className="relative z-10">
                <h3 className={`font-headline ${model.image ? 'text-4xl' : 'text-2xl'} text-on-surface mb-4`}>{model.title}</h3>
                <p className={`text-on-surface-variant text-sm leading-relaxed mb-6 transition-all duration-500 ${model.image ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0'}`}>
                  {model.description}
                </p>
                <div className={`h-[1px] ${model.image ? 'w-32' : 'w-0'} group-hover:w-full bg-primary transition-all duration-700`}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
