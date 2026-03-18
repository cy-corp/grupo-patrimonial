"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Home, Search, TrendingUp, Handshake, ArrowRight } from "lucide-react";

const offerings = [
  {
    icon: Search,
    title: "Captação Estratégica",
    description: "Identificamos imóveis com alto potencial de liquidez e valorização para compor nosso portfólio de vendas e locação.",
  },
  {
    icon: TrendingUp,
    title: "Precificação Inteligente",
    description: "Análise comparativa de mercado com metodologia rigorosa para posicionar o imóvel competitivamente e maximizar o resultado.",
  },
  {
    icon: Handshake,
    title: "Negociação Especializada",
    description: "Nossos corretores são treinados para conduzir negociações com foco no melhor resultado para todas as partes.",
  },
  {
    icon: Home,
    title: "Gestão de Locação",
    description: "Administração completa de contratos de locação, vistoria de entrada e saída, repasse e manutenção preventiva.",
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

export default function Imobiliaria() {
  return (
    <div className="flex flex-col pb-24">
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2000&auto=format&fit=crop"
            alt="Imobiliária de alto padrão"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/80 dark:bg-background/90" />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-24">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-primary">
              <Home className="h-4 w-4" />
              Imobiliária
            </span>
            <h1 className="mt-4 max-w-3xl font-heading text-5xl font-bold uppercase leading-tight tracking-tight md:text-6xl">
              Comercialização<br />
              <span className="text-primary">de Alto Padrão</span>
            </h1>
            <p className="mt-6 max-w-xl text-xl text-muted-foreground">
              Conectamos compradores, vendedores e locatários com inteligência de mercado, portfólio exclusivo e equipe especializada em imóveis premium.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contato" className={buttonVariants({ size: "lg", className: "h-12 px-7" })}>
                Anunciar meu imóvel <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/orcamento" className={buttonVariants({ variant: "outline", size: "lg", className: "h-12 px-7" })}>
                Buscar imóvel
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4 py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14 text-center">
          <h2 className="font-heading text-4xl font-bold uppercase tracking-tight">O que Fazemos por Você</h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded bg-primary" />
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {offerings.map((o, i) => {
            const Icon = o.icon;
            return (
              <motion.div
                key={o.title}
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
                <h3 className="font-heading text-lg font-bold uppercase">{o.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{o.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Image Feature */}
      <section className="bg-muted/40 py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[400px] overflow-hidden rounded-2xl shadow-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                alt="Imóvel de alto padrão"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-heading text-3xl font-bold uppercase tracking-tight md:text-4xl">
                Seu imóvel em boas mãos
              </h2>
              <div className="mt-4 h-1 w-20 rounded bg-primary" />
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Nosso portfólio abrange imóveis residenciais de médio e alto padrão, lajes corporativas, galpões logísticos e terrenos urbanos com potencial construtivo.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Oferecemos gestão ativa de ativos imobiliários, maximizando a rentabilidade com segurança e transparência.
              </p>
              <Link href="/contato" className={buttonVariants({ className: "mt-8 h-12 px-7" })}>
                Fale com um corretor
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
