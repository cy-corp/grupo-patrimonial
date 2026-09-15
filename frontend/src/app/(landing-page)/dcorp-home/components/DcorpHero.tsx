"use client";

import Image from "next/image";
import Link from "next/link";
import { useActiveImage } from "@/hooks/useActiveImage";
import { GoldButton } from "@/components/ui/gold-button";

export function DcorpHero() {
  const { imageUrl, altText } = useActiveImage(
    "dcorp_hero",
    "/construtora/construtora-hero.jpg",
  );

  return (
    <section className="relative isolate min-h-dvh w-full overflow-hidden bg-[#1F1F1F]">
      <Image
        src={imageUrl}
        alt={altText || "Obra de construção industrial DCORP"}
        fill
        unoptimized
        priority
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-[#1F1F1F]/65"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-dvh flex-col justify-end px-6 pb-16 pt-28 md:justify-center md:px-12 md:pb-24 lg:px-20">
        <div className="dcorp-hero-copy max-w-3xl">
          <p className="mb-5 font-sans text-[11px] font-semibold uppercase text-[#C9A96A] md:mb-6 md:text-xs">
            DCORP Engenharia
          </p>
          <h1 className="text-balance font-sans text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Construção industrial com planejamento, execução e resultados.
          </h1>
          <p className="mt-6 max-w-xl text-pretty font-sans text-base leading-relaxed text-white/75 md:mt-8 md:text-lg">
            Projetos que constroem oportunidades — inteligência construtiva,
            eficiência operacional e entrega previsível.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <GoldButton
              href="/contato?empresa=dcorp"
              className="h-11 px-7 text-[12px] tracking-[0.12em]"
            >
              Solicitar orçamento
            </GoldButton>
            <Link
              href="/sistemas-construtivos"
              className="inline-flex h-11 items-center justify-center rounded-md border border-white/25 px-6 text-[12px] font-semibold text-white transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:border-white/50 hover:bg-white/5"
            >
              Ver sistemas construtivos
            </Link>
          </div>
        </div>

        <div className="mt-14 hidden items-center gap-8 border-t border-white/15 pt-6 md:flex">
          {["Planejamento", "Execução", "Resultados"].map((item, index) => (
            <div key={item} className="flex items-center gap-8">
              {index > 0 && (
                <span className="h-px w-8 bg-[#C9A96A]/60" aria-hidden="true" />
              )}
              <span className="font-sans text-[11px] font-semibold uppercase text-white/70">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
