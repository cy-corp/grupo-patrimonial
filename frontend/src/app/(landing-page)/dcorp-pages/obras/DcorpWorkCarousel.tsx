"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type DcorpWorkCarouselProps = {
  images: readonly string[];
  alt: string;
  className?: string;
  priority?: boolean;
};

function GlassArrow({
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
      onPointerDown={(event) => event.stopPropagation()}
      className={cn(
        "absolute top-1/2 z-[2] flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center border border-white/30 bg-white/15 text-white shadow-[0_8px_24px_rgba(0,0,0,0.2)] backdrop-blur-md transition-colors",
        "hover:border-[#C9A96A]/70 hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96A]/50",
        direction === "prev" ? "left-3 md:left-5" : "right-3 md:right-5",
      )}
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

export function DcorpWorkCarousel({
  images,
  alt,
  className,
  priority = false,
}: DcorpWorkCarouselProps) {
  const reduceMotion = useReducedMotion();
  const labelId = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const startDrag = useRef(0);

  const count = images.length;
  const canNav = count > 1;

  useEffect(() => {
    setMounted(true);
  }, []);

  const go = useCallback(
    (next: number) => {
      if (!canNav) return;
      setIndex(((next % count) + count) % count);
    },
    [canNav, count],
  );

  const openLightbox = useCallback(() => {
    setLightbox(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(false);
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    startX.current = event.clientX;
    startDrag.current = 0;
    setDragging(true);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    startDrag.current = event.clientX - startX.current;
  };

  const endDrag = (openOnTap = true) => {
    if (!dragging) return;
    const dx = startDrag.current;
    setDragging(false);
    const width = stageRef.current?.offsetWidth ?? 1;
    if (canNav && Math.abs(dx) > Math.min(56, width * 0.16)) {
      go(index + (dx < 0 ? 1 : -1));
    } else if (openOnTap && Math.abs(dx) < 10) {
      openLightbox();
    }
    startDrag.current = 0;
  };

  useEffect(() => {
    if (!lightbox) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightbox]);

  useEffect(() => {
    if (!lightbox && !canNav) return;
    const onKey = (event: KeyboardEvent) => {
      if (lightbox) {
        if (event.key === "Escape") {
          event.preventDefault();
          closeLightbox();
          return;
        }
        if (canNav && event.key === "ArrowRight") {
          event.preventDefault();
          go(index + 1);
        }
        if (canNav && event.key === "ArrowLeft") {
          event.preventDefault();
          go(index - 1);
        }
        return;
      }

      const root = stageRef.current?.closest("[data-carousel-root]");
      const active = document.activeElement;
      if (!root || (active !== root && !root.contains(active))) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(index + 1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(index - 1);
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canNav, closeLightbox, go, index, lightbox, openLightbox]);

  if (count === 0) return null;

  const renderSlides = (sizes: string) =>
    images.map((src, i) => (
      <div
        key={src}
        className={cn(
          "absolute inset-0",
          !reduceMotion &&
            "transition-opacity duration-500 ease-[var(--ease-smooth-out,ease-out)]",
          i === index ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={i !== index}
      >
        <Image
          src={src}
          alt={count > 1 ? `${alt} — foto ${i + 1}` : alt}
          fill
          sizes={sizes}
          className="pointer-events-none select-none object-cover"
          priority={priority && i === 0}
          draggable={false}
        />
      </div>
    ));

  const lightboxNode =
    mounted &&
    createPortal(
      <AnimatePresence>
        {lightbox ? (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#1F1F1F]/82 p-3 backdrop-blur-sm md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeLightbox}
          >
            <button
              type="button"
              aria-label="Fechar"
              onClick={closeLightbox}
              className="absolute right-3 top-3 z-[2] flex size-10 cursor-pointer items-center justify-center border border-white/30 bg-white/15 text-white backdrop-blur-md transition-colors hover:border-[#C9A96A]/70 hover:bg-white/25 md:right-6 md:top-6"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M2 2l10 10M12 2 2 12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <motion.div
              className="relative w-full max-w-5xl"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#1F1F1F] md:aspect-[16/10]">
                {renderSlides("100vw")}
                {canNav ? (
                  <>
                    <GlassArrow direction="prev" onClick={() => go(index - 1)} />
                    <GlassArrow direction="next" onClick={() => go(index + 1)} />
                  </>
                ) : null}
              </div>

              {canNav ? (
                <div className="mt-4 flex items-center justify-between gap-4 px-1">
                  <p className="font-sans text-[11px] tabular-nums text-white/70">
                    <span className="font-semibold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mx-1.5 text-white/30">/</span>
                    {String(count).padStart(2, "0")}
                  </p>
                  <div className="flex items-center gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Ir para foto ${i + 1}`}
                        onClick={() => go(i)}
                        className={cn(
                          "h-px cursor-pointer transition-[width,background-color] duration-200 ease-out",
                          i === index
                            ? "w-7 bg-[#C9A96A]"
                            : "w-3 bg-white/35 hover:bg-[#C9A96A]/70",
                        )}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
    );

  return (
    <div
      data-carousel-root
      className={cn("relative", className)}
      role="region"
      aria-roledescription={canNav ? "carrossel" : undefined}
      aria-labelledby={labelId}
    >
      <p id={labelId} className="sr-only">
        {alt}
      </p>

      <div className="border border-[#D9D9D9] bg-[#F7F7F7] p-2 md:p-3">
        <div
          ref={stageRef}
          role="button"
          tabIndex={0}
          aria-label={`Ampliar ${alt}`}
          className="relative aspect-[4/3] cursor-pointer overflow-hidden bg-[#1F1F1F] outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96A]/45 md:aspect-[16/10]"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={() => endDrag(true)}
          onPointerCancel={() => endDrag(false)}
          style={{ touchAction: canNav ? "pan-y" : undefined }}
        >
          {renderSlides("(max-width: 1024px) 100vw, 72vw")}
        </div>

        {canNav ? (
          <div className="mt-2 flex items-center justify-between gap-4 border-t border-[#D9D9D9] bg-white px-3 py-2.5 md:mt-3 md:px-4 md:py-3">
            <p className="font-sans text-[11px] tabular-nums text-[#4D4D4D]">
              <span className="font-semibold text-[#1F1F1F]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mx-1.5 text-[#D9D9D9]">/</span>
              {String(count).padStart(2, "0")}
            </p>

            <div
              className="flex items-center gap-1.5"
              role="tablist"
              aria-label="Fotos"
            >
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Ir para foto ${i + 1}`}
                  onClick={() => go(i)}
                  className={cn(
                    "h-px cursor-pointer transition-[width,background-color] duration-200 ease-out",
                    i === index
                      ? "w-7 bg-[#C9A96A]"
                      : "w-3 bg-[#D9D9D9] hover:bg-[#C9A96A]/60",
                  )}
                />
              ))}
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Foto anterior"
                onClick={(event) => {
                  event.stopPropagation();
                  go(index - 1);
                }}
                onPointerDown={(event) => event.stopPropagation()}
                className="flex size-9 cursor-pointer items-center justify-center border border-[#D9D9D9] text-[#1F1F1F] transition-colors hover:border-[#C9A96A] hover:text-[#C9A96A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96A]/45"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M10 3L5 8l5 5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Próxima foto"
                onClick={(event) => {
                  event.stopPropagation();
                  go(index + 1);
                }}
                onPointerDown={(event) => event.stopPropagation()}
                className="flex size-9 cursor-pointer items-center justify-center border border-[#D9D9D9] text-[#1F1F1F] transition-colors hover:border-[#C9A96A] hover:text-[#C9A96A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96A]/45"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M6 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {lightboxNode}
    </div>
  );
}
