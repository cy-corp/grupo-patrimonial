"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { siteConfigs } from "@grupo-patrimonial/site-config";

const HERO_IMG = "/wireframes/hero-condominio-ceu.jpg";

/** Azul-petróleo metálico — só Rendal (#0F5B63); escala CTA ref. ROFIX */
const PETROL_METAL =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full border-[0.5px] border-white/25 bg-gradient-to-b from-[#1A8A94] via-[#0F5B63] to-[#0A3F45] px-6 text-[14px] font-semibold tracking-[-0.01em] text-white shadow-[0_4px_12px_rgba(15,91,99,0.22),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,0,0,0.18)] transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px";

/** CTA do header — mesma altura visual do pill de nav (ref. ROFIX) */
const HEADER_CTA =
  "inline-flex h-12 items-center justify-center rounded-full border-[0.5px] border-white/25 bg-gradient-to-b from-[#1A8A94] via-[#0F5B63] to-[#0A3F45] px-6 text-[14px] font-semibold tracking-[-0.01em] text-white shadow-[0_4px_12px_rgba(15,91,99,0.22),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,0,0,0.18)] transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px";

function CssGlass({
  className,
  children,
  borderless = false,
}: {
  className?: string;
  children: ReactNode;
  borderless?: boolean;
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
        border: borderless ? "none" : "0.5px solid rgba(255,255,255,0.18)",
        boxShadow: borderless
          ? "0 8px 24px rgba(0,0,0,0.14)"
          : "inset 0 0.5px 0 rgba(255,255,255,0.4), 0 8px 24px rgba(0,0,0,0.14)",
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
        className="relative min-h-[calc(100dvh-0.375rem)] overflow-hidden rounded-t-[0.75rem] rounded-b-[2.75rem] border-[0.5px] border-white/90 bg-[#1F1F1F] text-white md:min-h-[calc(100dvh-0.5rem)] md:rounded-t-[1rem] md:rounded-b-[3.5rem] lg:rounded-t-[1.25rem] lg:rounded-b-[4.5rem]"
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

        <div className="relative z-[2] flex min-h-[calc(100dvh-0.375rem)] flex-col px-8 pb-36 pt-5 md:min-h-[calc(100dvh-0.5rem)] md:px-16 md:pb-40 md:pt-6 lg:px-24 xl:px-28">
          <header className="relative flex min-h-12 items-center justify-between">
            <Link href="/" className="relative z-[1] shrink-0 text-white">
              <p className="m-0 text-[20px] font-bold uppercase tracking-[0.04em] md:text-[22px]">
                Grupo Rendal
              </p>
              <p className="m-0 mt-0.5 text-[11px] font-medium tracking-[0.02em] text-white/65">
                Participações e Soluções
              </p>
            </Link>

            <CssGlass className="absolute left-1/2 top-1/2 hidden h-12 -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 px-3.5 md:flex">
              {links.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className="whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-medium text-white/92 transition-colors hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </CssGlass>

            <div className="relative z-[1] flex shrink-0 items-center gap-2">
              <button
                type="button"
                className="inline-flex size-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white md:hidden"
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
                  className="block rounded-xl px-3 py-3 text-[14px] font-medium text-white/90"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null}

          <div className="flex flex-1 flex-col items-center px-2 pt-14 text-center md:px-4 md:pt-16 lg:pt-20">
            <h1 className="m-0 px-1 text-[clamp(3rem,7.8vw,5.75rem)] font-bold leading-[1.08] tracking-[-0.04em] [text-shadow:0_2px_40px_rgba(0,0,0,0.35)]">
              <span className="block md:whitespace-nowrap">Casa que parece cara.</span>
              <span className="block md:whitespace-nowrap">Preço que cabe.</span>
            </h1>
            <p className="mt-10 max-w-[48ch] text-pretty text-[16px] leading-[1.65] text-white/85 md:mt-12 md:text-[17px]">
              Valor onde se vê. Inteligência onde não se vê. Lazer na laje e
              acabamento de presença no investimento acessível.
            </p>

            <CssGlass
              borderless
              className="mt-8 flex w-full max-w-[48rem] flex-col items-stretch gap-2 p-2 md:mt-9 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:py-2.5 sm:pl-6 sm:pr-2.5"
            >
              <div className="flex flex-1 flex-col items-center px-3 py-1.5 text-center leading-tight text-white">
                <div className="flex items-center justify-center gap-2">
                  <strong className="text-[13px] font-bold md:text-[14px]">
                    Mais valor
                  </strong>
                  <span className="text-[12px] tracking-widest text-[#C9A96A]" aria-hidden>
                    ★★★★★
                  </span>
                </div>
                <span className="mt-0.5 text-[12px] font-medium text-white/75 md:text-[13px]">
                  mesmo investimento
                </span>
              </div>
              <div className="hidden h-8 w-px shrink-0 bg-white/30 sm:block" aria-hidden />
              <div className="flex flex-1 flex-col items-center px-3 py-1.5 text-center leading-tight text-white">
                <strong className="text-[13px] font-bold md:text-[14px]">
                  Classes B e C
                </strong>
                <span className="mt-0.5 text-[12px] font-medium text-white/75 md:text-[13px]">
                  produto com presença
                </span>
              </div>
              <div className="hidden h-8 w-px shrink-0 bg-white/30 sm:block" aria-hidden />
              <div className="flex flex-1 items-center justify-center px-2 py-1 sm:pl-4 sm:pr-3">
                <Link
                  href="/empreendimentos"
                  className={`w-full sm:w-auto sm:px-5 ${PETROL_METAL}`}
                >
                  Ver empreendimentos
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </CssGlass>
          </div>
        </div>
      </section>

      {/* Cards em fluxo — cruzam a borda inferior do frame */}
      <div className="relative z-10 -mt-16 px-1 md:-mt-[4.5rem] md:px-2">
        <div className="mx-auto grid max-w-[1120px] gap-3 md:grid-cols-3 md:gap-5">
          {PROOFS.map((card) => (
            <article
              key={card.title}
              className="rounded-[22px] border border-black/[0.04] bg-white px-6 py-8 text-center shadow-[0_18px_44px_rgba(0,0,0,0.16)] md:px-7 md:py-9"
            >
              <h2 className="m-0 text-[17px] font-bold tracking-[-0.02em] text-[#1F1F1F] md:text-[18px]">
                {card.title}
              </h2>
              <p className="mt-3 m-0 text-[13.5px] leading-relaxed text-[#4D4D4D] md:text-[14px]">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
