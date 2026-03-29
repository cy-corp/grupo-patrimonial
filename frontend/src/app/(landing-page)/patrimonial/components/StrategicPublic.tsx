"use client";

import { motion } from "framer-motion";

const publics = [
  "FAMÍLIAS COM PATRIMÔNIO IMOBILIÁRIO",
  "PRODUTORES RURAIS",
  "EMPRESÁRIOS",
  "INVESTIDORES",
  "PROPRIETÁRIOS DE ÁREAS URBANAS E RURAIS",
];

export function StrategicPublic() {
  return (
    <section className="bg-[#0F172A] py-32 md:py-48 overflow-hidden relative">
      {/* Background Graphic (Floor plan aesthetic) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none grayscale invert mix-blend-screen overflow-hidden">
        <svg viewBox="0 0 1000 1000" className="w-full h-full object-cover">
          <rect x="100" y="100" width="800" height="800" fill="none" stroke="white" strokeWidth="1" />
          <line x1="100" y1="300" x2="900" y2="300" stroke="white" strokeWidth="0.5" />
          <line x1="100" y1="600" x2="900" y2="600" stroke="white" strokeWidth="0.5" />
          <line x1="400" y1="100" x2="400" y2="900" stroke="white" strokeWidth="0.5" />
          <line x1="700" y1="100" x2="700" y2="900" stroke="white" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="20" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="800" cy="800" r="50" stroke="white" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-24 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-20 md:mb-32 max-w-4xl mx-auto"
        >
          <h2 className="font-heading text-4xl md:text-7xl font-black uppercase tracking-tight md:tracking-tighter leading-tight text-white mb-8">
            PÚBLICO <span className="text-[#C9A14A]">ESTRATÉGICO</span>
          </h2>
          <p className="font-sans text-white/50 text-lg md:text-xl max-w-2xl mx-auto">
            Soluções sob medida para perfis que demandam excelência técnica e discrição absoluta.
          </p>
        </motion.div>

        {/* Public Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {publics.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="border border-white/20 p-10 md:p-12 hover:border-[#C9A14A] hover:bg-white/[0.03] transition-all duration-500 group flex flex-col items-start text-left h-full"
            >
              <span className="font-sans text-[10px] tracking-[0.4em] font-bold text-[#C9A14A] mb-8 opacity-50">
                0{idx + 1}
              </span>
              <h4 className="font-heading text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#C9A14A] transition-colors duration-300 mt-auto">
                {item}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
