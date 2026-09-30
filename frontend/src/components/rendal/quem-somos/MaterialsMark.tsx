"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/rendal/tokens";
import { IDLE, LOGO_BRUTA, MATERIAS, type MateriaId } from "@/lib/rendal/content/materias";
import { SHAPES } from "@/lib/rendal/content/materias-shapes";

/**
 * Como funciona
 * - O logo é UM <image> só. Empilhar o PNG (alfa nas bordas) estoura o metal das letras.
 * - Destaque: véu creme nas pedras inativas. RENDAL e a pedra ativa ficam no render original.
 * - Hit area = contorno da pedra. Teclado/leitor usam o trilho abaixo.
 */

const VIEWBOX = "380 -20 1436 750";
const VEIL = 0.62;

const ease: CSSProperties = { transitionTimingFunction: EASE };
const fade = "transition-[opacity,transform] duration-700 motion-reduce:transition-none";

function Stage({
  activeId,
  onSelect,
}: {
  activeId: MateriaId | null;
  onSelect: (id: MateriaId) => void;
}) {
  return (
    <svg
      viewBox={VIEWBOX}
      aria-hidden
      className="block h-auto w-full touch-manipulation select-none"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <image
        href={LOGO_BRUTA.src}
        width={LOGO_BRUTA.width}
        height={LOGO_BRUTA.height}
        preserveAspectRatio="xMidYMid meet"
      />

      {MATERIAS.map((m) => (
        <path
          key={`veil-${m.id}`}
          d={SHAPES[m.id].d}
          fill="#F8F1E3"
          pointerEvents="none"
          className={fade}
          style={{ ...ease, opacity: activeId && activeId !== m.id ? VEIL : 0 }}
        />
      ))}

      {MATERIAS.map((m) => (
        <path
          key={m.id}
          d={SHAPES[m.id].d}
          fill="transparent"
          className="cursor-pointer"
          onPointerEnter={(e) => e.pointerType === "mouse" && onSelect(m.id)}
          onClick={() => onSelect(m.id)}
        />
      ))}
    </svg>
  );
}

export function MaterialsMark() {
  const [activeId, setActiveId] = useState<MateriaId>("terra");
  const railRef = useRef<HTMLOListElement>(null);

  const activeIndex = MATERIAS.findIndex((m) => m.id === activeId);

  const onRailKey = (event: KeyboardEvent<HTMLOListElement>) => {
    const dir =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;
    if (!dir) return;
    event.preventDefault();
    const from = activeIndex < 0 ? (dir === 1 ? -1 : 0) : activeIndex;
    const next = (from + dir + MATERIAS.length) % MATERIAS.length;
    setActiveId(MATERIAS[next].id);
    railRef.current?.querySelectorAll("button")[next]?.focus();
  };

  const chapters = [{ ...IDLE, id: "idle" as const }, ...MATERIAS];

  return (
    <div onKeyDown={(e) => e.key === "Escape" && setActiveId(null)}>
      <div
        role="group"
        aria-label="Quatro matérias da marca Rendal"
        className="isolate mix-blend-normal"
      >
        <Stage activeId={activeId} onSelect={setActiveId} />
        <p className="sr-only">{LOGO_BRUTA.alt}</p>
      </div>

      <ol
        ref={railRef}
        onKeyDown={onRailKey}
        className="m-0 mt-6 grid list-none grid-cols-4 gap-2 p-0 sm:gap-4"
      >
        {MATERIAS.map((m, i) => {
          const on = activeId === m.id;
          const reached = activeIndex >= i;
          return (
            <li key={m.id}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setActiveId(m.id)}
                className="block min-h-11 w-full cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A4A2B]"
              >
                <span className="block h-0.5 overflow-hidden rounded-full bg-[#1F1F1F]/15">
                  <span
                    className={cn("block h-full origin-left bg-[#7A4A2B]", fade)}
                    style={{ ...ease, transform: `scaleX(${reached ? 1 : 0})` }}
                  />
                </span>
                <span
                  className={cn(
                    "mt-3 block transition-opacity duration-700 motion-reduce:transition-none",
                    on ? "opacity-100" : "opacity-55",
                  )}
                  style={ease}
                >
                  <span className="block text-xs font-semibold tabular-nums text-[#7A4A2B]">{m.n}</span>
                  <span className="block text-sm font-semibold text-[#1F1F1F] sm:text-base">{m.nome}</span>
                  <span className="hidden text-sm text-[#1F1F1F]/70 sm:block">{m.epoca}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* capítulos empilhados na mesma célula: a altura é a do maior, sem pulo de layout */}
      <div aria-live="polite" className="mx-auto mt-8 grid max-w-[680px] text-center">
        {chapters.map((c, i) => {
          const on = i === activeIndex + 1;
          return (
            <div
              key={c.id}
              aria-hidden={!on}
              {...(!on ? { inert: true } : {})}
              className={cn("col-start-1 row-start-1", fade)}
              style={{ ...ease, opacity: on ? 1 : 0, transform: `translateY(${on ? 0 : 8}px)` }}
            >
              <p className="text-sm font-semibold tabular-nums text-[#7A4A2B]">
                {c.n ? `${c.n} ${c.nome}` : c.nome}
                {c.epoca ? <span className="text-[#1F1F1F]/40"> · </span> : null}
                {c.epoca}
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-balance text-[#1F1F1F]">{c.titulo}</p>
              <p className="mt-2 text-base leading-7 text-pretty text-[#1F1F1F]/70">{c.texto}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
