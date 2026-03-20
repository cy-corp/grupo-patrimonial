"use client";

import React from "react";
import { motion } from "framer-motion";

export function Georeferencing() {
  return (
    <section className="py-32 px-6 md:px-24 bg-surface-container-low border-y border-outline-variant/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5"
          >
            <h2 className="font-headline text-3xl text-primary mb-8 uppercase tracking-[0.2em]">Georreferenciamento</h2>
            <p className="font-body text-on-surface-variant text-lg leading-relaxed">
              Precisão técnica e inteligência de dados aplicada à estruturação de ativos imobiliários de alta complexidade.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-start-7 md:col-span-6 space-y-12"
          >
            <div className="group border-l border-primary/20 pl-8 hover:border-primary transition-colors">
              <h4 className="text-on-surface font-headline text-xl mb-4 tracking-wide group-hover:text-primary transition-colors">Inteligência Geoespacial</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed font-body">
                Utilização de dados orbitais e processamento remoto para análise de viabilidade, delimitação perimetral e monitoramento estratégico de grandes áreas.
              </p>
            </div>
            
            <div className="group border-l border-primary/20 pl-8 hover:border-primary transition-colors">
              <h4 className="text-on-surface font-headline text-xl mb-4 tracking-wide group-hover:text-primary transition-colors">Regularização Técnica</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed font-body">
                Levantamentos topográficos de alta precisão e conformidade com os padrões do INCRA e cartórios, garantindo a segurança jurídica absoluta da propriedade.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
