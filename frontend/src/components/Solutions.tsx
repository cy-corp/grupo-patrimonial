"use client";

import React from "react";
import { motion } from "framer-motion";

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
  return (
    <section className="py-24 px-4 md:px-12 bg-surface-container-low">
      <div className="mb-20 text-center">
        <h2 className="font-headline text-2xl md:text-3xl mb-4 tracking-[0.1em] uppercase text-on-surface">Soluções Estruturais</h2>
        <div className="w-12 h-1 bg-primary mx-auto"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        {/* Level 1: 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {solutions.filter(s => s.level === 1).map((solution) => (
            <motion.div 
              key={solution.id}
              whileHover={{ scale: 1.02 }}
              className="group relative aspect-[4/5] overflow-hidden border border-[#484848]/30 hover:border-primary/50 transition-all duration-700 bg-black"
            >
              <img 
                alt={solution.title} 
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.4] group-hover:brightness-75 group-hover:scale-105 transition-all duration-1000" 
                src={solution.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:from-black/80"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="block font-label text-primary text-sm tracking-[0.3em] mb-2">{solution.id}</span>
                <h3 className="font-headline text-xl text-on-surface tracking-wide group-hover:text-primary transition-colors">{solution.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Level 2: 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          {solutions.filter(s => s.level === 2).map((solution) => (
            <motion.div 
              key={solution.id}
              whileHover={{ scale: 1.02 }}
              className="group relative h-64 md:h-80 overflow-hidden border border-[#484848]/30 hover:border-primary/50 transition-all duration-700 bg-black"
            >
              <img 
                alt={solution.title} 
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.3] group-hover:brightness-60 group-hover:scale-105 transition-all duration-1000" 
                src={solution.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:from-black/80"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="block font-label text-primary text-sm tracking-[0.3em] mb-2">{solution.id}</span>
                <h3 className="font-headline text-xl text-on-surface tracking-wide group-hover:text-primary transition-colors">{solution.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Signature Section from HTML */}
      <div className="py-32 text-center mt-20 border-t border-[#484848]/10">
        <div className="max-w-3xl mx-auto">
          <p className="font-headline text-xl md:text-2xl text-on-surface mb-12 italic opacity-80 leading-relaxed px-4">
            "A permanência não é um acidente, é o resultado de uma engenharia precisa e uma visão de longo prazo."
          </p>
          <div className="inline-block h-24 w-[1px] bg-primary-dim"></div>
        </div>
      </div>
    </section>
  );
}
