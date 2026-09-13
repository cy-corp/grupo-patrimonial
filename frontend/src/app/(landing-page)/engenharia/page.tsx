"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, FileText, Leaf, Library, Map } from "lucide-react";
import { GoldButton } from "@/components/ui/gold-button";
import { useActiveImage } from "@/hooks/useActiveImage";
import { Execution } from "../construtora/components/Execution";
import { Pillars } from "../construtora/components/Pillars";

const technicalServices = [
  {
    icon: Compass,
    title: "Topografia",
    description: "Levantamentos planialtimétricos que formam a base do projeto.",
  },
  {
    icon: Map,
    title: "Georreferenciamento",
    description: "Certificação técnica de imóveis nos padrões normativos vigentes.",
  },
  {
    icon: FileText,
    title: "Regularização fundiária",
    description: "Consolidação da propriedade e regularização de posses.",
  },
  {
    icon: Leaf,
    title: "Projetos ambientais",
    description: "Estudos, licenciamentos e conformidade ecológica do ativo.",
  },
  {
    icon: Library,
    title: "Documentação técnica",
    description: "Gestão cartorial e técnica para o projeto chegar na obra sem ruído.",
  },
];

export default function EngenhariaPage() {
  const { imageUrl, altText } = useActiveImage("construtora_hero", "/construtora/construtora-hero.jpg");

  return (
    <main className="flex min-h-screen flex-col bg-[#F8F1E3] pt-16 md:pt-0">
      <section className="relative w-full overflow-hidden">
        <div className="relative hidden min-h-[85vh] items-center md:flex">
          <div className="absolute inset-0 z-0">
            <Image
              src={imageUrl}
              alt={altText || "Obra em execução pela DCorp"}
              fill
              className="object-cover brightness-75"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F8F1E3] via-[#F8F1E3]/90 to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto px-12 lg:px-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="h-px w-16 bg-primary" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
                  Engenharia
                </span>
              </div>
              <div className="mb-8 w-fit rounded-2xl bg-background px-5 py-4 ring-1 ring-graphite/10">
                <Image
                  src="/brands/dcorp-logo.png"
                  alt="DCorp Engenharia"
                  width={1016}
                  height={813}
                  className="h-16 w-auto max-w-[14rem] object-contain"
                />
              </div>
              <h1 className="mb-8 font-display text-5xl leading-[1.08] text-balance text-graphite lg:text-7xl">
                Da decisão à execução.
              </h1>
              <p className="max-w-xl border-l-2 border-primary/30 pl-8 font-sans text-xl leading-relaxed text-pretty text-graphite/70">
                Converte a estratégia da Rendal em engenharia: projeto, solução técnica e obra com controle em cada etapa.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col md:hidden">
          <div className="relative h-[45vh] w-full">
            <Image
              src={imageUrl}
              alt={altText || "Obra em execução pela DCorp"}
              fill
              className="object-cover brightness-90"
              priority
            />
          </div>
          <div className="relative z-10 -mt-28 rounded-t-[3rem] bg-[#F8F1E3] px-8 pt-12 pb-16">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-primary" />
              <span className="font-sans text-[8px] font-bold uppercase tracking-[0.3em] text-primary">
                Engenharia
              </span>
            </div>
            <div className="mb-6 w-fit rounded-2xl bg-background px-4 py-3 ring-1 ring-graphite/10">
              <Image
                src="/brands/dcorp-logo.png"
                alt="DCorp Engenharia"
                width={1016}
                height={813}
                className="h-12 w-auto max-w-[10rem] object-contain"
              />
            </div>
            <h1 className="mb-6 font-display text-4xl leading-[1.08] text-balance text-graphite">
              Da decisão à execução.
            </h1>
            <p className="font-sans text-lg leading-relaxed text-pretty text-graphite/80">
              Projeto, técnica e obra com previsibilidade.
            </p>
          </div>
        </div>
      </section>

      <Execution />
      <Pillars />

      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="mb-16 max-w-2xl">
            <span className="mb-4 block font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
              Base técnica
            </span>
            <h2 className="font-display text-4xl leading-[1.08] text-balance text-graphite md:text-5xl">
              Quando o projeto pede fundamento.
            </h2>
            <p className="mt-5 font-sans text-base leading-7 text-pretty text-graphite/60">
              Capacidade técnica que antecede o canteiro: o terreno, o documento e o licenciamento precisam estar resolvidos.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {technicalServices.map((service) => (
              <div key={service.title} className="border-t border-graphite/10 pt-6">
                <service.icon className="mb-4 size-5 text-primary" />
                <h3 className="mb-3 font-heading text-lg font-bold uppercase tracking-tight text-graphite">
                  {service.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-pretty text-graphite/60">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-graphite/5 py-24 md:py-40">
        <div className="container mx-auto px-6 text-center">
          <div className="mx-auto mb-16 h-px w-12 bg-primary" />
          <h2 className="mx-auto mb-12 max-w-4xl font-display text-3xl leading-[1.12] text-balance text-graphite md:text-5xl">
            Permanência não é acidente: é engenharia precisa e obra bem conduzida.
          </h2>
          <Link href="/contato#form-contato">
            <GoldButton className="px-12 py-6 text-xs font-bold uppercase tracking-[0.3em]">
              Fale com a DCorp
            </GoldButton>
          </Link>
        </div>
      </section>
    </main>
  );
}
