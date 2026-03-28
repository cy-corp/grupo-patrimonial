"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Shield, Scale, GitBranch, BookOpen, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Proteção Patrimonial",
    description: "Estruturação jurídica e societária para blindar o patrimônio familiar de riscos, litígios e passivos inesperados.",
  },
  {
    icon: Scale,
    title: "Planejamento Sucessório",
    description: "Estratégias de inventário, doação com reserva de usufruto e holding familiar para preservar o legado entre gerações.",
  },
  {
    icon: GitBranch,
    title: "Organização e Reestruturação",
    description: "Diagnóstico e reorganização completa do portfólio imobiliário para otimizar a gestão e a rentabilidade dos ativos.",
  },
  {
    icon: BookOpen,
    title: "Due Diligence Imobiliária",
    description: "Auditoria jurídica e técnica de imóveis para identificar riscos antes de qualquer decisão de compra ou investimento.",
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

export default function Patrimonial() {
  return (
    <div className="flex flex-col pb-24">
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop"
            alt="Gestão patrimonial"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/80 dark:bg-background/90" />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-24">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-primary">
              <Shield className="h-4 w-4" />
              Patrimonial
            </span>
            <h1 className="mt-4 max-w-3xl font-heading text-5xl font-bold uppercase leading-tight tracking-tight md:text-6xl">
              Proteção e Perpetuação<br />
              <span className="text-primary">do seu Patrimônio</span>
            </h1>
            <p className="mt-6 max-w-xl text-xl text-muted-foreground">
              Ajudamos famílias, empresários e investidores a organizar, proteger e perpetuar seu patrimônio imobiliário com visão de longo prazo.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contato#form-contato" className={buttonVariants({ size: "lg", className: "h-12 px-7" })}>
                Agendar diagnóstico <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/quem-somos" className={buttonVariants({ variant: "outline", size: "lg", className: "h-12 px-7" })}>
                Nossa equipe jurídica
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4 py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14 text-center">
          <h2 className="font-heading text-4xl font-bold uppercase tracking-tight">Nossas Soluções</h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded bg-primary" />
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Uma abordagem integrada para proteger o que você construiu ao longo da vida.
          </p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
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
                <h3 className="font-heading text-lg font-bold uppercase">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Feature */}
      <section className="bg-muted/40 py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-heading text-3xl font-bold uppercase tracking-tight md:text-4xl">
                Sua família merece<br />tranquilidade patrimonial
              </h2>
              <div className="mt-4 h-1 w-20 rounded bg-primary" />
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Trabalhamos com uma equipe de especialistas em direito imobiliário, tributário e sucessório para criar soluções personalizadas que protegem o patrimônio de cada cliente.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Nosso processo começa com um diagnóstico completo do portfólio atual, identificando vulnerabilidades e oportunidades de otimização.
              </p>
              <Link href="/contato#form-contato" className={buttonVariants({ className: "mt-8 h-12 px-7" })}>
                Solicitar diagnóstico gratuito
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[400px] overflow-hidden rounded-2xl shadow-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop"
                alt="Reunião de planejamento patrimonial"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
