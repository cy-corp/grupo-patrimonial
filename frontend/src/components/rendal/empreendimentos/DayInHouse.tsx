"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/rendal/tokens";
import { Lightbox, useLightbox } from "@/components/rendal/empreendimentos/Gallery";
import {
  midiasDoEmpreendimento,
  type Area,
  type DiaPasso,
  type Empreendimento,
} from "@/lib/rendal/content/empreendimentos";

const PLANT_MAX_HEIGHT = "65svh";

function clip({ x, y, w, h }: Area) {
  return `inset(${y}% ${100 - x - w}% ${100 - y - h}% ${x}% round 10px)`;
}

function Plant({
  item,
  step,
  slots,
  onOpen,
  className,
}: {
  item: Empreendimento;
  step: DiaPasso;
  slots: number;
  onOpen: (src: string) => void;
  className?: string;
}) {
  const planta = item.plantas.find((entry) => entry.id === step.planta) ?? item.plantas[0];
  const { width, height } = planta.imagem;
  const first = step.areas[0];
  const collapsed: Area = { x: first.x + first.w / 2, y: first.y + first.h / 2, w: 0, h: 0 };
  const transition = { transitionTimingFunction: EASE };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => onOpen(planta.imagem.src)}
        aria-label={`Ampliar ${planta.imagem.alt}`}
        className="group relative mx-auto block cursor-zoom-in overflow-hidden rounded-3xl bg-[#EDE6DA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A4A2B]/50"
        style={{
          aspectRatio: `${width} / ${height}`,
          width: `min(100%, 28rem, calc(${PLANT_MAX_HEIGHT} * ${width / height}))`,
        }}
      >
        <Image
          key={planta.imagem.src}
          src={planta.imagem.src}
          alt={planta.imagem.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 448px"
          className="object-cover"
        />
        <span aria-hidden className="absolute inset-0 bg-[#F8F1E3]/60" />

        {Array.from({ length: slots }, (_, index) => {
          const area = step.areas[index];
          const shape = area ?? collapsed;
          return (
            <span key={index} aria-hidden>
              <span
                className="absolute inset-0 transition-[clip-path,opacity] duration-500 motion-reduce:transition-none"
                style={{ ...transition, clipPath: clip(shape), opacity: area ? 1 : 0 }}
              >
                <Image
                  key={planta.imagem.src}
                  src={planta.imagem.src}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 448px"
                  className="object-cover"
                />
              </span>
              <span
                className="pointer-events-none absolute rounded-[10px] ring-2 ring-[#7A4A2B] shadow-[0_0_0_4px_rgba(122,74,43,0.18)] transition-[left,top,width,height,opacity] duration-500 motion-reduce:transition-none"
                style={{
                  ...transition,
                  left: `${shape.x}%`,
                  top: `${shape.y}%`,
                  width: `${shape.w}%`,
                  height: `${shape.h}%`,
                  opacity: area ? 1 : 0,
                }}
              />
            </span>
          );
        })}

        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#1F1F1F] px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
          {planta.label}
          <span aria-hidden className="text-white/50">·</span>
          {step.ambiente}
        </span>
        <span
          aria-hidden
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#1F1F1F] shadow-sm transition-colors duration-300 group-hover:bg-white"
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 2h4v4M6 14H2v-4M14 2 9 7M2 14l5-5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Ampliar
        </span>
      </button>
    </div>
  );
}

export function DayInHouse({ item }: { item: Empreendimento }) {
  const [active, setActive] = useState(0);
  const step = item.diaNaCasa[active] ?? item.diaNaCasa[0];
  const slots = Math.max(1, ...item.diaNaCasa.map((passo) => passo.areas.length));
  const { openAt, props } = useLightbox(midiasDoEmpreendimento(item));

  if (!step) return null;

  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      <Plant
        item={item}
        step={step}
        slots={slots}
        onOpen={openAt}
        className="sticky top-24 max-lg:static"
      />
      <ol className="m-0 flex list-none flex-col gap-3 p-0">
        {item.diaNaCasa.map((passo, index) => {
          const on = active === index;
          const planta = item.plantas.find((entry) => entry.id === passo.planta);
          return (
            <li key={passo.hora}>
              <button
                type="button"
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                aria-pressed={on}
                className={cn(
                  "w-full cursor-pointer rounded-3xl p-5 text-left ring-1 transition-[background-color,box-shadow] duration-500 motion-reduce:transition-none",
                  on
                    ? "bg-[#7A4A2B]/[0.05] ring-2 ring-[#7A4A2B] shadow-[0_0_0_4px_rgba(122,74,43,0.12)]"
                    : "bg-white ring-[#1F1F1F]/10 hover:ring-[#7A4A2B]/30",
                )}
                style={{ transitionTimingFunction: EASE }}
              >
                <p className="flex items-center gap-2 text-sm font-semibold tabular-nums text-[#7A4A2B]">
                  {passo.hora}
                  <span aria-hidden className="text-[#7A4A2B]/40">·</span>
                  <span className="font-medium text-[#7A4A2B]/80">
                    {planta ? `${planta.label} · ` : ""}
                    {passo.ambiente}
                  </span>
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-balance text-[#1F1F1F]">
                  {passo.titulo}
                </h3>
                <p className="mt-2 text-base leading-7 text-pretty text-[#1F1F1F]/70">{passo.texto}</p>
              </button>
            </li>
          );
        })}
      </ol>
      <Lightbox {...props} />
    </div>
  );
}
