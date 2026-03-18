"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const partners = [
  {
    name: "Sócio 1",
    role: "Diretor Executivo",
    bio: "Profissional com vasta experiência na gestão de ativos imobiliários e estruturação de negócios. Possui longo histórico na viabilização de operações complexas de engenharia e incorporação com foco em retorno a longo prazo.",
  },
  {
    name: "Sócio 2",
    role: "Diretor de Engenharia",
    bio: "Especialista no desenvolvimento e acompanhamento técnico e construtivo de grandes obras. Garante a eficiência e segurança jurídica necessárias para transformar áreas em ativos rentáveis e sustentáveis.",
  },
  {
    name: "Sócio 3",
    role: "Diretor Comercial",
    bio: "Ampla vivência na comercialização estratégica de imóveis de alto padrão. Atua diretamente com proprietários, famílias e fundos buscando a melhor performance na ponta final de venda e locação do produto.",
  },
  {
    name: "Sócio 4",
    role: "Diretor Jurídico",
    bio: "Foco na preservação e sucessão do patrimônio imobiliário de famílias. Especialista em contratos estruturados, Due Diligence imobiliária e segurança regulatória em todos os estágios do desenvolvimento do ativo.",
  },
];

export default function QuemSomos() {
  return (
    <div className="flex flex-col pb-24">
      {/* Intro Section */}
      <section className="bg-muted py-24 text-center">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="mb-6 font-heading text-4xl font-bold uppercase tracking-tight md:text-5xl">
            Quem Somos
          </h1>
          <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
            Somos um grupo empresarial com forte atuação em engenharia e mercado imobiliário estruturado em cinco frentes complementares: <strong>• Engenharia - serviços • Incorporadora • Construtora • Imobiliária</strong>
          </p>
        </div>
      </section>

      {/* Mission & Target Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="rounded-2xl border p-10 shadow-sm">
            <h2 className="mb-4 font-heading text-2xl font-bold uppercase text-primary">Nossa Missão</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Nossa missão é transformar imóveis e áreas em ativos sólidos, legais e rentáveis, com visão de longo prazo, segurança jurídica e eficiência técnica.
            </p>
          </div>
          <div className="rounded-2xl border p-10 shadow-sm">
            <h2 className="mb-4 font-heading text-2xl font-bold uppercase text-primary">Atendemos</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Proprietários, famílias, investidores e empresas que buscam organização, crescimento e preservação do patrimônio imobiliário.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Curriculum Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-4xl font-bold uppercase tracking-tight">
            Currículo dos Sócios
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded bg-primary" />
        </div>

        <div className="flex flex-col gap-12">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm md:flex-row md:items-stretch h-auto md:h-80"
            >
              <div className="relative h-64 w-full md:h-auto md:w-1/2 shrink-0">
                <Image
                  src={`https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop&sig=${index}`}
                  alt={partner.name}
                  fill
                  className="object-cover pointer-events-none"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12 md:w-1/2">
                <h3 className="font-heading text-3xl font-bold uppercase text-foreground">
                  {partner.name}
                </h3>
                <p className="mt-2 text-xl font-medium text-primary">
                  {partner.role}
                </p>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  {partner.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
