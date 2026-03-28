"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Building2, MapPin, BarChart3, FileCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Identificação e Análise",
    description: "Mapeamos terrenos e imóveis com potencial de desenvolvimento, avaliando localização, zoneamento e viabilidade urbanística.",
  },
  {
    icon: BarChart3,
    title: "Estudo de Viabilidade",
    description: "Análise financeira detalhada incluindo projeção de VGV, custos de construção, prazos e TIR esperada do empreendimento.",
  },
  {
    icon: FileCheck,
    title: "Aprovações e Licenças",
    description: "Gestão completa de aprovações legais, registros imobiliários, RGI e toda a documentação necessária para o lançamento.",
  },
  {
    icon: Building2,
    title: "Lançamento e Execução",
    description: "Coordenação do lançamento comercial com estratégia de preço, mix de unidades e suporte total ao longo da construção.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

export default function Incorporadora() {
  return (
    <div className="flex flex-col pb-24">
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop"
            alt="Empreendimento imobiliário"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/80 dark:bg-background/90" />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-primary">
              <Building2 className="h-4 w-4" />
              Incorporadora
            </span>
            <h1 className="mt-4 max-w-3xl font-heading text-5xl font-bold uppercase leading-tight tracking-tight md:text-6xl">
              Desenvolvimento<br />
              <span className="text-primary">Imobiliário Estratégico</span>
            </h1>
            <p className="mt-6 max-w-xl text-xl text-muted-foreground">
              Transformamos terrenos e imóveis subutilizados em empreendimentos de alto valor agregado, com inteligência de mercado e retorno consistente.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/investidores" className={buttonVariants({ size: "lg", className: "h-12 px-7" })}>
                Ver oportunidades <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/contato#form-contato" className={buttonVariants({ variant: "outline", size: "lg", className: "h-12 px-7" })}>
                Fale com um especialista
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="container mx-auto px-4 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-14 text-center"
        >
          <h2 className="font-heading text-4xl font-bold uppercase tracking-tight">Nosso Processo</h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded bg-primary" />
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Do primeiro estudo à entrega das chaves, gerenciamos cada fase com metodologia rigorosa e transparência total.
          </p>
        </motion.div>
        <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative rounded-2xl border bg-card p-6 shadow-sm"
              >
                <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <div className="mb-4 mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold uppercase">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section >

      {/* CTA */}
      < section className="bg-primary/5 py-20" >
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-heading text-4xl font-bold uppercase tracking-tight">
              Tem um terreno ou imóvel?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Apresente ao nosso time de incorporação e descubra o potencial do seu ativo.
            </p>
            <Link href="/orcamento" className={buttonVariants({ size: "lg", className: "mt-8 h-12 px-8" })}>
              Solicite uma análise gratuita
            </Link>
          </motion.div>
        </div>
      </section >
    </div >
  );
}
