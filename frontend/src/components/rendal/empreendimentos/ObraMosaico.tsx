"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/rendal/tokens";
import type { ObraMidia } from "@/lib/rendal/content/empreendimentos";

const MOBILE_LIMIT = 6;

function tileClass(index: number, count: number, item: ObraMidia) {
  const featured = Boolean(item.destaque) || index === 0;

  if (count === 1) {
    if (item.fit === "contain") {
      return "col-span-12 aspect-square md:aspect-[4/3]";
    }
    if (item.aspect === "h") {
      return "col-span-12 aspect-[16/10]";
    }
    return "col-span-12 md:col-span-8 md:col-start-3 aspect-[3/4] md:aspect-[4/5]";
  }

  if (count === 2) {
    return index === 0
      ? "col-span-12 sm:col-span-7 aspect-[3/4] sm:aspect-[4/5]"
      : "col-span-12 sm:col-span-5 aspect-[3/4]";
  }

  if (count === 3) {
    if (featured) {
      return item.aspect === "h"
        ? "col-span-12 aspect-[16/10]"
        : "col-span-12 sm:col-span-8 sm:row-span-2 aspect-[3/4] sm:min-h-[32rem] sm:aspect-auto";
    }
    return "col-span-6 sm:col-span-4 aspect-[3/4]";
  }

  if (featured) {
    return item.aspect === "h"
      ? "col-span-12 aspect-[16/10]"
      : "col-span-12 sm:col-span-8 sm:row-span-2 aspect-[3/4] sm:min-h-[32rem] sm:aspect-auto";
  }

  if (item.aspect === "h") {
    return "col-span-12 sm:col-span-8 aspect-[16/10]";
  }

  return "col-span-6 sm:col-span-4 aspect-[3/4]";
}

export function ObraMosaico({
  midias,
  onOpen,
}: {
  midias: ObraMidia[];
  onOpen: (src: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const count = midias.length;
  const clipped = count > MOBILE_LIMIT;

  if (!count) return null;

  return (
    <>
      <ul className="m-0 grid list-none grid-cols-12 grid-flow-dense gap-3 p-0">
        {midias.map((item, index) => (
          <li
            key={item.src}
            className={cn(
              tileClass(index, count, item),
              !expanded && index >= MOBILE_LIMIT && "max-md:hidden",
            )}
          >
            <ObraTile item={item} index={index} featured={Boolean(item.destaque) || index === 0} onOpen={() => onOpen(item.src)} />
          </li>
        ))}
      </ul>
      {clipped ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-4 inline-flex min-h-11 cursor-pointer items-center rounded-full bg-white px-5 text-sm font-semibold text-[#1F1F1F] md:hidden"
        >
          {expanded ? "Ver menos" : `Ver todas (${count})`}
        </button>
      ) : null}
    </>
  );
}

function ObraTile({
  item,
  index,
  featured,
  onOpen,
}: {
  item: ObraMidia;
  index: number;
  featured: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={item.kind === "video" ? `Assistir: ${item.alt}` : `Ampliar: ${item.alt}`}
      onClick={onOpen}
      className="group relative block h-full min-h-44 w-full cursor-pointer overflow-hidden rounded-2xl motion-safe:animate-[journey-fade_520ms_cubic-bezier(0.32,0.72,0,1)_both]"
      style={{
        backgroundColor: item.tone ?? "#EDE6DA",
        animationDelay: `${Math.min(index, 10) * 45}ms`,
        transitionTimingFunction: EASE,
      }}
    >
      {item.kind === "video" ? (
        <VideoPreview item={item} />
      ) : (
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={
            item.fit === "contain"
              ? "(max-width: 1024px) 100vw, 1600px"
              : featured
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 800px"
                : "(max-width: 640px) 50vw, 400px"
          }
          className={
            item.fit === "contain"
              ? "object-contain p-0 md:p-2"
              : "object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          }
          style={{ transitionTimingFunction: EASE }}
        />
      )}
      {item.kind === "video" ? (
        <span className="absolute left-3 top-3 rounded-full bg-[#1F1F1F]/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          Vídeo
        </span>
      ) : null}
    </button>
  );
}

function VideoPreview({ item }: { item: ObraMidia }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const on = Boolean(entry?.isIntersecting);
        setActive(on);
        if (on && !reduce) {
          if (!node.getAttribute("src")) node.src = item.src;
          node.play().catch(() => undefined);
        } else {
          node.pause();
        }
      },
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [item.src]);

  return (
    <video
      ref={ref}
      poster={item.poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden={!active}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
