"use client";

import React from "react";
import { motion } from "framer-motion";
import { useActiveImage } from "@/hooks/useActiveImage";
import type { Company } from "@/lib/companies";

export function ContactHero({ company }: { company: Company }) {
  const { imageUrl, altText } = useActiveImage("contato_hero", "/contato/contact-hero.jpg");

  return (
    <section className="relative flex min-h-[100vh] flex-col overflow-hidden bg-[#F8F1E3] md:min-h-[90vh] md:flex-row md:items-center">
      <div className="relative z-0 h-[45vh] w-full overflow-hidden md:absolute md:inset-0 md:h-full">
        <img
          alt={altText || "Escritório"}
          className="h-full w-full object-cover"
          src={imageUrl}
        />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#F8F1E3] via-[#F8F1E3]/85 to-transparent md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F1E3] via-[#F8F1E3]/20 to-transparent md:hidden" />
      </div>

      <div className="relative z-10 -mt-28 max-w-6xl rounded-t-[3rem] bg-[#F8F1E3] px-6 py-12 md:mt-0 md:ml-12 md:rounded-none md:bg-transparent md:px-24 md:py-24">
        <p className="mb-6 font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
          {company.legalName}
        </p>
        <motion.h1
          initial={{ opacity: 0, transform: "translateY(12px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          className="mb-8 font-display text-4xl leading-[1.08] text-balance text-graphite md:text-7xl"
        >
          Fale com a {company.name}
        </motion.h1>
        <p className="max-w-2xl border-l-2 border-primary/20 pl-8 font-sans text-base font-medium leading-relaxed text-pretty text-graphite/70 md:pl-10 md:text-xl">
          {company.role}. A mensagem chega nesta unidade — não na outra.
        </p>
      </div>
    </section>
  );
}
