"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import {
  HardHat,
  ClipboardList,
  Ruler,
  Wrench,
  Award,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: ClipboardList,
    title: "Projetos e Laudos Técnicos",
    description:
      "Elaboração de projetos estruturais, laudos de vistoria, ART/RRT e documentação técnica completa.",
  },
  {
    icon: Ruler,
    title: "Consultoria Especializada",
    description:
      "Análise técnica de viabilidade construtiva, assessoria em conformidade normativa e gestão de riscos de obras.",
  },
  {
    icon: Wrench,
    title: "Acompanhamento Técnico",
    description:
      "Fiscalização e supervisão de obras com relatórios periódicos de progresso, qualidade e segurança.",
  },
  {
    icon: Award,
    title: "Controle de Qualidade",
    description:
      "Aplicação de normas ABNT e melhores práticas para garantir a entrega de ativos duráveis e seguros.",
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

export default function Engenharia() {
  return (
    <div className="flex flex-col pb-24">
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop"
            alt="Engenharia civil e obras"
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
              <HardHat className="h-4 w-4" />
              Engenharia
            </span>
            <h1 className="mt-4 max-w-3xl font-heading text-5xl font-bold uppercase leading-tight tracking-tight md:text-6xl">
              Soluções Técnicas de<br />
              <span className="text-primary">Alto Padrão</span>
            </h1>
            <p className="mt-6 max-w-xl text-xl text-muted-foreground">
              Prestamos serviços de engenharia civil especializados, com rigor técnico, segurança jurídica e excelência na execução.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/orcamento" className={buttonVariants({ size: "lg", className: "h-12 px-7" })}>
                Solicitar orçamento <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/contato" className={buttonVariants({ variant: "outline", size: "lg", className: "h-12 px-7" })}>
                Fale com um engenheiro
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-14 text-center"
        >
          <h2 className="font-heading text-4xl font-bold uppercase tracking-tight">O que Oferecemos</h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded bg-primary" />
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

      {/* Methodology */}
      <section className="bg-muted/40 py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[420px] overflow-hidden rounded-2xl shadow-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop"
                alt="Engenheiro em obra"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-heading text-3xl font-bold uppercase tracking-tight md:text-4xl">
                Nossa Metodologia
              </h2>
              <div className="mt-4 h-1 w-20 rounded bg-primary" />
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Cada projeto é tratado com dedicação exclusiva. Combinamos expertise técnica com uma gestão eficiente de recursos, garantindo que cada entrega supere as expectativas do cliente.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Da fase de diagnóstico até a entrega final, nossos engenheiros acompanham cada etapa com rigor, transparência e compromisso com a qualidade.
              </p>
              <Link href="/contato" className={buttonVariants({ className: "mt-8 h-12 px-7" })}>
                Agende uma consulta
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
