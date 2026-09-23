"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { siteConfigs } from "@grupo-patrimonial/site-config";

const HERO_IMG = "/wireframes/hero-condominio-ceu.jpg";

/** Azul-petróleo metálico — só Rendal (#0F5B63) */
const PETROL_METAL =
  "inline-flex items-center justify-center gap-2 rounded-full border-[0.5px] border-white/25 bg-gradient-to-b from-[#1A8A94] via-[#0F5B63] to-[#0A3F45] px-[18px] py-3 text-[11px] font-bold uppercase tracking-[0.06em] text-white shadow-[0_4px_12px_rgba(15,91,99,0.22),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,0,0,0.18)] transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px";

/** CTA do header — mesma altura visual do pill de nav (ref. ROFIX) */
const HEADER_CTA =
  "inline-flex h-11 items-center justify-center rounded-full border-[0.5px] border-white/25 bg-gradient-to-b from-[#1A8A94] via-[#0F5B63] to-[#0A3F45] px-5 text-[13px] font-semibold tracking-[-0.01em] text-white shadow-[0_4px_12px_rgba(15,91,99,0.22),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,0,0,0.18)] transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px";

function CssGlass({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={className}
      style={{
        borderRadius: 999,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.12) 100%)",
        backdropFilter: "blur(16px) saturate(150%)",
        WebkitBackdropFilter: "blur(16px) saturate(150%)",
        border: "0.5px solid rgba(255,255,255,0.18)",
        boxShadow:
          "inset 0 0.5px 0 rgba(255,255,255,0.4), 0 8px 24px rgba(0,0,0,0.14)",
      }}
    >
      {children}
    </div>
  );
}

const PROOFS = [
  {
    title: "Laje de lazer",
    body: "Em vez de telhado que só gasta, a cobertura vira área de estar.",
  },
  {
    title: "Lavabo social",
    body: "Visitante se atende sem entrar na área íntima da casa.",
  },
  {
    title: "Acabamento que se vê",
    body: "Alto padrão no olho. Racionalização só no que não aparece.",
  },
] as const;

export function RendalHomeHero() {
  const config = siteConfigs.rendal;
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    ...config.links.filter((l) => l.href !== "/contato"),
    { label: "Áreas", href: "/contato?assunto=area" },
    { label: "Contato", href: "/contato" },
  ];

  return (
    <div className="relative z-20 bg-[#F8F1E3] px-1.5 pt-1.5 md:px-2 md:pt-2">
      {/* Frame fino no topo/lados; raio maior só nos cantos inferiores */}
      <section
        className="relative min-h-[calc(100dvh-0.375rem)] overflow-hidden rounded-t-[1.25rem] rounded-b-[2.75rem] border-[0.5px] border-white/90 bg-[#1F1F1F] text-white md:min-h-[calc(100dvh-0.5rem)] md:rounded-t-[1.75rem] md:rounded-b-[3.5rem] lg:rounded-t-[2rem] lg:rounded-b-[4.5rem]"
      >
        <Image
          src={HERO_IMG}
          alt="Empreendimento Rendal com laje de lazer"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,40,55,.18) 0%, rgba(15,15,15,.08) 28%, rgba(15,15,15,.35) 72%, rgba(15,15,15,.55) 100%)",
          }}
        />

        <div className="relative z-[2] flex min-h-[calc(100dvh-0.375rem)] flex-col px-8 pb-24 pt-6 md:min-h-[calc(100dvh-0.5rem)] md:px-16 md:pb-28 md:pt-7 lg:px-24 xl:px-28">
          <header className="relative flex min-h-11 items-center justify-between">
            <Link href="/" className="relative z-[1] shrink-0 text-white">
              <p className="m-0 text-[18px] font-bold uppercase tracking-[0.04em] md:text-[20px]">
                Grupo Rendal
              </p>
              <p className="m-0 mt-0.5 text-[10px] font-medium tracking-[0.02em] text-white/65">
                Participações e Soluções
              </p>
            </Link>

            <CssGlass className="absolute left-1/2 top-1/2 hidden h-11 -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 px-3 md:flex">
              {links.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className="whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-medium text-white/92 transition-colors hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </CssGlass>

            <div className="relative z-[1] flex shrink-0 items-center gap-2">
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white md:hidden"
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span className="text-lg leading-none" aria-hidden>
                  {menuOpen ? "×" : "☰"}
                </span>
              </button>
              <Link href="/contato" className={`${HEADER_CTA} whitespace-nowrap`}>
                Fale conosco
              </Link>
            </div>
          </header>

          {menuOpen ? (
            <nav className="mt-3 rounded-2xl border border-white/20 bg-black/45 p-3 backdrop-blur-md md:hidden">
              {links.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-3 py-3 text-[13px] font-medium text-white/90"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null}

          <div className="flex flex-1 flex-col items-center justify-center px-2 text-center md:px-4">
            <h1 className="m-0 max-w-[14ch] text-balance text-[clamp(2.25rem,5.4vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.04em] [text-shadow:0_2px_40px_rgba(0,0,0,0.35)]">
              Casa que parece cara. Preço que cabe.
            </h1>
            <p className="mt-4 max-w-[42ch] text-[clamp(13px,1.4vw,15px)] leading-relaxed text-white/78">
              Valor onde se vê. Inteligência onde não se vê. Lazer na laje e
              acabamento de presença no investimento acessível.
            </p>

            <CssGlass className="mt-7 flex max-w-full flex-wrap items-center justify-center gap-y-2 py-2 pl-5 pr-2">
              <div className="flex items-center gap-2 px-4 py-1.5 text-[12px] font-medium text-white">
                <strong className="font-bold">Mais valor</strong>
                <span className="text-[11px] text-white/75">mesmo investimento</span>
                <span className="tracking-widest text-[#C9A96A]" aria-hidden>
                  ★★★★★
                </span>
              </div>
              <div className="hidden h-4 w-px bg-white/30 sm:block" aria-hidden />
              <div className="flex items-center gap-2 px-4 py-1.5 text-[12px] font-medium text-white">
                <strong className="font-bold">Classes B e C</strong>
                <span className="text-[11px] text-white/75">produto com presença</span>
              </div>
              <Link href="/empreendimentos" className={`ml-1 ${PETROL_METAL}`}>
                Ver empreendimentos
                <span aria-hidden>→</span>
              </Link>
            </CssGlass>
          </div>
        </div>
      </section>

      {/* Cards em fluxo — cruzam a borda inferior do frame */}
      <div className="relative z-10 -mt-14 px-1 md:-mt-16 md:px-2">
        <div className="mx-auto grid max-w-[1120px] gap-3 md:grid-cols-3 md:gap-4">
          {PROOFS.map((card) => (
            <article
              key={card.title}
              className="rounded-[18px] border border-black/[0.04] bg-white px-5 py-7 text-center shadow-[0_18px_44px_rgba(0,0,0,0.16)]"
            >
              <h2 className="m-0 text-[15px] font-bold tracking-[-0.02em] text-[#1F1F1F]">
                {card.title}
              </h2>
              <p className="mt-2.5 m-0 text-[12.5px] leading-relaxed text-[#4D4D4D]">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
