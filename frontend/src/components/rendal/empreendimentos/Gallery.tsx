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
        "hover:border-[#7A4A2B]/35 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A4A2B]/40",
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

export function Lightbox({
  images,
  index,
  open,
  onOpenChange,
  onIndexChange,
}: {
  images: Midia[];
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
}) {
  const current = images[index] ?? images[0];
  const canNav = images.length > 1;
  const contain = current?.fit === "contain";

  const step = (delta: number) => onIndexChange((index + delta + images.length) % images.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") onIndexChange((index + 1) % images.length);
      if (event.key === "ArrowLeft") onIndexChange((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, images.length, onIndexChange]);

  if (!current) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[120] bg-[#1F1F1F]/60" />
        <Dialog.Popup className="fixed inset-3 z-[121] m-auto flex h-fit max-h-[92svh] w-full max-w-5xl flex-col outline-none sm:inset-6">
          <div className="mb-3 flex items-center justify-between gap-4 px-1">
            <Dialog.Title className="truncate text-sm font-semibold text-white/90 sm:text-base">
              {current.alt}
            </Dialog.Title>
            <Dialog.Close className="inline-flex min-h-11 shrink-0 cursor-pointer items-center rounded-full px-4 text-sm font-semibold text-white/90 ring-1 ring-white/25 hover:bg-white/10">
              Fechar
            </Dialog.Close>
          </div>

          <div
            className={cn(
              "relative overflow-hidden rounded-2xl",
              contain ? "bg-[#EDE6DA]" : "bg-[#1F1F1F]",
            )}
          >
            <div
              className={cn(
                "relative w-full",
                contain ? "h-[76svh]" : "aspect-[16/10] max-h-[72svh]",
              )}
              style={contain ? { touchAction: "pinch-zoom" } : undefined}
            >
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className={contain ? "object-contain p-2" : "object-cover"}
                priority
              />
            </div>
            {canNav ? (
              <>
                <GalleryArrow direction="prev" onClick={() => step(-1)} />
                <GalleryArrow direction="next" onClick={() => step(1)} />
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
  );
}

/** Lightbox state that can be opened at a given image, e.g. from a plant preview. */
export function useLightbox(images: Midia[]) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = (src: string) => {
    const found = images.findIndex((image) => image.src === src);
    setIndex(found === -1 ? 0 : found);
    setOpen(true);
  };

  const props = { images, index, open, onOpenChange: setOpen, onIndexChange: setIndex };
  return { openAt, props };
}

export function Gallery({
  images,
  featuredFirst = false,
}: {
  images: Midia[];
  featuredFirst?: boolean;
}) {
  const { openAt, props } = useLightbox(images);

  if (!images.length) return null;

  return (
    <>
      <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <li
            key={image.src}
            className={featuredFirst && index === 0 ? "sm:col-span-2" : undefined}
          >
            <button
              type="button"
              aria-label={`Ampliar: ${image.alt}`}
              onClick={() => openAt(image.src)}
              className={cn(
                "relative block w-full cursor-pointer overflow-hidden rounded-2xl bg-[#EDE6DA] transition-transform duration-500 hover:scale-[1.01] motion-reduce:transition-none motion-reduce:hover:scale-100",
                featuredFirst && index === 0 ? "aspect-[16/9]" : "aspect-[16/10]",
              )}
              style={{ transitionTimingFunction: EASE }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  featuredFirst && index === 0
                    ? "(max-width: 1024px) 100vw, 66vw"
                    : "(max-width: 1024px) 100vw, 33vw"
                }
                className={image.fit === "contain" ? "object-contain p-3" : "object-cover"}
              />
            </button>
          </li>
        ))}
      </ul>

      <Lightbox {...props} />
    </>
  );
}
