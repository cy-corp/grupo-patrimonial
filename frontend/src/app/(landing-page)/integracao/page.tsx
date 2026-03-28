"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Network, Zap, Globe, Target, ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Velocidade de Execução",
    description: "A sinergia entre as frentes do grupo elimina gargalos burocráticos e acelera a entrega de resultados ao cliente.",
  },
  {
    icon: Globe,
    title: "Visão 360°",
    description: "Cada projeto é avaliado em todas as suas dimensões: técnica, jurídica, comercial e financeira ao mesmo tempo.",
  },
  {
    icon: Target,
    title: "Foco no Resultado",
    description: "Toda a estrutura do grupo é orientada para maximizar o retorno do cliente, seja ele proprietário, investidor ou comprador.",
  },
  {
    icon: Network,
    title: "Rede de Especialistas",
    description: "Acesso imediato a engenheiros, advogados, corretores e gestores dentro de um mesmo grupo, sem conflito de interesse.",
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

export default function Integracao() {
  return (
    <div className="flex flex-col pb-24">
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522071901873-411886a10004?q=80&w=2000&auto=format&fit=crop"
            alt="Equipe integrada trabalhando"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/80 dark:bg-background/90" />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-24">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-primary">
              <Network className="h-4 w-4" />
              Integração
            </span>
            <h1 className="mt-4 max-w-3xl font-heading text-5xl font-bold uppercase leading-tight tracking-tight md:text-6xl">
              Um Grupo,<br />
              <span className="text-primary">Solução Completa</span>
            </h1>
            <p className="mt-6 max-w-xl text-xl text-muted-foreground">
              A verdadeira força do Grupo Patrimonial está na integração inteligente entre todas as suas frentes de atuação — do projeto ao resultado final.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/quem-somos" className={buttonVariants({ size: "lg", className: "h-12 px-7" })}>
                Conheça o grupo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/contato#form-contato" className={buttonVariants({ variant: "outline", size: "lg", className: "h-12 px-7" })}>
                Fale conosco
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14 text-center">
          <h2 className="font-heading text-4xl font-bold uppercase tracking-tight">Por que a Integração Importa</h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded bg-primary" />
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Quando todas as frentes trabalham juntas, o resultado para o cliente é muito superior.
          </p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold uppercase">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Journey */}
      <section className="bg-primary/5 py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-heading text-4xl font-bold uppercase tracking-tight">A Jornada Integrada</h2>
            <div className="mx-auto mt-4 h-1 w-24 rounded bg-primary" />
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Da identificação do ativo até o resultado final, o Grupo Patrimonial oferece uma solução de ponta a ponta — com uma equipe única e integrada cuidando de tudo.
            </p>
            <div className="mt-12 grid gap-4 text-left sm:grid-cols-2 md:grid-cols-5">
              {["Terreno / Ativo", "Engenharia", "Incorporação & Construção", "Imobiliária", "Gestão Patrimonial"].map((stage, i) => (
                <motion.div
                  key={stage}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="relative flex flex-col items-center gap-3 rounded-xl border bg-card p-5 text-center shadow-sm"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                  <p className="font-heading text-sm font-bold uppercase">{stage}</p>
                </motion.div>
              ))}
            </div>
            <Link href="/contato#form-contato" className={buttonVariants({ size: "lg", className: "mt-10 h-12 px-8" })}>
              Inicie sua jornada conosco
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
