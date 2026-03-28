"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { GoldButton } from "@/components/ui/gold-button";
import {
  Compass,
  Map,
  FileText,
  CheckCircle2,
  Building2,
  Scale,
  Users2,
  Layers
} from "lucide-react";

/**
 * Editorial Revamp - Incorporadora
 * Following the premium visual identity with editorial overlaps and cream tones.
 */

const services = [
  {
    num: "01",
    title: "Estudo de viabilidade",
    description: "Análise profunda de mercado, demanda regional e projeções financeiras rigorosas para garantir a solidez do projeto.",
  },
  {
    num: "02",
    title: "Estruturação jurídica",
    description: "Segurança patrimonial e conformidade legal total em todas as instâncias do desenvolvimento imobiliário.",
  },
  {
    num: "03",
    title: "Planejamento urbanístico",
    description: "Integração inteligente com o entorno, respeitando o plano diretor e agregando valor à região de inserção.",
  },
  {
    num: "04",
    title: "Coordenação de projetos",
    description: "Gestão multidisciplinar de arquitetura, engenharia e design para excelência em cada detalhe construtivo.",
  },
  {
    num: "05",
    title: "Apoio à comercialização",
    description: "Suporte estratégico em vendas e marketing para acelerar o VGV e consolidar o posicionamento do empreendimento.",
  },
];

const highlights = [
  "ALTA PERFORMANCE FINANCEIRA",
  "GESTÃO DE RISCOS ESTRUTURADA",
  "EXCELÊNCIA CONSTRUTIVA"
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1 },
  }),
};

export default function IncorporadoraPage() {
  return (
    <main className="min-h-screen bg-[#F8F1E3] flex flex-col pt-16 md:pt-0">

      {/* ─── Hero Section ─── */}
      <section className="relative w-full overflow-hidden">

        {/* Desktop Hero */}
        <div className="hidden md:flex relative min-h-[85vh] items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/incorporadora-hero.jpg"
              alt="Incorporadora"
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
                  UNIDADE DE NEGÓCIO
                </span>
              </div>
              <h1 className="font-heading text-7xl lg:text-[10rem] font-black uppercase tracking-tighter leading-none text-[#0F172A] mb-8">
                INCORPO<br />
                <span className="text-[#C9A14A]">RADORA</span>
              </h1>
              <p className="font-sans text-[#0F172A]/70 text-xl leading-relaxed tracking-wide max-w-xl border-l-2 border-[#C9A14A]/30 pl-8">
                Desenvolvimento estratégico de empreendimentos imobiliários com foco em valorização do ativo e retorno ao investidor.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Mobile Hero */}
        <div className="md:hidden flex flex-col">
          <div className="relative h-[45vh] w-full">
            <Image
              src="/incorporadora-hero.jpg"
              alt="Incorporadora"
              fill
              className="object-cover brightness-90"
            />
          </div>
          <div className="relative -mt-28 bg-[#F8F1E3] rounded-t-[3rem] px-8 pt-12 pb-16 z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[1px] bg-[#C9A14A]" />
              <span className="font-sans text-[8px] tracking-[0.3em] uppercase font-bold text-[#C9A14A]">
                UNIDADE DE NEGÓCIO
              </span>
            </div>
            <h1 className="font-heading text-5xl font-black uppercase tracking-tighter leading-none text-[#0F172A] mb-6">
              INCORPO <br />
              <span className="text-[#C9A14A]">RADORA</span>
            </h1>
            <p className="font-sans text-[#0F172A]/80 text-lg leading-relaxed">
              Desenvolvimento estratégico de empreendimentos imobiliários de alto valor.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Services Section ─── */}
      <section className="py-32 md:py-48 container mx-auto px-6 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="lg:col-span-4"
          >
            <h2 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-[#0F172A] mb-8">
              Atuamos <br />
              <span className="text-[#C9A14A]">desde:</span>
            </h2>
            <p className="font-sans text-[#0F172A]/60 text-lg leading-relaxed mb-12">
              Nossa abordagem 360° garante que cada etapa do ciclo imobiliário seja tratada com precisão técnica e alto valor de mercado, mitigando riscos e potencializando os resultados financeiros para nossos parceiros e investidores.
            </p>
          </motion.div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {services.map((service, i) => (
              <motion.div
                key={service.num}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="font-heading text-xs font-bold text-[#C9A14A]/60 tracking-widest leading-none">
                    {service.num}
                  </span>
                  <div className="h-px flex-grow bg-[#0F172A]/5" />
                </div>
                <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-[#0F172A]">
                  {service.title}
                </h3>
                <p className="font-sans text-[#0F172A]/60 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

