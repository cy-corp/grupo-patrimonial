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
    id: "01",
    title: "Engenharia de Valor",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwmhfo5VO5azhdJ59VSp_GDpiaWRlreFvyGDiSvliGHDEE2tDj55T4eX7YYicSDQqSqjE6ULd1rcXA20A95bcHQmfwIwVC9UwkFvae6Xt_IZIZiGyaekm4AdGrgWy5VLfLPrm-3BCCFo2gXEeFHD3HvOvItMbmey-xYAfUAjMot4t5K2BYh6lSrOpfVuwLu4IRG5qjdSubBWsKRVyUxfKpGs_YqwkeEFNryzCDpk7xhHZDXP7KXPekXoZ195THWvgEs9S71WoH6zja",
    level: 1
  },
  {
    id: "02",
    title: "Incorporação Imobiliária",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnYUxNlzu8SwPfc-1drAvb-FKkSsIvGmsNQdZjKHB1MmksD7_w1pfGlhC8lmC_IMBpJ3IG0HGuCRss9ADvmHPqLhGRpoxxB4vEQn0G4AB5n59wJQgJNBygrZ_H2jMxb3sHjTeqHwuRDMFaIMs5mHYfMazLsdM6MWb4NMZ6uS8SjVW3eUaXg_WRJ9GbRb5gan8oii1vKbL2C-jbB4i86e_Mjbt-vzTNMg9FrvnO60LvRyEqbVH05a7duYT0iS6-ZLdL3WjAxnZ0kJSp",
    level: 1
  },
  {
    id: "03",
    title: "Construção de Alto Padrão",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGUM4Dl1rGMeef9moXK_QpyQKqCCtKnDfgWDU6CrXfZaVZspRvmz7IKANRFAWH6cAaE2rWO1CHDpwX2gdAX069SgnkW15GUDGJJgR_UMhVsjgKC_7_75QJ3kenK9kVyk2RRFXO8XZS_mbbZ-aitRDW-GQw8-NkaGb-aUq94L4G3w_xeEbQ84JaMqVM3j5GtVUWT0Q9x4sVYizd6MG6yb73UaoPA3a8CEb9R79lM1c6Mg1uqCoeBpkQoUfKuNxY_ravreTD8c0Bojez",
    level: 1
  },
  {
    id: "04",
    title: "Consultoria Imobiliária",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxuSIWMnlTiMXPZk10g8GrupAJgDdyuVBeo7QEiS1NriT1b86Z_lTr48Rn-xjtxtvF58Uf73LRfwEJ7_ArJrBeQlLZXhjMziPlDY7U83PxVZShOEk1nXofIWV70d3nJGRfyx14x1w7WcItjDNhj8hCtBiN5ziC5619RODP7mlskfIu9lLiUDjbhWno57L00BGVXD56NIIW2myJlHjBOjoAkykVZYeTgyofhOkd7K205rCZcSjj1dsu3MNRR2aD_hP2ejPhFBl-5PRh",
    level: 2
  },
  {
    id: "05",
    title: "Gestão Patrimonial",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAadLuNLQ2k1tMM8eCzQ8h488Ap5Ufv8EoGv8RhM9em2RmSIjwc4pJfSOvoqyPtR_Rx4lKipPzlycw7cgQVZsKQsmfbuew6lExt2PAGXB7-2Q81xHpci-o0wTtg_vg177sxveGYjK38p_HJUGY5J6XcpykjVKyY3E2YwidsW98AXIic5dRhhi22gBHZciaJi7R3UEiv8uxTKww_iMdbPnm1lBZNyzuvAc676ZsQzXh3B9n69RtMQ4cFH-pLmKNnPi3pBkdd0AhtPd4a",
    level: 2
  }
];

export function Solutions() {
  const level1 = solutions.filter(s => s.level === 1);
  const level2 = solutions.filter(s => s.level === 2);

  return (
    <section className="py-32 bg-[#F8F9FA] relative overflow-hidden border-y border-slate-200/50">
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

              <div className="mt-auto pt-8 flex items-center gap-3 text-primary text-[10px] uppercase font-bold tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-2">
                Conhecer Unidade
                <ChevronRight className="w-3 h-3" />
              </div>

              {/* Bottom Decorative Bar */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-1000" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Signature Section from HTML */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 0.8, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, delay: 0.2 }}
        className="py-32 text-center mt-20 border-t border-[#484848]/10"
      >
        <div className="max-w-3xl mx-auto">
          <p className="font-headline text-xl md:text-2xl text-on-surface mb-12 italic leading-relaxed px-4">
            "A permanência não é um acidente, é o resultado de uma engenharia precisa e uma visão de longo prazo."
          </p>
          <div className="inline-block h-24 w-[1px] bg-primary-dim"></div>
        </div>
      </motion.div>
    </section>
  );
}
