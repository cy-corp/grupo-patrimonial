"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Partner {
  name: string;
  role: string;
  description: string;
  extraInfo: string;
  company: string;
  image: string;
}

const partners: Partner[] = [
  {
    name: "Dener Lopes",
    role: "Engenheiro Ambiental e Agrimensor | Incorporação | Regularização Fundiária",
    description: "Com 17 anos de atuação no mercado imobiliário, Dener Lopes é especialista em incorporação, licenciamento e regularização de empreendimentos. Ao longo de sua trajetória, participou da aprovação de mais de 70 loteamentos, além de inúmeras regularizações fundiárias, ambientais e urbanísticas em diferentes escalas.",
    extraInfo: "É o responsável por integrar engenharia, legislação, viabilidade econômica e estratégia imobiliária, assegurando que cada projeto nasça juridicamente sólido, tecnicamente viável e financeiramente eficiente. Proprietário da URBASTRUCTOR.",
    company: "Proprietário da URBASTRUCTOR",
    image: "/dener-lopes.png"
  },
  {
    name: "Lucas Azevedo",
    role: "Engenheiro Civil | Execução | Projetos",
    description: "Engenheiro civil atuante desde os 11 anos de idade, Lucas Azevedo cresceu dentro da construção civil, em uma empresa familiar com mais de 27 anos de atuação no mercado.",
    extraInfo: "Une conhecimento técnico profundo, visão prática de obra e domínio de projetos, sendo responsável por transformar conceito em estrutura, desempenho e durabilidade. Sua atuação garante construções bem resolvidas, econômicas e tecnicamente superiores. Proprietário da C.A.C Prime Corp.",
    company: "Proprietário da C.A.C PRIME CORP.",
    image: "/lucas-azevedo.png"
  },
  {
    name: "Adermis Marini",
    role: "Empresário | Corretor de Imóveis | Estratégia Comercial",
    description: "Empresário, corretor de imóveis e ex-deputado federal, Adermis Marini atua no ramo imobiliário há mais de 8 anos, com participação direta no lançamento e desenvolvimento de diversos empreendimentos.",
    extraInfo: "Possui forte visão de mercado, relacionamento institucional e capacidade estratégica para posicionamento comercial, vendas e articulação de negócios, conectando o produto certo ao público certo. Proprietário da Marini Imóveis.",
    company: "Proprietário da MARINI IMÓVEIS.",
    image: "/adermis-marini.png"
  },
  {
    name: "Beto Gallo",
    role: "Empresário | Arquiteto | Design | Arquitetura Internacional",
    description: "Arquiteto com mais de 30 anos de atuação, Carlos Alberto Gallo é reconhecido internacionalmente, tendo sido premiado como Arquiteto do Ano em Dubai e Londres.",
    extraInfo: "Assina projetos executados no Brasil e no exterior, incluindo Estados Unidos, Espanha, Dubai, Londres, entre outros mercados exigentes. Sua arquitetura une estética, funcionalidade e identidade, elevando o padrão do produto imobiliário e agregando valor real ao empreendimento. Proprietário da Gallo Decor.",
    company: "Proprietário da GALLO DECOR.",
    image: "/beto-gallo.png"
  }
];

export function Leadership() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 md:px-24 bg-[#F8F1E3] overflow-hidden">
      <div className="text-center mb-24">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary font-sans text-xs uppercase tracking-[0.4em] block mb-4 font-bold"
        >
          Governança
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl md:text-5xl text-[#0F172A] uppercase font-black"
        >
          Liderança Estratégica
        </motion.h2>
        <div className="mt-8 flex justify-center">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[1px] bg-primary"
          ></motion.div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto items-start">
        {partners.map((partner, index) => {
          const isExpanded = expandedIndex === index;
          
          return (
            <motion.div 
              key={index}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="bg-white border border-primary/10 group overflow-hidden hover:border-primary/30 transition-all duration-500 flex flex-col self-start w-full"
            >
              <div className="aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative">
                <img 
                  alt={partner.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  src={partner.image}
                />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="font-heading text-xl text-primary mb-1 group-hover:text-primary transition-colors font-bold uppercase">{partner.name}</h3>
                <p className="text-[10px] font-sans uppercase tracking-widest text-[#0F172A]/60 mb-6 min-h-[40px] leading-relaxed font-bold">
                  {partner.role}
                </p>
                <div className="w-8 h-[1px] bg-primary/40 mb-6 group-hover:w-12 transition-all duration-500"></div>
                
                <div className="relative">
                  <p className={`font-heading text-sm text-[#0F172A]/80 leading-relaxed italic transition-all duration-300 ${isExpanded ? '' : 'line-clamp-4'} font-light`}>
                    {partner.description}
                  </p>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="font-heading text-sm text-[#0F172A]/80 leading-relaxed italic mt-4 font-light">
                          {partner.extraInfo}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <button 
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="mt-4 text-[10px] text-primary uppercase tracking-widest font-black hover:opacity-70 transition-opacity cursor-pointer flex items-center gap-1"
                  >
                    {isExpanded ? "- Ocultar" : "+ Ver mais"}
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-primary/10">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-primary block mb-1 font-bold">Unidade</span>
                  <span className="text-xs text-[#0F172A]/60 font-bold uppercase">{partner.company}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
