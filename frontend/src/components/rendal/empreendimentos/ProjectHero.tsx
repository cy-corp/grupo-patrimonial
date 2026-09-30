"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { EASE, headlineLight } from "@/lib/rendal/tokens";
import { PageHero } from "@/components/rendal/PageHero";
import { SegmentedControl } from "@/components/rendal/SegmentedControl";
import { RendalButton } from "@/components/rendal/RendalButton";
import { track } from "@/lib/rendal/track";
import type { Empreendimento } from "@/lib/rendal/content/empreendimentos";
import { STATUS_LABEL, fatosDoEmpreendimento } from "@/lib/rendal/content/empreendimentos";
import { cn } from "@/lib/utils";

export function ProjectHero({ item }: { item: Empreendimento }) {
  if (item.heroVideo) {
    return <VideoHero item={item} />;
  }
  return <FacadeHero item={item} />;
}

function projectTitle(nome: string) {
  const [lead, ...rest] = nome.split(" ");
  return (
    <span className={cn("box-decoration-clone pb-[0.35em]", headlineLight)}>
      {lead}
      {rest.length ? (
        <>
          <br />
          {rest.join(" ")}
        </>
      ) : null}
    </span>
  );
}

function VideoHero({ item }: { item: Empreendimento }) {
  const video = item.heroVideo!;

  return (
    <PageHero
      className="pb-24"
      eyebrow={`${STATUS_LABEL[item.status]} · ${item.bairro ?? item.cidade}`}
      title={projectTitle(item.nome)}
      subtitle={item.heroLead ?? fatosDoEmpreendimento(item)}
      priority
      action={
        <RendalButton href="#visita" onClick={() => track("cta_visita_click")}>
          Agendar visita
        </RendalButton>
      }
      media={<HeroVideo src={video.src} poster={video.poster} alt={video.alt} />}
    />
  );
}

function FacadeHero({ item }: { item: Empreendimento }) {
  const [period, setPeriod] = useState<"dia" | "noite">("dia");
  const media = period === "dia" ? item.heroDia : item.heroNoite;

  return (
    <PageHero
      className="pb-24"
      wide
      eyebrow={`${STATUS_LABEL[item.status]} · ${item.bairro ?? item.cidade}`}
      title={projectTitle(item.nome)}
      subtitle={item.heroLead ?? fatosDoEmpreendimento(item)}
      priority
      action={
        <RendalButton href="#visita" onClick={() => track("cta_visita_click")}>
          Agendar visita
        </RendalButton>
      }
      media={
        <div className="flex w-full flex-col items-center">
          <SegmentedControl
            label="Horário da fachada"
            value={period}
            onChange={setPeriod}
            options={[
              { value: "dia", label: "Dia" },
              { value: "noite", label: "Noite" },
            ]}
          />
          <div className="relative mt-6 aspect-[16/9] min-h-[16rem] w-full overflow-hidden rounded-3xl bg-[#EDE6DA] ring-1 ring-[#1F1F1F]/10 sm:min-h-[22rem] lg:min-h-[28rem]">
            <Image
              src={media.src}
              alt={media.alt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center transition-opacity duration-700 motion-reduce:transition-none"
              style={{ transitionTimingFunction: EASE }}
            />
          </div>
        </div>
      }
    />
  );
}

function HeroVideo({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    setReady(true);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || !ready) return;
    node.muted = true;
    node.defaultMuted = true;
    node.volume = 0;
    if (paused) {
      node.pause();
      return;
    }
    const play = node.play();
    if (play) play.catch(() => undefined);
  }, [ready, paused, src]);

  const posterImage = (
    <Image
      src={poster}
      alt={alt}
      fill
      priority
      sizes="(max-width: 1024px) 100vw, 1152px"
      className="object-cover"
    />
  );

  const frame = "relative aspect-video w-full overflow-hidden rounded-3xl bg-[#EDE6DA] ring-1 ring-[#1F1F1F]/10";

  if (!ready) {
    return <div className={frame}>{posterImage}</div>;
  }

  return (
    <button
      type="button"
      aria-label={paused ? "Reproduzir vídeo" : "Pausar vídeo"}
      onClick={() => setPaused((value) => !value)}
      className={cn(
        frame,
        "cursor-pointer transition-transform duration-700 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A4A2B]",
      )}
      style={{ transitionTimingFunction: EASE }}
    >
      {posterImage}
      <video
        ref={ref}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        width={1280}
        height={720}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        suppressHydrationWarning
      />
      <span
        className={cn(
          "pointer-events-none absolute inset-0 z-10 grid place-items-center transition-opacity duration-700",
          paused ? "opacity-100" : "opacity-0",
        )}
        style={{ transitionTimingFunction: EASE }}
        aria-hidden
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-[#F8F1E3]/90 text-[#1F1F1F] shadow-[0_6px_18px_rgba(15,30,32,0.12)]">
          <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5 3.2v9.6L13 8 5 3.2Z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
