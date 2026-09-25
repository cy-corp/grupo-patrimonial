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
const HERO_IMG_MOBILE = "/wireframes/hero-preview-ceu-9x16.jpg";

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
  /** Capsule by default; omit / override via className when stacked */
  radius = 999,
}: {
  className?: string;
  children: ReactNode;
  borderless?: boolean;
  radius?: number | string | false;
}) {
  return (
    <div
      className={className}
      style={{
        ...(radius === false ? {} : { borderRadius: radius }),
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
      <section
        className="relative min-h-[calc(100dvh-0.375rem)] overflow-hidden rounded-[1.25rem] border-[0.5px] border-white/90 bg-[#1F1F1F] text-white md:min-h-[calc(100dvh-0.5rem)] md:rounded-[1.75rem] lg:rounded-[2.25rem]"
      >
        <Image
          src={HERO_IMG_MOBILE}
          alt="Empreendimento Rendal com laje de lazer"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_42%] md:hidden"
        />
        <Image
          src={HERO_IMG}
          alt=""
          fill
          sizes="100vw"
          className="hidden object-cover object-center md:block"
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,40,55,.22) 0%, rgba(15,15,15,.08) 28%, rgba(15,15,15,.35) 72%, rgba(15,15,15,.55) 100%)",
          }}
        />

        <div className="relative z-[2] flex min-h-[calc(100dvh-0.375rem)] flex-col px-4 pb-10 pt-4 sm:px-8 sm:pb-12 sm:pt-5 md:min-h-[calc(100dvh-0.5rem)] md:px-16 md:pb-14 md:pt-6 lg:px-24 xl:px-28">
          <header className="relative z-20 flex min-h-11 items-center justify-between gap-3 sm:min-h-12">
            <Link
              href="/"
              aria-label="Grupo Rendal - início"
              className="relative z-[1] flex h-16 w-[7.5rem] shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] p-1.5 shadow-[inset_0_0.5px_0_rgba(255,255,255,0.28),0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md transition-[background-color,transform] duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-white/15 active:scale-[0.96] sm:h-[4.5rem] sm:w-[8.5rem] sm:border-white/20 sm:p-2 sm:shadow-[inset_0_0.5px_0_rgba(255,255,255,0.45),0_8px_24px_rgba(0,0,0,0.14)]"
            >
              <Image
                src="/brands/rendal-logo-sem-subtitulo.png"
                alt="Grupo Rendal"
                width={1016}
                height={813}
                priority
                className="h-full w-full object-contain object-center"
              />
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

          <div className="flex flex-1 flex-col items-center px-1 pb-2 pt-3 text-center sm:px-2 sm:pb-0 sm:pt-12 md:px-4 md:pt-16 lg:pt-20">
            {/* Mobile: bloco editorial nos 3/4 superiores da imagem (como o desktop) */}
            <div className="flex w-full flex-1 flex-col items-center sm:flex-none sm:flex-initial">
              <div className="flex w-full flex-[3] flex-col items-center justify-center gap-5 pt-0 sm:flex-none sm:justify-start sm:gap-0 sm:pt-0">
                <div className="flex -translate-y-8 flex-col items-center sm:translate-y-0">
                  <h1 className="m-0 max-w-[20rem] text-[clamp(1.85rem,7.2vw,5.75rem)] font-bold leading-[1.05] tracking-[-0.04em] [text-shadow:0_2px_40px_rgba(0,0,0,0.35)] sm:max-w-none sm:text-[clamp(2.35rem,8.2vw,5.75rem)] sm:leading-[1.08]">
                    <span className="block whitespace-nowrap">
                      Casa que parece cara.
                    </span>
                    <span className="block whitespace-nowrap">Preço que cabe.</span>
                  </h1>
                  <p className="mt-2.5 max-w-[20.5rem] text-[12.5px] leading-[1.35] text-white/85 sm:mt-8 sm:max-w-[48ch] sm:text-[16px] sm:leading-[1.6] md:mt-12 md:text-[17px]">
                    <span className="block whitespace-nowrap sm:inline sm:whitespace-normal sm:text-pretty">
                      Valor onde se vê. Inteligência onde não se vê.
                    </span>{" "}
                    <span className="block whitespace-nowrap sm:inline sm:whitespace-normal sm:text-pretty">
                      Lazer na laje e acabamento de presença acessível.
                    </span>
                  </p>
                </div>

                <CssGlass
                  borderless
                  radius={false}
                  className="mt-0 translate-y-3 flex w-full max-w-[20rem] flex-col items-stretch gap-1.5 rounded-[1.25rem] p-1.5 sm:mt-8 sm:translate-y-0 sm:max-w-[48rem] sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:rounded-full sm:p-0 sm:py-2.5 sm:pl-6 sm:pr-2.5 md:mt-9"
                >
                  <div className="grid grid-cols-2 gap-0 sm:contents">
                    <div className="flex flex-col items-center justify-center px-2 py-1.5 text-center leading-[1.25] text-white sm:flex-1 sm:px-3">
                      <strong className="text-[12px] font-bold whitespace-nowrap sm:text-[13px] md:text-[14px]">
                        Mais valor{" "}
                        <span
                          className="text-[10px] font-normal tracking-widest text-[#C9A96A] sm:text-[12px]"
                          aria-hidden
                        >
                          ★★★★★
                        </span>
                      </strong>
                      <span className="mt-0.5 text-[11px] font-medium whitespace-nowrap text-white/75 sm:text-[12px] md:text-[13px]">
                        mesmo investimento
                      </span>
                    </div>
                    <div
                      className="hidden h-8 w-px shrink-0 self-center bg-white/30 sm:block"
                      aria-hidden
                    />
                    <div className="flex flex-col items-center justify-center border-l border-white/20 px-2 py-1.5 text-center leading-[1.25] text-white sm:flex-1 sm:border-l-0 sm:px-3">
                      <strong className="text-[12px] font-bold whitespace-nowrap sm:text-[13px] md:text-[14px]">
                        Classes B e C
                      </strong>
                      <span className="mt-0.5 text-[11px] font-medium whitespace-nowrap text-white/75 sm:text-[12px] md:text-[13px]">
                        produto com presença
                      </span>
                    </div>
                  </div>
                  <div
                    className="hidden h-8 w-px shrink-0 bg-white/30 sm:block"
                    aria-hidden
                  />
                  <div className="flex items-center justify-center px-0.5 sm:flex-1 sm:pl-4 sm:pr-3">
                    <Link
                      href="/empreendimentos"
                      className={cn(
                        PETROL_METAL,
                        "h-10 w-full cursor-pointer text-[12px] sm:h-12 sm:w-auto sm:px-5 sm:text-[14px]",
                      )}
                    >
                      Ver empreendimentos
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </CssGlass>
              </div>
              {/* 1/4 inferior livre pra laje / overlap dos cards */}
              <div className="min-h-0 flex-1 sm:hidden" aria-hidden />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
