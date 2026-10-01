"use client";

import { useEffect, useRef, useState } from "react";
import { ETAPA_OBRA_STATUS, midiasDaEtapa, type EtapaObra, type ObraMidia } from "@/lib/rendal/content/empreendimentos";
import { ObraNav, etapaAnchor } from "@/components/rendal/empreendimentos/ObraNav";
import { ObraMosaico } from "@/components/rendal/empreendimentos/ObraMosaico";
import { ObraLightbox } from "@/components/rendal/empreendimentos/ObraLightbox";
import { getRendalChrome, setRendalChrome, type RendalChrome } from "@/lib/rendal/chrome";

export function ObraEtapas({ etapas }: { etapas: EtapaObra[] }) {
  const [activeId, setActiveId] = useState(() => etapas[0]?.id ?? "");
  const [preview, setPreview] = useState<{ items: ObraMidia[]; index: number } | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const closeTimer = useRef(0);
  const [chrome, setChrome] = useState<RendalChrome>("");
  const programmatic = useRef<string | null>(null);

  useEffect(() => {
    const section = document.getElementById("obra");
    if (!section) return;

    let lastY = window.scrollY;
    let current = getRendalChrome();
    let ticking = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = (value: RendalChrome) => {
      if (value === current) return;
      current = value;
      setChrome(value);
      setRendalChrome(value);
    };

    const update = () => {
      ticking = false;
      if (reduce.matches) {
        apply("");
        return;
      }
      const y = window.scrollY;
      const rect = section.getBoundingClientRect();
      const pinned = rect.top <= 12 && rect.bottom > 140;
      if (!pinned) {
        apply("");
        lastY = y;
        return;
      }
      const dy = y - lastY;
      if (dy > 8) apply("obra-down");
      else if (dy < -8) apply("obra-up");
      lastY = y;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      apply("");
    };
  }, []);

  useEffect(() => {
    const nodes = etapas
      .map((etapa) => document.getElementById(etapaAnchor(etapa.id)))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      if (programmatic.current) return;
      const nav = document.querySelector<HTMLElement>("#obra .sticky");
      const navBottom = nav?.getBoundingClientRect().bottom ?? 96;
      const line = Math.max(navBottom + 32, window.innerHeight * 0.45);
      let current = nodes[0];
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= line) current = node;
      }
      const last = nodes[nodes.length - 1];
      if (last.getBoundingClientRect().top <= window.innerHeight * 0.55) {
        current = last;
      }
      const id = current.id.replace(/^obra-/, "");
      if (id) setActiveId(id);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [etapas]);

  if (!etapas.length) return null;

  const openAt = (src: string) => {
    for (const etapa of etapas) {
      const items = midiasDaEtapa(etapa);
      const index = items.findIndex((item) => item.src === src);
      if (index !== -1) {
        window.clearTimeout(closeTimer.current);
        setPreview({ items, index });
        setPreviewOpen(true);
        return;
      }
    }
  };

  const goTo = (id: string) => {
    programmatic.current = id;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(etapaAnchor(id))?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
      inline: "nearest",
    });
    setActiveId(id);
    const clear = () => {
      if (programmatic.current === id) programmatic.current = null;
    };
    const onEnd = () => {
      clear();
      window.removeEventListener("scrollend", onEnd);
    };
    window.addEventListener("scrollend", onEnd);
    window.setTimeout(clear, 900);
  };

  return (
    <div>
      <ObraNav etapas={etapas} activeId={activeId} onSelect={goTo} promoted={chrome === "obra-down"} />

      <div className="flex flex-col gap-20 sm:gap-24">
        {etapas.map((etapa, indexEtapa) => {
          return (
            <article
              key={etapa.id}
              id={etapaAnchor(etapa.id)}
              className="scroll-mt-36"
              aria-labelledby={`${etapaAnchor(etapa.id)}-titulo`}
            >
              <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold tabular-nums tracking-widest text-[#C9A96A]">
                    {String(indexEtapa + 1).padStart(2, "0")}
                    <span className="ml-2 tracking-normal text-[#7A4A2B]">
                      {ETAPA_OBRA_STATUS[etapa.status]}
                    </span>
                    {etapa.midias.length ? (
                      <span className="ml-2 tracking-normal text-[#1F1F1F]/45">
                        {etapa.midias.length}
                      </span>
                    ) : null}
                  </p>
                  <h3
                    id={`${etapaAnchor(etapa.id)}-titulo`}
                    className="mt-2 text-2xl font-semibold tracking-tight text-balance text-[#1F1F1F] sm:text-3xl"
                  >
                    {etapa.titulo}
                  </h3>
                </div>
              </header>

              {etapa.midias.length ? (
                <ObraMosaico midias={midiasDaEtapa(etapa)} onOpen={openAt} />
              ) : (
                <div className="rounded-3xl bg-white px-8 py-16">
                  <p className="text-xs font-semibold tabular-nums tracking-widest text-[#C9A96A]">
                    {ETAPA_OBRA_STATUS[etapa.status]}
                  </p>
                  <p className="mt-4 max-w-md text-lg font-semibold tracking-tight text-pretty text-[#1F1F1F]">
                    {etapa.titulo}
                  </p>
                </div>
              )}

              <div className="mt-10 h-px bg-[#1F1F1F]/10 sm:mt-12" aria-hidden />
            </article>
          );
        })}
      </div>

      {preview ? (
        <ObraLightbox
          items={preview.items}
          index={preview.index}
          open={previewOpen}
          onOpenChange={(open) => {
            setPreviewOpen(open);
            if (!open) {
              window.clearTimeout(closeTimer.current);
              closeTimer.current = window.setTimeout(() => setPreview(null), 520);
            }
          }}
          onIndexChange={(index) => {
            setPreview((current) => (current ? { ...current, index } : current));
          }}
        />
      ) : null}
    </div>
  );
}
