"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoldButton } from "@/components/ui/gold-button";
import { DcorpHandoffLogo } from "@/components/site/DcorpHandoffLogo";
import { useDcorpChrome } from "@/components/site/dcorp-chrome";
import { companies } from "@/lib/companies";
import {
  DCORP_HERO_SUPPORT,
  DCORP_WORLDS,
  DCORP_WORLDS_EYEBROW,
} from "@/lib/dcorp-content";
import { cn } from "@/lib/utils";

const SIGNATURE = [
  { text: "Projetos", tone: "white" as const },
  { text: "que", tone: "white" as const },
  { text: "constroem", tone: "white" as const },
  { text: "oportunidades.", tone: "gold" as const },
];

const HERO_IMAGE = "/dcorp/hero-green-wall.jpg";

function LearnChevron({ className }: { className?: string }) {
  return (
    <span className={cn("t-learn-chevron", className)} aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          className="t-learn-arm t-learn-arm-top"
          d="M6 4L10 8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          className="t-learn-arm t-learn-arm-bot"
          d="M10 8L6 12"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function DcorpHero() {
  const [shown, setShown] = useState(false);
  const chrome = useDcorpChrome();
  const isMobile = Boolean(chrome?.isMobile);
  const pastHero = Boolean(chrome?.pastHero);
  const handoffActive = isMobile;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setShown(true));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      className="dcorp-hero relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-graphite text-white"
      data-shown={shown ? "true" : "false"}
      aria-label="Apresentação DCORP"
    >
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Concreto aparente com vegetação"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] md:object-[78%_center]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/75 to-graphite/25 md:from-graphite/92 md:via-graphite/55 md:to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="dcorp-hero-scan" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-10 pt-28 sm:px-8 md:px-12 md:pb-14 md:pt-28 lg:px-16">
        <div className="mb-8 md:mb-10">
          {handoffActive ? (
            <div
              className={cn(
                "mb-4 md:hidden transition-opacity duration-[var(--duration-medium)] ease-[var(--ease-smooth-out)]",
                pastHero
                  ? "pointer-events-none opacity-0"
                  : "opacity-100",
              )}
            >
              <Link href="/" aria-label="DCORP - início" className="inline-block">
                <DcorpHandoffLogo
                  variant="hero"
                  priority
                  className="h-14 w-[12.5rem]"
                />
              </Link>
            </div>
          ) : null}

          <p className="dcorp-hero-label font-sans text-[11px] font-semibold uppercase text-white/60 md:text-xs">
            DCORP Engenharia
          </p>
        </div>

        <h1 className="dcorp-hero-signature max-w-[14ch] text-balance font-sans text-[2.35rem] font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
          {SIGNATURE.map((word, index) => (
            <span
              key={word.text}
              className={cn(
                "dcorp-hero-word inline-block",
                word.tone === "gold" && "font-semibold italic text-gold",
              )}
              style={{ ["--word-i" as string]: index }}
            >
              {word.text}
              {index < SIGNATURE.length - 1 ? "\u00A0" : null}
            </span>
          ))}
        </h1>

        <p className="dcorp-hero-support mt-7 max-w-[42ch] text-pretty font-sans text-base leading-relaxed text-white/65 md:mt-8 md:text-lg">
          {DCORP_HERO_SUPPORT}
        </p>

        <div className="dcorp-hero-actions mt-9 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:items-center sm:gap-4">
          <GoldButton
            href={companies.dcorp.contactHref}
            className="h-11 px-7 text-[12px]"
          >
            Solicitar orçamento
          </GoldButton>
          <Link
            href="/quem-somos"
            className="inline-flex h-11 items-center justify-center rounded-md border border-white/25 px-6 text-[12px] font-semibold text-white transition-colors duration-[var(--duration-quick)] ease-out hover:border-white/45 hover:bg-white/5"
          >
            Conhecer a DCORP
          </Link>
        </div>
      </div>

      <div className="dcorp-hero-rail relative z-10 border-t border-white/10 bg-graphite/55">
        <div className="mx-auto max-w-6xl px-6 py-3 sm:px-8 sm:py-4 md:px-12 lg:px-16">
          <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-wide text-gold/80">
            {DCORP_WORLDS_EYEBROW}
          </p>
          <nav
            aria-label={DCORP_WORLDS_EYEBROW}
            className="grid grid-cols-1 overflow-hidden border border-white/15 sm:grid-cols-2"
          >
            {DCORP_WORLDS.map((world, index) => (
              <Link
                key={world.id}
                href={world.href}
                className={cn(
                  "t-learn group relative isolate flex min-h-[6.5rem] flex-col justify-end overflow-hidden p-3.5 sm:min-h-[9.5rem] sm:p-5 md:min-h-[11rem]",
                  index === 0 && "border-b border-white/15 sm:border-b-0 sm:border-r",
                )}
              >
                <Image
                  src={world.image}
                  alt={world.alt}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-[transform,filter] duration-[var(--duration-medium)] ease-[var(--ease-smooth-out)] group-hover:scale-[1.04] group-hover:brightness-110 motion-reduce:transform-none motion-reduce:filter-none"
                />
                <div
                  className="absolute inset-0 bg-graphite opacity-[0.72] transition-opacity duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:opacity-[0.42] md:opacity-[0.64] md:group-hover:opacity-[0.40]"
                  aria-hidden="true"
                />
                <span
                  className="absolute left-0 top-0 z-10 h-full w-0.5 origin-top scale-y-0 bg-gold transition-transform duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] group-hover:scale-y-100"
                  aria-hidden="true"
                />
                <div className="relative z-10 flex items-end justify-between gap-3">
                  <div>
                    <span className="font-sans text-sm font-bold tabular-nums text-gold sm:text-base">
                      {world.number}
                    </span>
                    <p className="mt-1 font-sans text-sm font-semibold leading-snug text-white sm:text-base">
                      {world.title}
                    </p>
                    <p className="mt-1 max-w-[32ch] text-pretty font-sans text-xs leading-relaxed text-white/70 sm:text-sm">
                      {world.description}
                    </p>
                  </div>
                  <LearnChevron className="mb-0.5 shrink-0 text-white/55 group-hover:text-gold" />
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
