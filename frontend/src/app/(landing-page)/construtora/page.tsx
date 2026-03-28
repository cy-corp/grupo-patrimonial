"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Hammer, ShieldCheck, Clock, Users, ArrowRight } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Qualidade Certificada",
    description: "Processos construtivos auditados e materiais de primeira linha para garantir a durabilidade e a valorização do imóvel.",
  },
  {
    icon: Clock,
    title: "Cumprimento de Prazos",
    description: "Gestão eficiente com cronogramas detalhados e acompanhamento semanal para entrega dentro do prazo acordado.",
  },
  {
    icon: Users,
    title: "Equipe Especializada",
    description: "Profissionais técnicos altamente capacitados em cada frente da obra, com supervisão permanente de engenheiros.",
  },
  {
    icon: Hammer,
    title: "Tecnologia Construtiva",
    description: "Adoção de sistemas construtivos modernos e sustentáveis que otimizam custo, tempo e performance do imóvel.",
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

export default function Construtora() {
  return (
    <div className="flex flex-col pb-24">
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=2000&auto=format&fit=crop"
            alt="Construção civil"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/80 dark:bg-background/90" />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-24">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-primary">
              <Hammer className="h-4 w-4" />
              Construtora
            </span>
            <h1 className="mt-4 max-w-3xl font-heading text-5xl font-bold uppercase leading-tight tracking-tight md:text-6xl">
              Construindo com<br />
              <span className="text-primary">Excelência e Segurança</span>
            </h1>
            <p className="mt-6 max-w-xl text-xl text-muted-foreground">
              Executamos obras residenciais, comerciais e de infraestrutura com o mais alto padrão técnico e compromisso com a qualidade de cada entrega.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/orcamento" className={buttonVariants({ size: "lg", className: "h-12 px-7" })}>
                Solicitar orçamento <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/contato#form-contato" className={buttonVariants({ variant: "outline", size: "lg", className: "h-12 px-7" })}>
                Fale conosco
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="container mx-auto px-4 py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14 text-center">
          <h2 className="font-heading text-4xl font-bold uppercase tracking-tight">Nossos Pilares</h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded bg-primary" />
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
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
                <h3 className="font-heading text-lg font-bold uppercase">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Gallery / Image Feature */}
      <section className="bg-muted/40 py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-heading text-3xl font-bold uppercase tracking-tight md:text-4xl">
                Do projeto à conclusão, com zero surpresas
              </h2>
              <div className="mt-4 h-1 w-20 rounded bg-primary" />
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Nossa gestão de obras é orientada por dados. Utilizamos softwares de acompanhamento em tempo real, com relatórios semanais e acesso ao cliente durante todas as etapas.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Cada obra recebe um gestor dedicado responsável pela qualidade, segurança e comunicação com o contratante.
              </p>
              <Link href="/contato#form-contato" className={buttonVariants({ className: "mt-8 h-12 px-7" })}>
                Converse com um gestor
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
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=1200&auto=format&fit=crop"
                alt="Gestão de obras"
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
