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
import Link from "next/link";
import { cn } from "@/lib/utils";

const solutions = [
  {
    title: "Engenharia",
    description: "Soluções técnicas avançadas e rigor construtivo para projetos de alta complexidade.",
    icon: HardHat,
    color: "bg-blue-500/10 text-blue-500",
    path: "/engenharia",
  },
  {
    title: "Incorporadora",
    description: "Desenvolvimento de produtos imobiliários inovadores e de alto padrão.",
    icon: Building2,
    color: "bg-amber-500/10 text-amber-500",
    path: "/incorporadora",
  },
  {
    title: "Construtora",
    description: "Execução impecável com tecnologia de ponta e foco total em qualidade.",
    icon: Construction,
    color: "bg-emerald-500/10 text-emerald-500",
    path: "/construtora",
  },
  {
    title: "Imobiliária",
    description: "Comercialização estratégica e curadoria de ativos para clientes exigentes.",
    icon: Home,
    color: "bg-purple-500/10 text-purple-500",
    path: "/imobiliaria",
  },
  {
    title: "Gestão Patrimonial",
    description: "Preservação e valorização de patrimônios através de gestão profissional.",
    icon: TrendingUp,
    color: "bg-rose-500/10 text-rose-500",
    path: "/patrimonial",
  },
];

export function Solutions() {
  return (
    <section className="py-32 bg-[#F8F9FA] relative overflow-hidden border-y border-slate-200/50 -mt-6 md:-mt-10 rounded-t-[40px] md:rounded-t-[60px] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] z-[60]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-[1px] bg-primary"></div>
              <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px]">
                Expertise & Excelência
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-light text-[#0F172A] leading-tight"
            >
              Ecossistema <span className="font-bold italic text-primary">Integrado</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-[#0F172A]/40 text-sm max-w-sm font-light tracking-wide leading-relaxed border-l border-[#0F172A]/10 pl-8 mb-4"
          >
            Soluções completas para desenvolver, proteger, valorizar e perpetuar patrimônios imobiliários.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 border border-slate-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative p-10 border border-slate-100 hover:bg-slate-50/50 transition-all duration-700 flex flex-col h-full min-h-[400px]"
            >
              {/* Vertical Number Indicator */}
              <div className="absolute top-10 right-10 text-4xl font-bold font-heading text-slate-100 group-hover:text-primary/20 transition-colors duration-700">
                0{index + 1}
              </div>

              <div className="mb-12 relative">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-all duration-700 group-hover:scale-110">
                  <solution.icon className="w-8 h-8 text-slate-300 group-hover:text-primary transition-colors duration-700" />
                </div>
              </div>

              <h3 className="text-xl font-heading font-medium mb-6 text-[#0F172A] group-hover:text-primary transition-colors duration-500 uppercase tracking-widest">
                {solution.title}
              </h3>

              <p className="text-[#0F172A]/40 group-hover:text-[#0F172A]/70 text-sm leading-relaxed mb-10 font-light transition-colors duration-500">
                {solution.description}
              </p>

              <Link
                href={solution.path}
                className="mt-auto pt-8 flex items-center gap-3 text-primary text-[10px] uppercase font-bold tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-2 cursor-pointer"
              >
                Conhecer Unidade
                <ChevronRight className="w-3 h-3" />
              </Link>

              {/* Bottom Decorative Bar */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-1000" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
