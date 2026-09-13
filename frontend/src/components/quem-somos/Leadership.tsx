"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dener = {
  name: "Dener Lopes",
  role: "CEO da Rendal",
  description:
    "Incorporador desde 2008, especialista na área ambiental e agrimensura. Cursou Engenharia Ambiental na UEMG (Universidade do Estado de Minas Gerais), é Agrimensor pela Faculdade Pitágoras, Diretor comercial da Urbastructor Urbanismo e Incorporações e CEO da Rendal. Participou de 73 loteamentos em São Paulo, Minas Gerais e Goiás, além de inúmeras regularizações fundiárias, ambientais e urbanísticas em diferentes escalas.",
  extraInfo:
    "É o responsável por integrar engenharia, legislação, viabilidade econômica e estratégia imobiliária, assegurando que cada projeto nasça juridicamente sólido, tecnicamente viável e financeiramente eficiente.",
  company: "Diretor Comercial da URBASTRUCTOR",
  image: "/quem-somos/dener-lopes.png",
};

export function Leadership() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="overflow-hidden bg-[#F8F1E3] px-6 py-32 md:px-24">
      <div className="mb-24 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4 block font-sans text-xs font-bold uppercase tracking-[0.4em] text-primary"
        >
          Governança
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, transform: "translateY(10px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          className="font-heading text-3xl font-black uppercase text-[#0F172A] md:text-5xl"
        >
          Liderança Estratégica
        </motion.h2>
        <div className="mt-8 flex justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="h-px w-12 bg-primary"
          />
        </div>
      </div>

      <motion.article
        initial={{ opacity: 0, transform: "translateY(16px)" }}
        whileInView={{ opacity: 1, transform: "translateY(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        className="mx-auto flex w-full max-w-md flex-col overflow-hidden border border-primary/10 bg-white"
      >
        <div className="relative aspect-[3/4] overflow-hidden grayscale transition-[filter] duration-700 hover:grayscale-0">
          <img
            alt={dener.name}
            className="h-full w-full object-cover"
            src={dener.image}
          />
        </div>
        <div className="flex flex-1 flex-col p-8">
          <h3 className="mb-1 font-heading text-xl font-bold uppercase text-primary">{dener.name}</h3>
          <p className="mb-6 font-sans text-[10px] font-bold uppercase leading-relaxed tracking-widest text-[#0F172A]/60">
            {dener.role}
          </p>
          <div className="mb-6 h-px w-8 bg-primary/40" />

          <p className={`font-heading text-sm font-light leading-relaxed italic text-[#0F172A]/80 ${expanded ? "" : "line-clamp-4"}`}>
            {dener.description}
          </p>
          <AnimatePresence>
            {expanded && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 font-heading text-sm font-light leading-relaxed italic text-[#0F172A]/80"
              >
                {dener.extraInfo}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            className="mt-4 cursor-pointer font-sans text-[10px] font-black uppercase tracking-widest text-primary hover:opacity-70"
          >
            {expanded ? "- Ocultar" : "+ Ver mais"}
          </button>

          <div className="mt-8 border-t border-primary/10 pt-6">
            <span className="mb-1 block font-sans text-[10px] font-bold uppercase tracking-widest text-primary">Vínculo</span>
            <span className="text-xs font-bold uppercase text-[#0F172A]/60">{dener.company}</span>
          </div>
        </div>
      </motion.article>
    </section>
  );
}
