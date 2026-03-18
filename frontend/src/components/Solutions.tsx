"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  HardHat, 
  Building2, 
  Construction, 
  Home, 
  TrendingUp,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const solutions = [
  {
    title: "Engenharia",
    description: "Soluções técnicas avançadas e rigor construtivo para projetos de alta complexidade.",
    icon: HardHat,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Incorporadora",
    description: "Desenvolvimento de produtos imobiliários inovadores e de alto padrão.",
    icon: Building2,
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    title: "Construtora",
    description: "Execução impecável com tecnologia de ponta e foco total em qualidade.",
    icon: Construction,
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    title: "Imobiliária",
    description: "Comercialização estratégica e curadoria de ativos para clientes exigentes.",
    icon: Home,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Gestão Patrimonial",
    description: "Preservação e valorização de patrimônios através de gestão profissional.",
    icon: TrendingUp,
    color: "bg-rose-500/10 text-rose-500",
  },
];

export function Solutions() {
  return (
    <section className="py-24 bg-[#F8F1E3] relative z-10">
      <div className="container mx-auto px-6 h-full">
        <div className="flex flex-col mb-16 px-4">
          <span className="text-primary font-bold tracking-[.3em] uppercase text-xs mb-4">
            Expertise Integrada
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-[#0F172A] uppercase">
            Nossas <span className="text-primary">Soluções</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group relative bg-[#FFFFFF] p-8 border border-primary/10 hover:border-primary/40 transition-all duration-500 overflow-hidden"
            >
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 -mr-8 -mt-8 rotate-45 group-hover:bg-primary/20 transition-colors" />
              
              <div className={cn("inline-flex p-3 mb-6 transition-transform group-hover:scale-110 duration-500", solution.color)}>
                <solution.icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl font-heading font-bold mb-4 text-[#0F172A] uppercase tracking-wide">
                {solution.title}
              </h3>
              
              <p className="text-[#0F172A]/70 text-sm leading-relaxed mb-6">
                {solution.description}
              </p>
              
              <div className="mt-auto flex items-center text-primary font-bold text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-all group-hover:translate-x-2">
                Saber Mais
                <ChevronRight className="ml-1 w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
