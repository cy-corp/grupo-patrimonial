"use client";

import Image from "next/image";
import { useState } from "react";
import { SegmentedControl } from "@/components/rendal/SegmentedControl";
import { Lightbox, useLightbox } from "@/components/rendal/empreendimentos/Gallery";
import { track } from "@/lib/rendal/track";
import { midiasDoEmpreendimento, type Empreendimento } from "@/lib/rendal/content/empreendimentos";

export function Plants({ item }: { item: Empreendimento }) {
  const [current, setCurrent] = useState(item.plantas[0]?.id ?? "");
  const planta = item.plantas.find((entry) => entry.id === current) ?? item.plantas[0];
  const { openAt, props } = useLightbox(midiasDoEmpreendimento(item));
  if (!planta) return null;

  const { width, height } = planta.imagem;

  return (
    <div>
      <SegmentedControl
        label="Plantas"
        value={current}
        onChange={(value) => {
          setCurrent(value);
          track("planta_toggle", { planta: value });
        }}
        options={item.plantas.map((entry) => ({ value: entry.id, label: entry.label }))}
      />
      <button
        type="button"
        onClick={() => openAt(planta.imagem.src)}
        aria-label={`Ampliar ${planta.imagem.alt}`}
        className="relative mx-auto mt-6 block cursor-zoom-in overflow-hidden rounded-3xl bg-[#EDE6DA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A4A2B]/50"
        style={{
          aspectRatio: `${width} / ${height}`,
          width: `min(100%, 28rem, calc(70svh * ${width / height}))`,
        }}
      >
        <Image
          key={planta.imagem.src}
          src={planta.imagem.src}
          alt={planta.imagem.alt}
          fill
          sizes="(max-width: 768px) 100vw, 448px"
          className="object-cover"
        />
      </button>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => openAt(planta.imagem.src)}
          className="inline-flex min-h-11 cursor-pointer items-center rounded-full px-4 text-sm font-semibold text-[#7A4A2B] ring-1 ring-[#7A4A2B]/30"
        >
          Tela cheia
        </button>
        {item.memorialPdf ? (
          <a
            href={item.memorialPdf}
            className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold text-[#1F1F1F]"
          >
            Baixar projeto em PDF
          </a>
        ) : null}
      </div>
      <Lightbox {...props} />
    </div>
  );
}
