"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { kitsParceiro } from "@/lib/rendal/content/parceiros";
import { EASE } from "@/lib/rendal/tokens";

type Kit = (typeof kitsParceiro)[number];

const OPEN_MS = 320;
const CLOSE_MS = 220;

export function PartnerKit() {
  const [preview, setPreview] = useState<Kit | null>(null);

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full flex-wrap items-start justify-center gap-4">
        {kitsParceiro.map((item) => (
          <article
            key={item.id}
            className="w-full max-w-[280px] overflow-hidden rounded-3xl bg-[#1F1F1F] text-left text-white"
          >
            <button
              type="button"
              onClick={() => setPreview(item)}
              className="block w-full cursor-pointer text-left"
            >
              <KitFace card={item} />
            </button>
          </article>
        ))}
      </div>

      {preview ? <KitPreview card={preview} onClose={() => setPreview(null)} /> : null}
    </div>
  );
}

function KitPreview({ card, onClose }: { card: Kit; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const closing = useRef(false);
  const closeTimer = useRef(0);

  const reveal = useCallback(() => {
    if (closing.current) return;
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    setVisible(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    closeTimer.current = window.setTimeout(onClose, reduce ? 0 : CLOSE_MS);
  }, [onClose]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      window.clearTimeout(closeTimer.current);
    };
  }, [close]);

  const fade = {
    opacity: visible ? 1 : 0,
    transition: `opacity ${visible ? OPEN_MS : CLOSE_MS}ms ${EASE}`,
    willChange: "opacity",
  } as const;

  return (
    <div
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={card.titulo}
    >
      <button
        type="button"
        aria-label="Fechar preview"
        onClick={close}
        className="absolute inset-0 cursor-pointer bg-[#1F1F1F]/70 [transform:translateZ(0)]"
        style={fade}
      />
      <div
        className="pointer-events-none relative z-[1] flex w-fit max-w-full flex-col items-center [transform:translateZ(0)]"
        style={fade}
      >
        <div className="pointer-events-auto relative w-fit max-w-full">
          <img
            src={card.imagem}
            alt=""
            onLoad={reveal}
            ref={(node) => {
              if (node?.complete) reveal();
            }}
            className="block h-auto w-auto max-w-full rounded-3xl object-contain max-h-[calc(100svh-8rem)]"
          />
          <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-center">
            <span className="rounded-full px-3.5 py-1.5 text-sm font-semibold leading-none tracking-tight text-white [background:linear-gradient(135deg,rgba(255,255,255,0.22),rgba(31,31,31,0.72))] [box-shadow:inset_0_0.5px_0_rgba(255,255,255,0.35)] [border:0.5px_solid_rgba(255,255,255,0.2)]">
              {card.titulo}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={close}
          className="pointer-events-auto mt-3 inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center rounded-full px-5 text-sm font-semibold text-white [background:linear-gradient(135deg,rgba(255,255,255,0.22),rgba(31,31,31,0.72))] [box-shadow:inset_0_0.5px_0_rgba(255,255,255,0.35)] [border:0.5px_solid_rgba(255,255,255,0.2)]"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

function KitFace({ card }: { card: Kit }) {
  return (
    <div className="relative aspect-[9/16] w-full">
      <img src={card.imagem} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1F1F1F] to-transparent p-4">
        <h3 className="text-2xl font-semibold leading-tight tracking-tight text-balance">{card.titulo}</h3>
        <p className="mt-2 text-sm leading-6 text-white/80">{card.frase}</p>
      </div>
    </div>
  );
}
