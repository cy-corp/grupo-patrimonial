"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "@phosphor-icons/react";
import { RendalReveal } from "../incorporadora/RendalReveal";

const EASE = "cubic-bezier(0.32,0.72,0,1)";

const PROJECTS = [
  {
    slug: "capetinga",
    name: "Residencial Capetinga",
    status: "Referência de produto",
    city: "Região de Campinas, SP",
    blurb:
      "Laje de lazer, lavabo social e acabamento de presença. O case que define o padrão Rendal para classes B e C.",
    image: "/referencia/capetinga-dener/render-fachada-dia.jpg",
    imageAlt: "Fachada do Residencial Capetinga ao dia",
  },
] as const;

export default function EmpreendimentosPage() {
  return (
    <main className="min-h-screen bg-[#F8F1E3] font-sans">
      <section className="border-b border-[#1F1F1F]/10 bg-[#1F1F1F] px-6 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-[680px] text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#C9A96A]">
            Empreendimentos
          </p>
          <h1
            className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl"
            style={{
              backgroundImage: "linear-gradient(90deg, #FFFFFF 0%, #9B9B9B 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Casas com presença, no preço que cabe
          </h1>
          <p className="mt-6 text-base leading-7 text-pretty text-white/75 sm:text-lg sm:leading-8">
            Conheça o produto Rendal. Visita sem compromisso. Sem reserva
            obrigatória no primeiro contato.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20 md:py-24" aria-label="Lista de empreendimentos">
        <div className="mx-auto flex max-w-5xl flex-col gap-10">
          {PROJECTS.map((project, index) => (
            <RendalReveal key={project.slug} delayMs={index * 80}>
              <article className="overflow-hidden rounded-2xl bg-white ring-1 ring-[#1F1F1F]/10">
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[320px]">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
                    <p className="text-sm font-semibold text-[#0F5B63]">
                      {project.status}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-balance text-[#1F1F1F] sm:text-3xl">
                      {project.name}
                    </h2>
                    <p className="mt-3 flex items-center gap-2 text-sm text-[#1F1F1F]/65">
                      <MapPin weight="duotone" className="size-5 shrink-0 text-[#0F5B63]" aria-hidden />
                      {project.city}
                    </p>
                    <p className="mt-4 text-base leading-7 text-pretty text-[#1F1F1F]/70">
                      {project.blurb}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href="/contato?empresa=rendal&assunto=visita"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F5B63] px-3 py-2 text-base font-semibold text-white transition-all duration-700 hover:bg-[#0A3F45] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5B63] active:scale-[0.98]"
                        style={{ transitionTimingFunction: EASE }}
                      >
                        Agendar visita
                        <ArrowRight weight="bold" className="size-4" aria-hidden />
                      </Link>
                      <Link
                        href="/contato?empresa=rendal"
                        className="inline-flex items-center justify-center rounded-full bg-transparent px-3 py-2 text-base font-semibold text-[#0F5B63] ring-1 ring-[#0F5B63]/40 transition-all duration-700 hover:bg-[#0F5B63]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5B63] active:scale-[0.98]"
                        style={{ transitionTimingFunction: EASE }}
                      >
                        Falar com a equipe
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </RendalReveal>
          ))}
        </div>
      </section>

      <section className="border-t border-[#1F1F1F]/10 bg-white px-6 py-16 text-center sm:py-20">
        <div className="mx-auto max-w-[680px]">
          <h2 className="text-2xl font-semibold tracking-tight text-balance text-[#1F1F1F] sm:text-3xl">
            Quer ser avisado do próximo lançamento?
          </h2>
          <p className="mt-4 text-base leading-7 text-pretty text-[#1F1F1F]/70">
            Deixe seu contato. A equipe retorna com disponibilidade de visita e
            novidades de produto.
          </p>
          <Link
            href="/contato?empresa=rendal"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#0F5B63] px-3 py-2 text-base font-semibold text-white transition-all duration-700 hover:bg-[#0A3F45] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5B63] active:scale-[0.98]"
            style={{ transitionTimingFunction: EASE }}
          >
            Entrar em contato
          </Link>
        </div>
      </section>
    </main>
  );
}
