"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/rendal/tokens";
import type { Midia } from "@/lib/rendal/content/empreendimentos";

function GalleryArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Foto anterior" : "Próxima foto"}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={cn(
        "absolute top-1/2 z-[2] flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#1F1F1F]/12 bg-[#F8F1E3]/90 text-[#1F1F1F] shadow-[0_6px_18px_rgba(15,30,32,0.12)] backdrop-blur-sm transition-colors duration-300",
        "hover:border-[#0F5B63]/35 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5B63]/40",
        direction === "prev" ? "left-3 md:left-4" : "right-3 md:right-4",
      )}
      style={{ transitionTimingFunction: EASE }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d={direction === "prev" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export function Gallery({ images }: { images: Midia[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];
  const canNav = images.length > 1;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setIndex((value) => (value + 1) % images.length);
      }
      if (event.key === "ArrowLeft") {
        setIndex((value) => (value - 1 + images.length) % images.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  if (!current) return null;

  return (
    <>
      <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, i) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              className="relative block aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-2xl bg-[#EDE6DA] transition-transform duration-500 hover:scale-[1.01] motion-reduce:transition-none motion-reduce:hover:scale-100"
              style={{ transitionTimingFunction: EASE }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-[80] bg-[#0E2A2D]/60" />
          <Dialog.Popup className="fixed inset-3 z-[81] m-auto flex h-fit max-h-[90svh] w-full max-w-5xl flex-col outline-none sm:inset-6">
            <div className="mb-3 flex items-center justify-between gap-4 px-1">
              <Dialog.Title className="truncate text-sm font-semibold text-white/90 sm:text-base">
                {current.alt}
              </Dialog.Title>
              <Dialog.Close className="inline-flex min-h-11 shrink-0 cursor-pointer items-center rounded-full px-4 text-sm font-semibold text-white/90 ring-1 ring-white/25 hover:bg-white/10">
                Fechar
              </Dialog.Close>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-[#0E2A2D]">
              <div className="relative aspect-[16/10] w-full max-h-[72svh]">
                <Image
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  priority
                />
              </div>
              {canNav ? (
                <>
                  <GalleryArrow
                    direction="prev"
                    onClick={() => setIndex((value) => (value - 1 + images.length) % images.length)}
                  />
                  <GalleryArrow
                    direction="next"
                    onClick={() => setIndex((value) => (value + 1) % images.length)}
                  />
                </>
              ) : null}
            </div>

            {canNav ? (
              <p className="mt-3 text-center text-sm tabular-nums text-white/70">
                <span className="font-semibold text-white">{String(index + 1).padStart(2, "0")}</span>
                <span className="mx-1.5 text-white/35">/</span>
                {String(images.length).padStart(2, "0")}
              </p>
            ) : null}
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
