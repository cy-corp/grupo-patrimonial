"use client";

import { motion } from "framer-motion";
import { 
  History, 
  Building2, 
  Hammer, 
  Handshake, 
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

const units = [
  { name: "ENGENHARIA", icon: History, description: "Base técnica e regularização imobiliária." },
  { name: "INCORPORADORA", icon: Building2, description: "Estratégia, valorização e inteligência." },
  { name: "CONSTRUTORA", icon: Hammer, description: "Execução, controle e excelência na obra." },
  { name: "IMOBILIÁRIA", icon: Handshake, description: "Intermediação premium e curadoria." },
  { name: "PATRIMONIAL", icon: ShieldCheck, description: "Proteção, gestão e sucessão familiar." },
];

export function Sinergia() {
  return (
    <section className="bg-[#0F172A] py-32 lg:py-48 text-white relative overflow-hidden">
      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent z-0" />
      <div className="absolute -bottom-64 -left-64 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] z-0" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 lg:mb-32"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary">
            Ciclo de Excelência
          </span>
          <h2 className="mt-6 font-heading text-5xl lg:text-[7rem] font-black uppercase tracking-tighter leading-none">
            A Sinergia do Grupo
          </h2>
          <div className="mt-12 flex justify-center items-center gap-6">
            <div className="h-[1px] w-24 bg-primary/40" />
            <div className="h-2 w-2 rounded-full border border-primary/40" />
            <div className="h-[1px] w-24 bg-primary/40" />
          </div>
        </motion.div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {units.map((unit, idx) => (
            <motion.div
              key={unit.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative h-64 lg:h-80 flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.07] hover:border-primary/40 transition-all duration-700 cursor-default p-8 text-center"
            >
              <div className="mb-8 text-white/30 group-hover:text-primary transition-all duration-500 scale-125 group-hover:scale-150 transform">
                <unit.icon size={40} strokeWidth={1} />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/50 group-hover:text-white transition-colors">
                {unit.name}
              </h3>
              <p className="mt-4 text-[10px] uppercase tracking-widest text-[#F8F1E3]/20 group-hover:text-[#F8F1E3]/60 transition-colors opacity-0 group-hover:opacity-100 transition-all duration-500">
                {unit.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-32 text-center"
        >
          <div className="max-w-3xl mx-auto space-y-10">
            <p className="text-[#F8F1E3]/40 text-lg lg:text-2xl font-light leading-relaxed">
              Ao contrário de atuações isoladas, o <span className="text-primary italic font-medium">Grupo Patrimonial</span> elimina a fragmentação.
              Cada decisão tomada na fase de Engenharia já contempla a futura gestão do patrimônio familiar.
            </p>
            
            <Link 
              href="/contato#form-contato" 
              className="mt-20 inline-flex flex-col items-center group gap-6"
            >
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-white group-hover:text-primary transition-colors">
                Conheça nossa metodologia
              </span>
              <div className="h-[1px] w-32 bg-primary transition-all duration-700 ease-in-out group-hover:w-72" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
