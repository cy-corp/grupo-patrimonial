"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Como a Rendal e a DCorp trabalham juntas?",
    answer: "A Rendal estrutura o negócio: viabilidade, produto, capital e aprovações. A DCorp assume projeto, técnica e construção. São empresas distintas, com o mesmo critério de entrega."
  },
  {
    question: "Quais são os critérios da Rendal para parcerias em novos terrenos?",
    answer: "Buscamos áreas com potencial de valorização, em localizações consolidadas ou de expansão planejada. Analisamos metragem, zoneamento e liquidez do entorno antes de estruturar o produto."
  },
  {
    question: "Como fica a segurança jurídica dos investimentos?",
    answer: "Cada projeto pode nascer em SPE, com segregação patrimonial, auditoria jurídica e governança transparente entre parceiros, incorporadora e construtora."
  },
  {
    question: "Qual o perfil de investidor atendido?",
    answer: "Investidores institucionais, family offices e pessoas físicas de alta renda que buscam ativos reais com preservação e expansão de capital no longo prazo."
  },
  {
    question: "Como agendar uma análise de área ou de construção?",
    answer: "Envie o formulário de contato. Depois da triagem, a equipe da Rendal ou da DCorp retorna para reunião remota ou presencial em Campinas."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 md:px-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-sans text-xs uppercase tracking-[0.4em] block mb-4 font-bold"
          >
            Esclarecimentos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-3xl md:text-5xl text-[#0F172A] uppercase font-black"
          >
            Perguntas Frequentes
          </motion.h2>
          <div className="mt-8 flex justify-center">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-[1px] bg-primary"
            ></motion.div>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`border border-[#0F172A]/5 rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer ${isOpen ? 'bg-[#F8F1E3]/30 border-primary/20 shadow-xl shadow-primary/5' : 'bg-transparent hover:border-primary/20 hover:bg-[#F8F1E3]/10'}`}
              >
                <div className="w-full text-left p-8 flex items-center justify-between group">
                  <span className={`font-heading text-lg md:text-xl uppercase font-bold tracking-tight transition-colors ${isOpen ? 'text-primary' : 'text-[#0F172A]/80 group-hover:text-primary'}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${isOpen ? 'bg-primary border-primary text-white rotate-180' : 'border-[#0F172A]/10 text-[#0F172A]/40 group-hover:border-primary group-hover:text-primary'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-8 pt-0">
                        <div className="h-[1px] w-12 bg-primary/20 mb-6"></div>
                        <p className="font-sans text-[#0F172A]/60 text-base md:text-lg leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
