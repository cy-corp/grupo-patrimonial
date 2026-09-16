"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GoldButton } from "@/components/ui/gold-button";
import { DcorpHandoffLogo } from "@/components/site/DcorpHandoffLogo";
import { useDcorpChrome } from "@/components/site/dcorp-chrome";
import { cn } from "@/lib/utils";

const SIGNATURE = [
  { text: "Projetos", tone: "white" as const },
  { text: "que", tone: "white" as const },
  { text: "constroem", tone: "white" as const },
  { text: "oportunidades.", tone: "gold" as const },
];

const HERO_IMAGE = "/dcorp/hero-kinetic.jpg";

export function DcorpHero() {
  const [shown, setShown] = useState(false);
  const chrome = useDcorpChrome();
  const handoffLineRef = useRef<HTMLDivElement>(null);
  const isMobile = Boolean(chrome?.isMobile);
  const logoInHeader = Boolean(chrome?.logoInHeader);
  const setLogoInHeader = chrome?.setLogoInHeader;

  const handoffActive = isMobile;
  const showHeroLogo = handoffActive && !logoInHeader;

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

  useEffect(() => {
    if (!handoffActive || !setLogoInHeader) return;
    const node = handoffLineRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const past = !entry.isIntersecting && entry.boundingClientRect.top < 96;
        setLogoInHeader(past);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-88px 0px 0px 0px",
      },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      setLogoInHeader(false);
    };
  }, [handoffActive, setLogoInHeader]);

  return (
    <section
      className="dcorp-hero relative isolate flex min-h-dvh w-full flex-col overflow-hidden bg-graphite text-white"
      data-shown={shown ? "true" : "false"}
      aria-label="Apresentação DCORP"
    >
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] md:object-[70%_center]"
        />
        <div
          className="absolute inset-0 bg-graphite/72 md:bg-graphite/58"
          aria-hidden="true"
        />
      </div>

      <div className="dcorp-hero-scan" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-16 pt-28 sm:px-8 md:px-12 md:pt-28 lg:px-16">
        <div className="mb-8 md:mb-10">
          {showHeroLogo ? (
            <div className="mb-4 md:hidden">
              <Link href="/" aria-label="DCORP - início" className="inline-block">
                <DcorpHandoffLogo
                  variant="hero"
                  priority
                  className="h-14 w-[12.5rem]"
                />
              </Link>
            </div>
          ) : null}

          <div ref={handoffLineRef} className="h-px w-full" aria-hidden="true" />

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
          Planejamento, execução e resultados para construção industrial.
        </p>

        <div className="dcorp-hero-actions mt-9 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:items-center sm:gap-4">
          <GoldButton
            href="/contato?empresa=dcorp"
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
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4 sm:px-8 md:px-12 lg:px-16">
          {["Planejamento", "Execução", "Resultados"].map((item) => (
            <span
              key={item}
              className="flex items-center gap-3 font-sans text-[11px] font-semibold uppercase text-white/55"
            >
              <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
