"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { DCORP_METHOD_STAGES } from "@/lib/dcorp-content";
import { cn } from "@/lib/utils";

type StageId = (typeof DCORP_METHOD_STAGES)[number]["id"];

const ASSET_V = "8";
const BEAUTY_SRC = `/dcorp/method/house-original-beauty.png?v=${ASSET_V}`;

const STAGE_IMAGES: Record<StageId, string> = {
  fundacao: `/dcorp/method/house-fundacao.png?v=${ASSET_V}`,
  estrutura: `/dcorp/method/house-estrutura.png?v=${ASSET_V}`,
  instalacoes: `/dcorp/method/house-instalacoes.png?v=${ASSET_V}`,
  revestimentos: `/dcorp/method/house-revestimentos.png?v=${ASSET_V}`,
  entrega: `/dcorp/method/house-entrega.png?v=${ASSET_V}`,
};

/**
 * Hit zones in beauty pixel space (1152×864), traced from each overlay's alpha by
 * scripts/build-method-house-hitzones.py. Zones are grown 2px so neighbours overlap:
 * a sub-pixel gap would let the pointer fall through to the backdrop mid-drag and blink
 * the highlight off. Later entries paint on top and win ties, so they run large to small.
 *
 * `estrutura` and `revestimentos` are the same wall surface, so only one can own the wall;
 * `revestimentos` stays reachable from the list.
 */
const HIT_ZONES: { id: StageId; d: string }[] = [
  {
    id: "estrutura",
    d: "M134 296 130 337 129 594 132 600 310 656 1018 605 1018 333 336 313 325 300 316 296 313 285 294 269 291 261 269 237 261 234 258 225 217 181 204 187 191 212 177 228Z",
  },
  {
    id: "fundacao",
    d: "M64 631 65 640 76 644 90 657 140 680 195 697 249 719 294 724 1086 649 1087 607 1015 596 1013 603 314 653 136 597 132 590 75 593 75 628Z",
  },
  {
    id: "entrega",
    d: "M96 317 99 340 134 340 137 334 134 329 137 300 180 232 194 216 202 198 214 185 255 229 258 238 265 240 288 265 291 273 310 289 313 300 321 303 332 316 1052 337 1053 322 1056 321 1055 312 910 221 909 216 900 210 201 160 192 162 188 175Z",
  },
  {
    id: "instalacoes",
    d: "M805 367 805 509 904 507 904 368ZM391 359 391 520 513 516 513 361ZM584 354 583 635 688 630 690 355Z",
  },
];

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return fine;
}

export function DcorpMethodHouse() {
  const fine = useFinePointer();
  const [hovered, setHovered] = useState<StageId | null>(null);
  const [locked, setLocked] = useState<StageId | null>(null);

  // Hover previews over the lock so the house never feels frozen, and releasing the
  // pointer falls back to whatever is locked.
  const shown = hovered ?? locked;

  const preview = useCallback(
    (id: StageId | null) => {
      if (fine) setHovered(id);
    },
    [fine],
  );

  const select = useCallback((id: StageId) => {
    setLocked((prev) => (prev === id ? null : id));
  }, []);

  // Overlays are ~0.5MB each; fetch them on first intent so the first highlight fades in
  // instead of popping in once the PNG lands.
  const primed = useRef(false);
  const prime = useCallback(() => {
    if (primed.current) return;
    primed.current = true;
    for (const src of Object.values(STAGE_IMAGES)) {
      const img = new window.Image();
      img.src = src;
    }
  }, []);

  return (
    <div
      className="mt-12 grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
      onPointerEnter={prime}
      onTouchStart={prime}
    >
      <div
        className="relative aspect-[4/3] overflow-hidden border border-[#D9D9D9] bg-[#F7F7F7] lg:col-span-7"
        data-active={shown ?? undefined}
      >
        <div className="dcorp-method-house-idle absolute inset-0 origin-[50%_78%]">
          <Image
            src={BEAUTY_SRC}
            alt="Casa DCORP — visualização do método"
            fill
            priority
            unoptimized
            sizes="(max-width: 1024px) 100vw, 58vw"
            className={cn(
              "object-contain transition-[filter] duration-300 ease-out",
              shown && "brightness-[0.9]",
            )}
          />
          {/*
            No key on this wrapper: keying it by stage would remount on every zone
            crossing and restart the fade from opacity 0, so dragging across the house
            pulsed the highlight off and on. Mounting drives the fade-in, and moving from
            one stage to the next just swaps the image and mask.
          */}
          {shown ? (
            <div className="dcorp-method-stage-fade pointer-events-none absolute inset-0">
              <Image
                src={STAGE_IMAGES[shown]}
                alt=""
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-contain"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundColor: "rgba(201, 169, 106, 0.42)",
                  mixBlendMode: "soft-light",
                  WebkitMaskImage: `url(${STAGE_IMAGES[shown]})`,
                  maskImage: `url(${STAGE_IMAGES[shown]})`,
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
            </div>
          ) : null}
        </div>

        {/*
          Only pointerenter is wired per zone. Clearing on each zone's pointerleave would
          emit a null between two adjacent zones and restart the fade mid-drag, so the
          backdrop and the container handle clearing instead.
        */}
        <svg
          viewBox="0 0 1152 864"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          onPointerLeave={() => preview(null)}
        >
          <rect
            width={1152}
            height={864}
            className="fill-transparent"
            onPointerEnter={() => preview(null)}
          />
          {HIT_ZONES.map((zone) => (
            <path
              key={zone.id}
              d={zone.d}
              className="cursor-pointer fill-transparent"
              onPointerEnter={() => preview(zone.id)}
              onClick={() => select(zone.id)}
            />
          ))}
        </svg>

        <p className="pointer-events-none absolute bottom-2.5 left-3 font-sans text-[10px] uppercase tracking-wide text-[#1F1F1F]/35">
          <span className="pointer-coarse:hidden">Passe o mouse nas etapas</span>
          <span className="hidden pointer-coarse:inline">Toque nas etapas</span>
        </p>
      </div>

      <ol
        className="border-t border-[#D9D9D9] lg:col-span-5"
        onPointerLeave={() => preview(null)}
      >
        {DCORP_METHOD_STAGES.map((stage, index) => {
          const isActive = shown === stage.id;
          return (
            <li key={stage.id}>
              <button
                type="button"
                onPointerEnter={() => preview(stage.id)}
                onClick={() => select(stage.id)}
                aria-pressed={locked === stage.id}
                className={cn(
                  "relative grid w-full grid-cols-[2.6rem_1fr] gap-3 border-b border-[#D9D9D9] py-3.5 pl-4 pr-3 text-left transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] md:gap-4 md:py-4 md:pl-5 md:pr-4",
                  "hover:bg-[#C9A96A]/[0.08] focus-visible:bg-[#C9A96A]/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96A]/45",
                  isActive && "bg-[#C9A96A]/[0.08]",
                )}
              >
                {isActive ? (
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 top-0 w-0.5 bg-[#C9A96A]"
                  />
                ) : null}
                <span
                  className={cn(
                    "font-sans text-lg font-bold tabular-nums text-[#C9A96A] transition-opacity duration-200 md:text-xl",
                    isActive ? "opacity-100" : "opacity-45",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block font-sans text-[15px] font-semibold text-[#1F1F1F] md:text-base">
                    {stage.title}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block font-sans text-xs leading-relaxed text-[#4D4D4D] transition-opacity duration-200 md:text-sm",
                      isActive ? "opacity-100" : "opacity-75",
                    )}
                  >
                    {stage.detail}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
