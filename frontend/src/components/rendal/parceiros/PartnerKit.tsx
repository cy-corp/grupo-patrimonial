"use client";

import { useEffect, useState } from "react";
import { kitsParceiro } from "@/lib/rendal/content/parceiros";
import { track } from "@/lib/rendal/track";

type Kit = (typeof kitsParceiro)[number];

export function PartnerKit() {
  const [preview, setPreview] = useState<Kit | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!preview) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreview(null);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [preview]);

  async function share(item: Kit) {
    const url = `${window.location.origin}/parceiros/kit/${item.id}`;
    track("kit_share", { kit: item.id });
    if (navigator.share) {
      try {
        await navigator.share({ title: item.titulo, url });
        return;
      } catch {
        return;
      }
    }
    setNote("O compartilhamento deste aparelho abre o download da imagem.");
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full flex-wrap items-start justify-center gap-4">
        {kitsParceiro.map((item) => (
          <KitCard
            key={item.id}
            card={item}
            onOpen={() => setPreview(item)}
            onShare={() => share(item)}
          />
        ))}
      </div>

      <p role="status" className="mt-3 text-sm text-[#1F1F1F]/65">{note}</p>

      {preview ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E2A2D]/70 p-6"
          role="dialog"
          aria-modal="true"
          aria-label={preview.titulo}
          onClick={() => setPreview(null)}
        >
          <div className="flex max-h-[90svh] w-full max-w-[320px] flex-col items-center" onClick={(event) => event.stopPropagation()}>
            <KitFace card={preview} />
            <div className="mt-4 flex w-full gap-2">
              <DownloadLink id={preview.id} className="flex-1" />
              <button
                type="button"
                onClick={() => share(preview)}
                className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-full bg-white text-sm font-semibold text-[#1F1F1F]"
              >
                Compartilhar
              </button>
            </div>
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="mt-3 min-h-11 cursor-pointer text-sm font-semibold text-white"
            >
              Fechar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function KitCard({
  card,
  onOpen,
  onShare,
}: {
  card: Kit;
  onOpen: () => void;
  onShare: () => void;
}) {
  return (
    <article className="w-full max-w-[280px] overflow-hidden rounded-3xl bg-[#0E2A2D] text-left text-white">
      <button type="button" onClick={onOpen} className="block w-full cursor-pointer text-left">
        <KitFace card={card} />
      </button>
      <div className="flex flex-col gap-2 p-4">
        <DownloadLink id={card.id} />
        <button
          type="button"
          onClick={onShare}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full text-sm font-semibold ring-1 ring-white/30"
        >
          Compartilhar
        </button>
      </div>
    </article>
  );
}

function KitFace({ card }: { card: Kit }) {
  return (
    <div className="relative aspect-[9/16] w-full">
      <img src={card.imagem} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0E2A2D] to-transparent p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A96A]">Rendal</p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-balance">{card.titulo}</h3>
        <p className="mt-2 text-sm leading-6 text-white/80">{card.frase}</p>
      </div>
    </div>
  );
}

function DownloadLink({ id, className = "" }: { id: string; className?: string }) {
  return (
    <a
      href={`/parceiros/kit/${id}`}
      download={`rendal-${id}.png`}
      onClick={() => track("kit_download", { kit: id })}
      className={`inline-flex min-h-11 items-center justify-center rounded-full bg-[#0F5B63] text-sm font-semibold ${className}`}
    >
      Baixar imagem
    </a>
  );
}
