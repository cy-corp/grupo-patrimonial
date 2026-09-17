"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { DCORP_METHOD_STAGES } from "@/lib/dcorp-content";
import { cn } from "@/lib/utils";

type StageId = (typeof DCORP_METHOD_STAGES)[number]["id"];

const ASSET_V = "8";
const BEAUTY_SRC = `/dcorp/method/house-original-beauty.png?v=${ASSET_V}`;

const STAGE_IMAGES: Record<StageId, string> = {
  fundacao: `/dcorp/method/house-fundacao.png?v=${ASSET_V}`,
  estrutura: `/dcorp/method/house-estrutura.png?v=${ASSET_V}`,
  instalacoes: `/dcorp/method/house-instalacoes.png?v=${ASSET_V}`,
  revestimentos: `/dcorp/method/house-revestimentos.png?v=${ASSET_V}`,
  entrega: `/dcorp/method/house-entrega.png?v=${ASSET_V}`,
};

/** Hit zones in beauty pixel space (1152×864). */
const HIT_ZONES: { id: StageId; d: string }[] = [
  { id: "estrutura", d: "M133 318 H1016 V598 H133 Z" },
  { id: "revestimentos", d: "M133 318 H1016 V575 H133 Z" },
  { id: "fundacao", d: "M76 598 H1036 L1086 678 H26 Z" },
  { id: "entrega", d: "M140 318 L576 188 L1016 318 L1016 348 L140 348 Z" },
  { id: "instalacoes", d: "M520 360 H960 V575 H520 Z" },
];

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return fine;
}

export function DcorpMethodHouse() {
  const reduceMotion = useReducedMotion();
  const fine = useFinePointer();
  const [active, setActive] = useState<StageId | null>(null);
  const [locked, setLocked] = useState<StageId | null>(null);

  const shown = locked ?? active;

  const preview = useCallback(
    (id: StageId | null) => {
      if (fine && !locked) setActive(id);
    },
    [fine, locked],
  );

  const select = useCallback((id: StageId) => {
    setLocked((prev) => {
      const next = prev === id ? null : id;
      setActive(next);
      return next;
    });
  }, []);

  return (
    <div className="mt-12 grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div
        className="relative aspect-[4/3] overflow-hidden border border-[#D9D9D9] bg-[#F7F7F7] lg:col-span-7"
        data-active={shown ?? undefined}
      >
        <div
          className={cn(
            "absolute inset-0 origin-[50%_78%]",
            !reduceMotion && "dcorp-method-house-idle",
          )}
        >
          <Image
            src={BEAUTY_SRC}
            alt="Casa DCORP — visualização do método"
            fill
            priority
            unoptimized
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-contain"
          />
          {shown ? (
            <>
              <Image
                key={shown}
                src={STAGE_IMAGES[shown]}
                alt=""
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="pointer-events-none object-contain"
              />
              {/* Cutout alpha → gold wash (raw extract ≈ beauty, needs tint to read) */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundColor: "rgba(201, 169, 106, 0.42)",
                  mixBlendMode: "soft-light",
                  WebkitMaskImage: `url(${STAGE_IMAGES[shown]})`,
                  maskImage: `url(${STAGE_IMAGES[shown]})`,
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
            </>
          ) : null}
        </div>

        <svg
          viewBox="0 0 1152 864"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {HIT_ZONES.map((zone) => (
            <path
              key={zone.id}
              d={zone.d}
              className="cursor-pointer fill-transparent"
              onPointerEnter={() => preview(zone.id)}
              onPointerLeave={() => preview(null)}
              onClick={() => select(zone.id)}
            />
          ))}
        </svg>

        <p className="pointer-events-none absolute bottom-2.5 left-3 font-sans text-[10px] uppercase tracking-wide text-[#1F1F1F]/35">
          {fine ? "Passe o mouse nas partes" : "Toque nas partes"}
        </p>
      </div>

      <ol className="border-t border-[#D9D9D9] lg:col-span-5">
        {DCORP_METHOD_STAGES.map((stage, index) => {
          const isActive = shown === stage.id;
          return (
            <li key={stage.id}>
              <button
                type="button"
                onPointerEnter={() => preview(stage.id)}
                onPointerLeave={() => preview(null)}
                onClick={() => select(stage.id)}
                aria-pressed={isActive}
                className={cn(
                  "grid w-full grid-cols-[2.6rem_1fr] gap-3 border-b border-[#D9D9D9] py-3.5 text-left transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] md:gap-4 md:py-4",
                  "hover:bg-[#C9A96A]/[0.08] focus-visible:bg-[#C9A96A]/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96A]/45",
                  isActive && "bg-[#C9A96A]/[0.08] shadow-[inset_2px_0_0_#C9A96A]",
                )}
              >
                <span
                  className={cn(
                    "font-sans text-lg font-bold tabular-nums text-[#C9A96A] transition-opacity duration-200 md:text-xl",
                    isActive ? "opacity-100" : "opacity-45",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block font-sans text-[15px] font-semibold text-[#1F1F1F] md:text-base">
                    {stage.title}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block font-sans text-xs leading-relaxed text-[#4D4D4D] transition-opacity duration-200 md:text-sm",
                      isActive ? "opacity-100" : "opacity-75",
                    )}
                  >
                    {stage.detail}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
