"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/rendal/tokens";
import { ETAPA_OBRA_STATUS, type EtapaObra } from "@/lib/rendal/content/empreendimentos";

export function etapaAnchor(id: string) {
  return `obra-${id}`;
}

function scrollCardToCenter(root: HTMLElement, card: HTMLElement, smooth: boolean) {
  if (window.matchMedia("(min-width: 768px)").matches) return;
  const rootRect = root.getBoundingClientRect();
  const itemRect = card.getBoundingClientRect();
  const delta = itemRect.left + itemRect.width / 2 - (rootRect.left + rootRect.width / 2);
  if (Math.abs(delta) < 2) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.scrollTo({
    left: root.scrollLeft + delta,
    behavior: smooth && !reduce ? "smooth" : "auto",
  });
}

export function ObraNav({
  etapas,
  activeId,
  onSelect,
  promoted = false,
}: {
  etapas: EtapaObra[];
  activeId: string;
  onSelect: (id: string) => void;
  promoted?: boolean;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const fromClick = useRef(false);

  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    if (fromClick.current) {
      fromClick.current = false;
      return;
    }
    const current = root.querySelector<HTMLElement>(`[data-etapa="${activeId}"]`);
    if (!current) return;
    scrollCardToCenter(root, current, true);

    const onResize = () => {
      const card = root.querySelector<HTMLElement>(`[data-etapa="${activeId}"]`);
      if (card) scrollCardToCenter(root, card, false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeId]);

  return (
    <div
      className={cn(
        "sticky z-30 mb-10 -mx-6 rounded-b-3xl bg-[#F8F1E3]/92 px-4 pt-3 pb-3 ring-1 ring-[#1F1F1F]/5 backdrop-blur-md transition-[top,box-shadow,padding] duration-500 motion-reduce:transition-none sm:px-6",
        promoted
          ? "top-0 z-50 bg-[#F8F1E3]/95 pt-[max(0.75rem,env(safe-area-inset-top))] shadow-[0_8px_32px_rgba(31,31,31,0.08)]"
          : "top-20 sm:top-24",
      )}
      style={{ transitionTimingFunction: EASE }}
    >
      <div
        ref={scroller}
        className="flex gap-2 overflow-x-auto overscroll-x-contain px-[max(0px,calc((100%-clamp(9rem,42vw,12rem))/2))] pb-1 [overflow-anchor:none] [scrollbar-width:none] [-ms-overflow-style:none] md:grid md:grid-cols-5 md:overflow-visible md:overscroll-x-auto md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {etapas.map((etapa, index) => {
          const on = etapa.id === activeId;
          const count = etapa.midias.length;
          return (
            <button
              key={etapa.id}
              type="button"
              data-etapa={etapa.id}
              aria-current={on ? "true" : undefined}
              onPointerDown={(event) => event.preventDefault()}
              onClick={(event) => {
                fromClick.current = true;
                const root = scroller.current;
                if (root) scrollCardToCenter(root, event.currentTarget, true);
                onSelect(etapa.id);
              }}
              className={cn(
                "flex min-h-11 w-[clamp(9rem,42vw,12rem)] shrink-0 cursor-pointer flex-col gap-1 rounded-2xl px-4 py-3 text-left transition-colors duration-500 motion-reduce:transition-none md:w-auto md:max-w-none md:px-3",
                on ? "bg-[#1F1F1F] text-white" : "bg-white text-[#1F1F1F]",
              )}
              style={{ transitionTimingFunction: EASE }}
            >
              <span className="text-xs font-semibold tabular-nums tracking-widest text-[#C9A96A]">
                {String(index + 1).padStart(2, "0")}
                {count ? (
                  <span className={cn("ml-1.5 tracking-normal", on ? "text-white/55" : "text-[#1F1F1F]/40")}>
                    {count}
                  </span>
                ) : null}
              </span>
              <span className="text-sm font-semibold leading-5 text-pretty whitespace-nowrap">
                {etapa.label ?? etapa.titulo}
              </span>
              <span className={cn("text-xs", on ? "text-white/55" : "text-[#1F1F1F]/45")}>
                {ETAPA_OBRA_STATUS[etapa.status]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
