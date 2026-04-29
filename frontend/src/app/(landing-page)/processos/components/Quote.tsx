"use client";

import { motion } from "framer-motion";
import { Quote as QuoteIcon } from "lucide-react";

export function Quote() {
  return (
    <section className="py-24 lg:py-48 bg-white overflow-hidden text-center relative">
      {/* DECORATIVE BACKGROUND ICON */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
        <QuoteIcon size={400} strokeWidth={1} className="text-[#0F172A]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          {/* QUOTE ICON */}
          <div className="w-12 h-12 flex items-center justify-center mx-auto mb-12 bg-[#F8F1E3] rounded-full text-primary">
            <QuoteIcon size={20} fill="#C9A14A" />
          </div>

          <h2 className="font-heading text-3xl md:text-5xl lg:text-7xl font-light italic leading-tight text-[#0F172A] mb-16 tracking-tighter">
            “A qualidade não é um ato, é um hábito que permeia cada contrato, cada tijolo e cada interação após a entrega das chaves.”
          </h2>

          <div className="flex flex-col items-center gap-4">
            <div className="h-[2px] w-12 bg-primary" />
            <div className="text-[12px] lg:text-[14px] font-bold uppercase tracking-[0.5em] text-[#0F172A]">
              Patrimonial Inc.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
