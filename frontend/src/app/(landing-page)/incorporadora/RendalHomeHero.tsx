"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { siteConfigs } from "@grupo-patrimonial/site-config";
import { cn } from "@/lib/utils";

const HERO_IMG = "/wireframes/hero-preview-ceu.jpg";

/** Nav glass + CTA desktop só quando cabe sem colidir (mesmo limiar do SiteHeader Rendal) */
const NAV_DESKTOP = "min-[1150px]";

/** Azul-petróleo metálico — só Rendal (#0F5B63); escala CTA ref. ROFIX */
const PETROL_METAL =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full border-[0.5px] border-white/25 bg-gradient-to-b from-[#1A8A94] via-[#0F5B63] to-[#0A3F45] px-5 text-[13px] font-semibold tracking-[-0.01em] text-white shadow-[0_4px_12px_rgba(15,91,99,0.22),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,0,0,0.18)] transition-[filter,transform] duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:brightness-110 active:translate-y-px sm:h-12 sm:px-6 sm:text-[14px]";

/** CTA do header — mesma altura visual do pill de nav (ref. ROFIX) */
const HEADER_CTA =
  "inline-flex h-11 items-center justify-center rounded-full border-[0.5px] border-white/25 bg-gradient-to-b from-[#1A8A94] via-[#0F5B63] to-[#0A3F45] px-5 text-[13px] font-semibold tracking-[-0.01em] text-white shadow-[0_4px_12px_rgba(15,91,99,0.22),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,0,0,0.18)] transition-[filter,transform] duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:brightness-110 active:translate-y-px sm:h-12 sm:px-6 sm:text-[14px]";

function cssNumber(name: string, fallback: number) {
  if (typeof window === "undefined") return fallback;
  const parsed = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
      String(fallback),
  );
  return Number.isFinite(parsed) ? parsed : fallback;
}

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
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [menuShown, setMenuShown] = useState(false);
  const menuId = useId();
  const closeTimer = useRef(0);

  const links = [
    ...config.links.filter((l) => l.href !== "/contato"),
    { label: "Áreas", href: "/contato?assunto=area" },
    { label: "Contato", href: "/contato" },
  ];

  const closeMenu = useCallback(() => {
    setMenuShown(false);
    setOpen(false);
    setClosing(true);
    window.clearTimeout(closeTimer.current);
    const closeMs = cssNumber("--dropdown-close-dur", 150);
    closeTimer.current = window.setTimeout(() => setClosing(false), closeMs);
  }, []);

  const openMenu = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setClosing(false);
    setOpen(true);
    requestAnimationFrame(() => setMenuShown(true));
  }, []);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeMenu]);

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
          className="object-cover object-[center_28%] sm:object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,40,55,.22) 0%, rgba(15,15,15,.08) 28%, rgba(15,15,15,.35) 72%, rgba(15,15,15,.55) 100%)",
          }}
        />

        <div className="relative z-[2] flex min-h-[calc(100dvh-0.375rem)] flex-col px-4 pb-28 pt-4 sm:px-8 sm:pb-36 sm:pt-5 md:min-h-[calc(100dvh-0.5rem)] md:px-16 md:pb-40 md:pt-6 lg:px-24 xl:px-28">
          <header className="relative z-20 flex min-h-11 items-center justify-between gap-3 sm:min-h-12">
            <Link
              href="/"
              className="relative z-[1] min-w-0 shrink text-white"
            >
              <p className="m-0 truncate text-[17px] font-bold uppercase tracking-[0.04em] sm:text-[20px] md:text-[22px]">
                Grupo Rendal
              </p>
              <p className="m-0 mt-0.5 hidden text-[11px] font-medium tracking-[0.02em] text-white/65 sm:block">
                Participações e Soluções
              </p>
            </Link>

            {/* Desktop nav — só quando há largura real (evita colisão em zoom 200%) */}
            <CssGlass
              className={cn(
                "absolute left-1/2 top-1/2 hidden h-12 -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 px-3.5",
                `${NAV_DESKTOP}:flex`,
              )}
            >
              {links.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className="cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-medium text-white/92 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </CssGlass>

            <div className="relative z-[1] flex shrink-0 items-center gap-2">
              <Link
                href="/contato"
                className={cn(
                  HEADER_CTA,
                  "hidden whitespace-nowrap",
                  `${NAV_DESKTOP}:inline-flex`,
                )}
              >
                Fale conosco
              </Link>

              <button
                type="button"
                className={cn(
                  "inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-white/18 active:scale-[0.96] sm:size-12",
                  `${NAV_DESKTOP}:hidden`,
                )}
                aria-expanded={open}
                aria-controls={menuId}
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                onClick={() => (open ? closeMenu() : openMenu())}
              >
                <span
                  className="t-icon-swap text-white"
                  data-state={open ? "b" : "a"}
                >
                  <span className="t-icon" data-icon="a">
                    <Menu size={18} strokeWidth={2} />
                  </span>
                  <span className="t-icon" data-icon="b">
                    <X size={18} strokeWidth={2} />
                  </span>
                </span>
              </button>
            </div>
          </header>

          {/* Mobile / zoom menu — mesmo padrão DCorp (dropdown + stagger) */}
          <div className={cn("relative z-30", `${NAV_DESKTOP}:hidden`)}>
            <div
              id={menuId}
              data-origin="top-right"
              aria-hidden={!open && !closing}
              className={cn(
                "t-dropdown absolute right-0 left-0 top-3 z-30 overflow-hidden rounded-[1.25rem] border border-white/20 bg-black/55 p-3 shadow-[0_18px_44px_rgba(0,0,0,0.28)] backdrop-blur-md",
                open && "is-open",
                closing && "is-closing",
              )}
            >
              <nav
                className={cn(
                  "t-stagger flex flex-col gap-1",
                  menuShown && "is-shown",
                  closing && "is-hiding",
                )}
                aria-label="Menu móvel"
              >
                {links.map((item, index) => (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    tabIndex={open ? 0 : -1}
                    onClick={closeMenu}
                    className="t-stagger-line cursor-pointer rounded-xl px-4 py-3.5 text-[14px] font-medium text-white/90 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-white/10"
                    style={
                      {
                        transitionDelay: `calc(var(--stagger-stagger) * ${index})`,
                      } as CSSProperties
                    }
                  >
                    {item.label}
                  </Link>
                ))}
                <div
                  className="t-stagger-line mt-2"
                  style={
                    {
                      transitionDelay: `calc(var(--stagger-stagger) * ${links.length})`,
                    } as CSSProperties
                  }
                >
                  <Link
                    href="/contato"
                    tabIndex={open ? 0 : -1}
                    onClick={closeMenu}
                    className={`${HEADER_CTA} w-full cursor-pointer`}
                  >
                    Fale conosco
                  </Link>
                </div>
              </nav>
            </div>
          </div>

          {(open || closing) && (
            <button
              type="button"
              aria-label="Fechar menu"
              tabIndex={open ? 0 : -1}
              className={cn(
                "site-header-backdrop fixed inset-0 z-10",
                `${NAV_DESKTOP}:hidden`,
                open ? "pointer-events-auto is-open" : "pointer-events-none",
              )}
              onClick={closeMenu}
            />
          )}

          <div className="flex flex-1 flex-col items-center px-1 pt-8 text-center sm:px-2 sm:pt-12 md:px-4 md:pt-16 lg:pt-20">
            <h1 className="m-0 max-w-[16ch] px-1 text-[clamp(2.35rem,8.2vw,5.75rem)] font-bold leading-[1.08] tracking-[-0.04em] [text-shadow:0_2px_40px_rgba(0,0,0,0.35)] sm:max-w-none">
              <span className="block sm:whitespace-nowrap">
                Casa que parece cara.
              </span>
              <span className="block sm:whitespace-nowrap">Preço que cabe.</span>
            </h1>
            <p className="mt-6 max-w-[40ch] text-pretty text-[15px] leading-[1.6] text-white/85 sm:mt-8 sm:max-w-[48ch] sm:text-[16px] md:mt-12 md:text-[17px]">
              Valor onde se vê. Inteligência onde não se vê. Lazer na laje e
              acabamento de presença no investimento acessível.
            </p>

            <CssGlass
              borderless
              className="mt-6 flex w-full max-w-[48rem] flex-col items-stretch gap-2 p-2 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:py-2.5 sm:pl-6 sm:pr-2.5 md:mt-9"
            >
              <div className="flex flex-1 flex-col items-center px-3 py-1.5 text-center leading-tight text-white">
                <div className="flex items-center justify-center gap-2">
                  <strong className="text-[13px] font-bold md:text-[14px]">
                    Mais valor
                  </strong>
                  <span
                    className="text-[12px] tracking-widest text-[#C9A96A]"
                    aria-hidden
                  >
                    ★★★★★
                  </span>
                </div>
                <span className="mt-0.5 text-[12px] font-medium text-white/75 md:text-[13px]">
                  mesmo investimento
                </span>
              </div>
              <div
                className="hidden h-8 w-px shrink-0 bg-white/30 sm:block"
                aria-hidden
              />
              <div className="flex flex-1 flex-col items-center px-3 py-1.5 text-center leading-tight text-white">
                <strong className="text-[13px] font-bold md:text-[14px]">
                  Classes B e C
                </strong>
                <span className="mt-0.5 text-[12px] font-medium text-white/75 md:text-[13px]">
                  produto com presença
                </span>
              </div>
              <div
                className="hidden h-8 w-px shrink-0 bg-white/30 sm:block"
                aria-hidden
              />
              <div className="flex flex-1 items-center justify-center px-2 py-1 sm:pl-4 sm:pr-3">
                <Link
                  href="/empreendimentos"
                  className={cn(
                    PETROL_METAL,
                    "w-full cursor-pointer sm:w-auto sm:px-5",
                  )}
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
      <div className="relative z-10 -mt-12 px-1 sm:-mt-16 md:-mt-[4.5rem] md:px-2">
        <div className="mx-auto grid max-w-[1120px] gap-3 md:grid-cols-3 md:gap-5">
          {PROOFS.map((card) => (
            <article
              key={card.title}
              className="rounded-[22px] border border-black/[0.04] bg-white px-5 py-7 text-center shadow-[0_18px_44px_rgba(0,0,0,0.16)] sm:px-6 sm:py-8 md:px-7 md:py-9"
            >
              <h2 className="m-0 text-[16px] font-bold tracking-[-0.02em] text-[#1F1F1F] md:text-[18px]">
                {card.title}
              </h2>
              <p className="mt-2.5 m-0 text-[13px] leading-relaxed text-[#4D4D4D] md:mt-3 md:text-[14px]">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
