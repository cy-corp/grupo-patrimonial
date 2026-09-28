"use client";

import Image from "next/image";
import Link from "next/link";
import { Quotes } from "@phosphor-icons/react";
import { RendalReveal } from "./RendalReveal";
import { primaryEmpreendimentoHref } from "@/lib/rendal/content/empreendimentos";

const EASE = "cubic-bezier(0.32,0.72,0,1)";

export function RendalSocialProof() {
  return (
    <section
      className="bg-[#F8F1E3] px-6 py-12 sm:py-20 md:py-24"
      aria-labelledby="prova-titulo"
    >
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <RendalReveal>
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#1F1F1F] lg:aspect-[4/3]">
            <Image
              src="/wireframes/laje-dia.jpg"
              alt="Laje de lazer do Residencial Capetinga, referência de produto Rendal"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </RendalReveal>

        <RendalReveal delayMs={120}>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0F5B63]">
              Referência de produto
            </p>
            <h2
              id="prova-titulo"
              className="mt-3 text-3xl font-semibold tracking-tight text-balance text-[#1F1F1F] sm:text-4xl"
            >
              Residencial Capetinga
            </h2>
            <p className="mt-4 text-base leading-7 text-pretty text-[#1F1F1F]/70 sm:text-lg sm:leading-8">
              Um projeto que reúne laje de lazer, lavabo social e acabamento
              pensado para o uso diário. É assim que a Rendal transforma
              decisões de orçamento em experiência de morar.
            </p>

            <blockquote className="mt-8 rounded-2xl bg-white p-6 ring-1 ring-[#1F1F1F]/10 sm:p-8">
              <Quotes
                weight="fill"
                className="size-6 text-[#0F5B63]"
                aria-hidden
              />
              <p className="mt-3 text-lg leading-8 text-pretty text-[#1F1F1F]">
                O capital foi alocado onde o morador sente: no uso, no acabamento
                e no que a casa entrega no dia a dia.
              </p>
              <footer className="mt-4 text-sm font-semibold text-[#1F1F1F]/70">
                Decisão de projeto · Residencial Capetinga
              </footer>
            </blockquote>

            <Link
              href={primaryEmpreendimentoHref()}
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[#0F5B63] px-6 py-2.5 text-base font-semibold text-white transition-all duration-700 hover:bg-[#0A3F45] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5B63] active:scale-[0.98]"
              style={{ transitionTimingFunction: EASE }}
            >
              Conhecer o empreendimento
            </Link>
          </div>
        </RendalReveal>
      </div>
    </section>
  );
}
