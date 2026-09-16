"use client";

import Image from "next/image";
import Link from "next/link";
import { useActiveImage } from "@/hooks/useActiveImage";
import { DCORP_POSITIONING } from "@/lib/dcorp-content";

export function DcorpInstitutional() {
  const { imageUrl, altText } = useActiveImage(
    "construtora_execution",
    "/construtora/construtora-execucao.jpg",
  );

  return (
    <section className="bg-[#F7F7F7] px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden lg:col-span-5">
          <Image
            src={imageUrl}
            alt={altText || "Execução de obra DCORP"}
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-px bg-[#C9A96A]"
            aria-hidden="true"
          />
        </div>

        <div className="lg:col-span-7">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#C9A96A]" aria-hidden="true" />
            <p className="font-sans text-[11px] font-semibold uppercase text-[#C9A96A]">
              Como trabalhamos
            </p>
          </div>
          <h2 className="text-balance font-sans text-3xl font-bold text-[#1F1F1F] md:text-4xl lg:text-5xl">
            Construir hoje para gerar mais oportunidades amanhã.
          </h2>
          <div className="mt-8 space-y-5 text-pretty font-sans text-base leading-relaxed text-[#4D4D4D] md:text-lg">
            <p>{DCORP_POSITIONING}</p>
            <p>
              Inteligência construtiva, eficiência operacional e controle de
              qualidade — para entregar produtividade, redução de desperdícios e
              resultados concretos.
            </p>
          </div>

          <div className="mt-10 grid gap-6 border-t border-[#D9D9D9] pt-8 sm:grid-cols-3">
            {[
              {
                title: "Planejamento",
                detail: "Estratégia, inteligência e viabilidade.",
              },
              {
                title: "Pessoas",
                detail: "Confiança, parceria e relacionamento.",
              },
              {
                title: "Execução",
                detail: "Resultados, solidez e crescimento.",
              },
            ].map((pillar) => (
              <div key={pillar.title}>
                <p className="font-sans text-[11px] font-semibold uppercase text-[#C9A96A]">
                  {pillar.title}
                </p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-[#4D4D4D]">
                  {pillar.detail}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/quem-somos"
            className="t-learn mt-10 inline-flex items-center gap-2 font-sans text-[12px] font-semibold text-[#1F1F1F]"
          >
            Conhecer a DCORP
            <span className="t-learn-chevron" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  className="t-learn-arm t-learn-arm-top"
                  d="M6 4L10 8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  className="t-learn-arm t-learn-arm-bot"
                  d="M10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
