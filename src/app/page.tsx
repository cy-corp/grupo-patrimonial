"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import {
  ArrowRight,
  HardHat,
  Building2,
  Hammer,
  Home as HomeIcon,
  Shield,
  Network,
  TrendingUp,
  CheckCircle2,
  Phone,
} from "lucide-react";

const services = [
  {
    icon: HardHat,
    title: "Engenharia",
    description:
      "Projetos técnicos e consultoria especializada em engenharia civil, garantindo qualidade e segurança em cada obra.",
    href: "/engenharia",
    color: "from-amber-500/10 to-amber-600/5",
  },
  {
    icon: Building2,
    title: "Incorporadora",
    description:
      "Desenvolvimento imobiliário estratégico, transformando áreas em empreendimentos de alto valor e retorno garantido.",
    href: "/incorporadora",
    color: "from-yellow-500/10 to-yellow-600/5",
  },
  {
    icon: Hammer,
    title: "Construtora",
    description:
      "Execução de obras com excelência técnica, gerenciamento rigoroso e compromisso com prazos e qualidade.",
    href: "/construtora",
    color: "from-orange-500/10 to-orange-600/5",
  },
  {
    icon: HomeIcon,
    title: "Imobiliária",
    description:
      "Comercialização estratégica de imóveis de alto padrão, conectando proprietários e compradores com inteligência de mercado.",
    href: "/imobiliaria",
    color: "from-amber-400/10 to-amber-500/5",
  },
  {
    icon: Shield,
    title: "Patrimonial",
    description:
      "Gestão, proteção e sucessão de patrimônios imobiliários com segurança jurídica e visão de longo prazo.",
    href: "/patrimonial",
    color: "from-yellow-400/10 to-yellow-500/5",
  },
  {
    icon: Network,
    title: "Integração",
    description:
      "Sinergia entre todas as frentes do grupo para uma solução completa e integrada do início ao fim do projeto.",
    href: "/integracao",
    color: "from-amber-600/10 to-amber-700/5",
  },
  {
    icon: TrendingUp,
    title: "Investidores",
    description:
      "Oportunidades de investimento com transparência, rentabilidade e suporte especializado em todo o ciclo imobiliário.",
    href: "/investidores",
    color: "from-orange-400/10 to-orange-500/5",
  },
];

const stats = [
  { value: "15+", label: "Anos de Experiência" },
  { value: "200+", label: "Projetos Entregues" },
  { value: "R$ 1B+", label: "Em Ativos Geridos" },
  { value: "500+", label: "Clientes Satisfeitos" },
];

const differentials = [
  "Atuação integrada em todo o ciclo imobiliário",
  "Equipe multidisciplinar com expertise comprovada",
  "Segurança jurídica em cada etapa do processo",
  "Foco em rentabilidade e preservação patrimonial",
  "Transparência total com investidores e clientes",
  "Tecnologia e inovação aplicadas ao setor imobiliário",
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Edifícios corporativos modernos"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/80 dark:bg-background/90" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="mb-6 inline-block rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-primary">
              Grupo Patrimonial
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mx-auto max-w-5xl font-heading text-4xl font-bold uppercase leading-tight md:text-6xl"
          >
            <span className="text-primary">Engenharia,</span> Incorporação,
            Construção, Imobiliária e Gestão Patrimonial
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground md:text-2xl"
          >
            Soluções completas para desenvolver, proteger, valorizar e perpetuar
            patrimônios imobiliários.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mx-auto mt-6 max-w-3xl text-lg text-foreground"
          >
            Atuamos de forma integrada desde a origem do ativo (terra ou
            imóvel), passando pelo desenvolvimento técnico e construtivo, até a
            gestão patrimonial e comercialização estratégica.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/contato"
              className={buttonVariants({
                size: "lg",
                className: "h-14 px-8 text-lg",
              })}
            >
              Fale com um especialista
            </Link>
            <Link
              href="/orcamento"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "h-14 px-8 text-lg",
              })}
            >
              Solicite uma análise <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="text-center"
              >
                <p className="font-heading text-4xl font-bold text-primary md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-16 text-center"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              O que fazemos
            </p>
            <h2 className="font-heading text-4xl font-bold uppercase tracking-tight md:text-5xl">
              Nossas Frentes de Atuação
            </h2>
            <div className="mx-auto mt-4 h-1 w-24 rounded bg-primary" />
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Uma estrutura completa e integrada para cada fase do ciclo
              imobiliário, do projeto à gestão final do ativo.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUp}
                >
                  <Link
                    href={service.href}
                    className="group flex h-full flex-col rounded-2xl border bg-gradient-to-br p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                    }}
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-bold uppercase tracking-tight text-foreground">
                      {service.title}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Saiba mais <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section className="bg-muted/40 py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
            >
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                Por que nos escolher
              </p>
              <h2 className="font-heading text-4xl font-bold uppercase tracking-tight md:text-5xl">
                Nossos Diferenciais
              </h2>
              <div className="mt-4 h-1 w-24 rounded bg-primary" />
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Somos mais do que prestadores de serviço — somos parceiros
                estratégicos no crescimento e preservação do seu patrimônio
                imobiliário.
              </p>
              <ul className="mt-8 space-y-4">
                {differentials.map((item, i) => (
                  <motion.li
                    key={i}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="relative h-[500px] overflow-hidden rounded-2xl shadow-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"
                alt="Reunião de negócios imobiliários"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-primary/30 bg-background/80 p-5 backdrop-blur-sm">
                <p className="font-heading text-lg font-bold text-primary">
                  +15 anos transformando patrimônios
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Da consultoria inicial à entrega final, estamos com você em
                  cada etapa.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2000&auto=format&fit=crop"
            alt="Background"
            fill
            className="object-cover opacity-20 dark:opacity-10"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Pronto para começar?
            </p>
            <h2 className="mx-auto max-w-3xl font-heading text-4xl font-bold uppercase tracking-tight md:text-5xl">
              Transforme Seu Patrimônio Hoje
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Entre em contato com nossa equipe de especialistas e descubra como
              podemos maximizar o potencial do seu investimento imobiliário.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contato"
                className={buttonVariants({
                  size: "lg",
                  className: "h-14 px-8 text-lg",
                })}
              >
                <Phone className="mr-2 h-5 w-5" />
                Fale com um especialista
              </Link>
              <Link
                href="/quem-somos"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "h-14 px-8 text-lg",
                })}
              >
                Conheça nossa equipe <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
