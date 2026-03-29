"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GoldButton } from "@/components/ui/gold-button";
import {
  Compass,
  Map,
  FileText,
  Leaf,
  Library,
} from "lucide-react";

const services = [
  {
    icon: Compass,
    title: "Topografia",
    description: "Levantamentos planialtimétricos de alta precisão que formam a base técnica indispensável para qualquer projeto.",
  },
  {
    icon: Map,
    title: "Georreferenciamento",
    description: "Certificação técnica de imóveis seguindo rigorosamente os padrões normativos vigentes.",
  },
  {
    icon: FileText,
    title: "Regularização Fundiária",
    description: "Inteligência técnica e jurídica aplicada na consolidação da propriedade e regularização de posses.",
  },
  {
    icon: Leaf,
    title: "Projetos Ambientais",
    description: "Estudos de impacto, licenciamentos e consultoria especializada em conformidade técnica e ecológica.",
  },
  {
    icon: Library,
    title: "Documentação Técnica",
    description: "Gestão completa de documentação técnica e cartorial para garantir a segurança jurídica do patrimônio.",
  },
];

// Warm tones that subtly shift per card for the stacking effect
const cardBg = [
  "#F8F1E3",
  "#F3EBD9",
  "#EEE5D0",
  "#E9DFC7",
  "#E4D9BE",
];

export default function EngenhariaPage() {
  return (
    <main className="min-h-screen bg-[#F8F1E3] flex flex-col pt-16 md:pt-0">
      {/* ─── Hero ─── */}
      <section className="relative w-full overflow-hidden">

        {/* Desktop Hero */}
        <div className="hidden md:flex relative min-h-[85vh] items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/engenharia/engenharia-hero.jpg"
              alt="Engenharia de Valor"
              fill
              className="object-cover brightness-75"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F8F1E3] via-[#F8F1E3]/90 to-transparent" />
          </div>

          <div className="container relative z-10 mx-auto px-12 lg:px-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-[1px] bg-[#C9A14A]" />
                <span className="font-sans text-[10px] tracking-[0.4em] uppercase font-bold text-[#C9A14A] opacity-80">
                  Base Técnica & Jurídica
                </span>
              </div>
              <h1 className="font-heading text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-none text-[#0F172A] mb-8">
                Engenharia <br />
                <span className="text-[#C9A14A]">de Valor</span>
              </h1>
              <p className="font-sans text-[#0F172A]/70 text-xl leading-relaxed tracking-wide max-w-xl border-l-2 border-[#C9A14A]/30 pl-8">
                Soluções técnicas fundamentais para a proteção, valorização e regularização total de ativos imobiliários.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Mobile Hero */}
        <div className="md:hidden flex flex-col">
          <div className="relative h-[45vh] w-full">
            <Image
              src="/engenharia/engenharia-hero.jpg"
              alt="Engenharia de Valor"
              fill
              className="object-cover brightness-90"
            />
          </div>
          <div className="relative -mt-24 bg-[#F8F1E3] rounded-t-[3rem] px-8 pt-12 pb-16 z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[1px] bg-[#C9A14A]" />
              <span className="font-sans text-[8px] tracking-[0.3em] uppercase font-bold text-[#C9A14A]">
                Base Técnica
              </span>
            </div>
            <h1 className="font-heading text-5xl font-black uppercase tracking-tighter leading-none text-[#0F172A] mb-6">
              Engenharia <br />
              <span className="text-[#C9A14A]">de Valor</span>
            </h1>
            <p className="font-sans text-[#0F172A]/80 text-lg leading-relaxed">
              Segurança técnica e jurídica que formam o alicerce sólido do seu patrimônio imobiliário.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Desktop Services: sticky left + scrolling list ─── */}
      <section className="hidden lg:block py-40">
        <div className="container mx-auto px-24">
          <div className="flex flex-row gap-24 items-start">
            {/* Sticky title panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-1/3 sticky top-32 self-start"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[#C9A14A]" />
                <span className="font-sans text-[10px] tracking-[0.4em] uppercase font-bold text-[#C9A14A]">
                  Nossa Atuação
                </span>
              </div>
              <h2 className="font-heading text-7xl font-black uppercase tracking-tighter leading-none text-[#0F172A] mb-8">
                Excelência <br />
                Técnica
              </h2>
              <p className="font-sans text-[#0F172A]/60 text-lg leading-relaxed">
                Atuamos nos fundamentos que garantem a sustentabilidade e a
                valorização real dos ativos imobiliários de nossos clientes de
                forma estratégica e precisa.
              </p>
            </motion.div>

            {/* Scrolling list */}
            <div className="w-2/3 flex flex-col border-t border-[#0F172A]/10">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group border-b border-[#0F172A]/10 py-12 flex flex-row gap-8 items-center transition-all duration-500 hover:pl-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-sm bg-[#F8F1E3] group-hover:bg-[#C9A14A]/10 transition-colors duration-500">
                    <service.icon className="w-5 h-5 text-[#C9A14A]" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-[#0F172A] mb-3">
                      {service.title}
                    </h3>
                    <p className="font-sans text-[#0F172A]/70 text-base leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mobile Services: stacking cards ─── */}
      <section className="lg:hidden bg-white">
        <div className="px-6 pt-16">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-[#C9A14A]" />
              <span className="font-sans text-[8px] tracking-[0.4em] uppercase font-bold text-[#C9A14A]">
                Nossa Atuação
              </span>
            </div>
            <h2 className="font-heading text-5xl font-black uppercase tracking-tighter leading-none text-[#0F172A] mb-6">
              Excelência <br />
              Técnica
            </h2>
            <p className="font-sans text-[#0F172A]/60 text-base leading-relaxed">
              Atuamos nos fundamentos que garantem a sustentabilidade e a valorização real dos ativos imobiliários.
            </p>
          </motion.div>
        </div>

        {/* Stacking cards */}
        <div
          className="flex flex-col"
          style={{ paddingBottom: `${services.length * 14 + 80}px` }}
        >
          {services.map((service, i) => (
            <div
              key={service.title}
              className="sticky mx-4 rounded-2xl shadow-xl px-8 py-10 flex flex-col gap-5"
              style={{
                top: `${80 + i * 14}px`,
                zIndex: i + 1,
                backgroundColor: cardBg[i],
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-sm bg-white/80 shadow-sm">
                  <service.icon className="w-5 h-5 text-[#C9A14A]" />
                </div>
                <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-[#0F172A]">
                  {service.title}
                </h3>
              </div>
              <p className="font-sans text-[#0F172A]/70 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Quote Section + Final CTA ─── */}
      <section className="py-40 md:py-64 border-t border-[#0F172A]/5 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="max-w-5xl mx-auto"
          >
            <div className="w-12 h-px bg-[#C9A14A] mx-auto mb-16" />
            <h2 className="font-heading text-3xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-[#0F172A] leading-tight mb-12">
              "A permanência não é um acidente, <br className="hidden md:block" />
              é o resultado de uma engenharia precisa <br className="hidden md:block" />
              e uma visão de longo prazo."
            </h2>
            <div className="flex flex-col items-center gap-12">
              <p className="font-sans text-[#0F172A]/40 text-[10px] uppercase font-bold tracking-[0.5em]">
                FUNDAMENTOS GRUPO PATRIMONIAL
              </p>
              <Link
                href="/contato#form-contato"
                className="transition-transform hover:scale-105 active:scale-95"
              >
                <GoldButton className="px-16 py-8 md:py-10 text-sm font-bold uppercase tracking-[0.3em] shadow-2xl shadow-[#C9A14A]/20">
                  FALE COM UM ESPECIALISTA
                </GoldButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
