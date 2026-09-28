"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/rendal/tokens";
import { SegmentedControl } from "@/components/rendal/SegmentedControl";
import { StatusChip } from "@/components/rendal/StatusChip";
import { RendalButton } from "@/components/rendal/RendalButton";
import { track } from "@/lib/rendal/track";
import type { Empreendimento } from "@/lib/rendal/content/empreendimentos";
import { fatosDoEmpreendimento } from "@/lib/rendal/content/empreendimentos";

export function ProjectHero({ item }: { item: Empreendimento }) {
  const [period, setPeriod] = useState<"dia" | "noite">("dia");
  const media = period === "dia" ? item.heroDia : item.heroNoite;

  return (
    <section id="page-hero" className="rendal-hero-paper relative bg-[#F8F1E3] px-6 pt-36 pb-12">
      <div className="relative z-[1] mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div>
          <SegmentedControl
            label="Horário da fachada"
            value={period}
            onChange={setPeriod}
            options={[
              { value: "dia", label: "Dia" },
              { value: "noite", label: "Noite" },
            ]}
          />
          <div className="relative mt-4 aspect-[4/5] max-h-[60svh] overflow-hidden rounded-3xl bg-[#EDE6DA] lg:aspect-video lg:max-h-none">
            <Image
              src={media.src}
              alt={media.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 720px"
              className="object-cover transition-opacity duration-700 motion-reduce:transition-none"
              style={{ transitionTimingFunction: EASE }}
            />
          </div>
        </div>
        <div>
          <StatusChip status={item.status} />
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-[#1F1F1F] sm:text-5xl">
            {item.nome}
          </h1>
          <p className="mt-3 text-base text-[#1F1F1F]/70">{item.bairro ?? item.cidade}</p>
          <p className="mt-4 text-base leading-7 text-[#1F1F1F]/70">{fatosDoEmpreendimento(item)}</p>
          <RendalButton
            href="#visita"
            className="mt-8"
            onClick={() => track("cta_visita_click")}
          >
            Agendar visita
          </RendalButton>
        </div>
      </div>
    </section>
  );
}
