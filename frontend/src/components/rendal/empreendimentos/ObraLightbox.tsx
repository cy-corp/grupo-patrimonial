"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";
import type { ObraMidia } from "@/lib/rendal/content/empreendimentos";

const fade =
  "opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 motion-reduce:transition-none";

const chrome =
  "flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/70 text-[#1F1F1F] shadow-[0_8px_32px_rgba(31,31,31,0.08)] ring-1 ring-[#1F1F1F]/5 backdrop-blur-xl transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/90";

function ChromeButton({
  label,
  onClick,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={cn(chrome, className)}
    >
      {children}
    </button>
  );
}

export function ObraLightbox({
  items,
  index,
  open,
  onOpenChange,
  onIndexChange,
}: {
  items: ObraMidia[];
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
}) {
  const item = items[index];
  const canNav = items.length > 1;
  const videoRef = useRef<HTMLVideoElement>(null);
  const skipSwap = useRef(true);
  const [shown, setShown] = useState(item);
  const [mediaOn, setMediaOn] = useState(true);

  const step = (delta: number) => {
    if (!canNav) return;
    onIndexChange((index + delta + items.length) % items.length);
  };

  useEffect(() => {
    if (!item) return;
    if (skipSwap.current) {
      skipSwap.current = false;
      setShown(item);
      setMediaOn(true);
      return;
    }
    if (shown?.src === item.src) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMediaOn(false);
    const t = window.setTimeout(
      () => {
        setShown(item);
        requestAnimationFrame(() => setMediaOn(true));
      },
      reduce ? 0 : 180,
    );
    return () => window.clearTimeout(t);
  }, [item, shown?.src]);

  useEffect(() => {
    if (!open) {
      skipSwap.current = true;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, items.length, canNav]);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    if (open && shown?.kind === "video") {
      node.play().catch(() => undefined);
    } else {
      node.pause();
    }
  }, [open, shown]);

  const current = shown ?? item;
  if (!current) return null;

  const mediaClass = cn(
    "block h-auto w-auto max-w-[calc(100vw-1.5rem)] rounded-3xl object-contain",
    canNav
      ? "max-h-[calc(100svh-5.5rem)] md:max-h-[calc(100svh-1.5rem)]"
      : "max-h-[calc(100svh-1.5rem)]",
  );

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className={cn("fixed inset-0 z-[120] cursor-pointer bg-[#1F1F1F]/70", fade)} />
        <Dialog.Popup className={cn("pointer-events-none fixed inset-0 z-[121] flex items-center justify-center p-3 outline-none", fade)}>
          <Dialog.Title className="sr-only">{current.alt}</Dialog.Title>

          <div className="pointer-events-auto relative w-fit max-w-full">
            <div
              className="transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
              style={{ opacity: mediaOn ? 1 : 0 }}
            >
              {current.kind === "video" ? (
                <video
                  key={current.src}
                  ref={videoRef}
                  src={current.src}
                  poster={current.poster}
                  controls
                  playsInline
                  className={mediaClass}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={current.src} src={current.src} alt={current.alt} className={mediaClass} />
              )}
            </div>

            <Dialog.Close className={cn("absolute right-3 top-3 z-[2]", chrome)} aria-label="Fechar">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </Dialog.Close>

            {canNav ? (
              <div className="mt-3 flex items-center justify-center gap-3 md:pointer-events-none md:absolute md:inset-0 md:z-[2] md:mt-0">
                <ChromeButton
                  label="Anterior"
                  onClick={() => step(-1)}
                  className="md:pointer-events-auto md:absolute md:left-3 md:top-1/2 md:-translate-y-1/2"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </ChromeButton>
                <ChromeButton
                  label="Próxima"
                  onClick={() => step(1)}
                  className="md:pointer-events-auto md:absolute md:right-3 md:top-1/2 md:-translate-y-1/2"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </ChromeButton>
              </div>
            ) : null}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
