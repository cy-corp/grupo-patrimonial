"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { CaretDown } from "@phosphor-icons/react";
import { siteConfigs } from "@grupo-patrimonial/site-config";
import { cn } from "@/lib/utils";

const HERO_IMG = "/wireframes/hero-preview-ceu.jpg";
const HERO_IMG_MOBILE = "/wireframes/hero-preview-ceu-9x16.jpg";
const EASE = "cubic-bezier(0.32,0.72,0,1)";
const NAV_DESKTOP = "min-[1150px]";

const PETROL_CTA =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0F5B63] px-5 text-sm font-semibold tracking-tight text-white transition-[background-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#0A474E] hover:shadow-[0_8px_24px_rgba(15,91,99,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98] sm:h-12 sm:px-6 sm:text-base";

function CssGlass({
  className,
  children,
  borderless = false,
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

function cssNumber(name: string, fallback: number) {
  if (typeof window === "undefined") return fallback;
  const parsed = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
      String(fallback),
  );
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function RendalHomeHero() {
  const config = siteConfigs.rendal;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [menuShown, setMenuShown] = useState(false);
  const menuId = useId();
  const closeTimer = useRef(0);
  const tabsRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const hoverIndex = useRef<number | null>(null);

  const links = [
    ...config.links.filter((l) => l.href !== "/contato"),
    { label: "Contato", href: "/contato" },
  ];

  const matchedIndex = links.findIndex((link) => link.href === pathname);
  const activeIndex = matchedIndex;

  const movePillToIndex = useCallback((index: number, animate: boolean) => {
    const bar = tabsRef.current;
    const pill = pillRef.current;
    if (!bar || !pill) return;
    const tabs = [...bar.querySelectorAll<HTMLElement>(".t-tab")];
    const tab = index >= 0 ? tabs[index] : undefined;
    if (!tab) {
      const previous = pill.style.transition;
      if (!animate) pill.style.transition = "none";
      pill.style.width = "0px";
      void pill.offsetWidth;
      if (!animate) pill.style.transition = previous;
      return;
    }
    if (!animate) {
      const previous = pill.style.transition;
      pill.style.transition = "none";
      pill.style.transform = `translate(${tab.offsetLeft}px, -50%)`;
      pill.style.width = `${tab.offsetWidth}px`;
      void pill.offsetWidth;
      pill.style.transition = previous;
      return;
    }
    pill.style.transform = `translate(${tab.offsetLeft}px, -50%)`;
    pill.style.width = `${tab.offsetWidth}px`;
  }, []);

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

  useLayoutEffect(() => {
    movePillToIndex(activeIndex, false);
    const bar = tabsRef.current;
    if (!bar) return;
    const onResize = () =>
      movePillToIndex(hoverIndex.current ?? activeIndex, false);
    const observer = new ResizeObserver(onResize);
    observer.observe(bar);
    window.addEventListener("resize", onResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [movePillToIndex, activeIndex, links.length]);

  useEffect(() => {
    const id = requestAnimationFrame(() => movePillToIndex(activeIndex, true));
    return () => cancelAnimationFrame(id);
  }, [pathname, activeIndex, movePillToIndex]);

  return (
    <section className="relative min-h-svh overflow-hidden bg-[#1F1F1F] text-white">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#1F1F1F]"
      >
        Ir para o conteúdo
      </a>

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
            "linear-gradient(180deg, rgba(15,40,55,.28) 0%, rgba(15,15,15,.12) 30%, rgba(15,15,15,.42) 68%, rgba(15,15,15,.62) 100%)",
        }}
        aria-hidden
      />

      {/* Header: glass pill compacta (estilo pré-skill, sem CssGlass no wrapper) */}
      <div className="relative z-20 mx-auto mt-6 w-max max-w-[calc(100%-2rem)]">
        <div
          className="flex h-16 max-w-full items-center gap-1.5 overflow-hidden rounded-full p-1.5 sm:h-[4.5rem] sm:gap-2 sm:p-2"
          style={
            {
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.12) 100%)",
              backdropFilter: "blur(16px) saturate(150%)",
              WebkitBackdropFilter: "blur(16px) saturate(150%)",
              border: "0.5px solid rgba(255,255,255,0.18)",
              boxShadow:
                "inset 0 0.5px 0 rgba(255,255,255,0.4), 0 8px 24px rgba(0,0,0,0.14)",
              "--tabs-bar-bg": "transparent",
              "--tabs-pill-bg": "rgba(255,255,255,0.18)",
              "--tabs-text-muted": "rgba(255,255,255,0.78)",
              "--tabs-text-active": "#FFFFFF",
            } as CSSProperties
          }
        >
          <Link
            href="/"
            aria-label="Rendal, início"
            className="relative z-10 flex h-full w-auto shrink-0 items-center justify-center rounded-full px-3 py-0.5 transition-[background-color,transform] duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-white/12 active:scale-[0.96] sm:px-3.5"
          >
            <Image
              src="/brands/rendal-logo-sem-subtitulo.png"
              alt="Rendal"
              width={1016}
              height={813}
              priority
              className="h-full w-auto max-w-[6rem] object-contain object-center sm:max-w-[7.25rem]"
            />
          </Link>

          <nav
            ref={tabsRef}
            aria-label="Principal"
            className={cn(
              // .t-tabs forces display:inline-flex — gate with matching !important media queries
              "t-tabs relative h-full shrink-0 items-center max-[1149px]:!hidden",
              `${NAV_DESKTOP}:!inline-flex`,
            )}
            style={{ padding: "0 2px", gap: 2 }}
            onMouseLeave={() => {
              hoverIndex.current = null;
              movePillToIndex(activeIndex, true);
            }}
          >
            <span
              ref={pillRef}
              className="t-tabs-pill"
              aria-hidden
              style={{
                top: "50%",
                height: 34,
                borderRadius: 999,
                background: "rgba(255,255,255,0.18)",
                boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.28)",
              }}
            />
            {links.map((item, index) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className="t-tab inline-flex items-center bg-transparent font-sans text-base font-semibold tracking-tight text-white/90 no-underline"
                  style={{
                    fontFamily: "inherit",
                    height: 34,
                    padding: "0 12px",
                    fontSize: "1rem",
                    borderRadius: 999,
                    background: "transparent",
                    color: active ? "#FFFFFF" : "rgba(255,255,255,0.78)",
                  }}
                  aria-selected={active}
                  aria-current={active ? "page" : undefined}
                  onMouseEnter={() => {
                    hoverIndex.current = index;
                    movePillToIndex(index, true);
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div
            className={cn(
              "relative z-10 flex h-full aspect-square shrink-0 items-center justify-center",
              `${NAV_DESKTOP}:hidden`,
            )}
          >
            <button
              type="button"
              className="inline-flex size-full cursor-pointer items-center justify-center rounded-full text-white transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:bg-white/12 active:scale-[0.96]"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => (open ? closeMenu() : openMenu())}
            >
              <span
                className="relative flex size-5 items-center justify-center sm:size-6"
                aria-hidden
              >
                <span
                  className={cn(
                    "absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 bg-white transition-all duration-700",
                    open ? "-translate-y-1/2 rotate-45" : "-translate-y-[7px]",
                  )}
                  style={{ transitionTimingFunction: EASE }}
                />
                <span
                  className={cn(
                    "absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2 bg-white transition-all duration-700",
                    open && "opacity-0",
                  )}
                  style={{ transitionTimingFunction: EASE }}
                />
                <span
                  className={cn(
                    "absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 bg-white transition-all duration-700",
                    open ? "-translate-y-1/2 -rotate-45" : "translate-y-[7px]",
                  )}
                  style={{ transitionTimingFunction: EASE }}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown — same t-dropdown / stagger as SiteHeader */}
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
              {links.map((item, index) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    tabIndex={open ? 0 : -1}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "t-stagger-line cursor-pointer rounded-xl px-4 py-3.5 text-base font-semibold transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)]",
                      active
                        ? "bg-white/20 text-white"
                        : "text-white/90 hover:bg-white/10",
                    )}
                    style={
                      {
                        transitionDelay: `calc(var(--stagger-stagger) * ${index})`,
                      } as CSSProperties
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
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

      <div className="relative z-10 flex min-h-[calc(100svh-6.5rem)] flex-col px-6 pb-10 pt-8 text-center sm:px-8 sm:pt-12 md:px-16 md:pt-14 lg:px-24">
        {/* Bloco editorial nos 3/4 superiores — como a hero anterior */}
        <div className="mx-auto flex w-full max-w-[48rem] flex-[3] flex-col items-center justify-center gap-8 min-[400px]:gap-12 sm:gap-16 md:gap-20">
          <div className="-translate-y-2 min-[400px]:-translate-y-4 sm:-translate-y-8 md:-translate-y-10">
            <HeroHeadline />
          </div>

          <div className="w-full translate-y-2 min-[400px]:translate-y-4 sm:translate-y-7 md:translate-y-8">
          <CssGlass
            borderless
            radius={false}
            className="mx-auto flex w-full max-w-[20rem] flex-col items-stretch gap-1.5 rounded-[1.25rem] p-1.5 md:max-w-none md:flex-row md:items-center md:justify-between md:gap-0 md:rounded-full md:p-0 md:py-2.5 md:pl-6 md:pr-2.5"
          >
            <div className="grid grid-cols-2 gap-0 md:contents">
              <div className="flex flex-col items-center justify-center px-2 py-1.5 text-center leading-5 text-white md:flex-1 md:px-3">
                <strong className="text-xs font-semibold min-[380px]:whitespace-nowrap sm:text-sm">
                  Mais valor{" "}
                  <span
                    className="text-[10px] font-normal tracking-widest text-[#C9A96A] sm:text-xs"
                    aria-hidden
                  >
                    ★★★★★
                  </span>
                </strong>
                <span className="mt-0.5 text-[11px] font-medium min-[380px]:whitespace-nowrap text-white/75 sm:text-xs">
                  mesmo investimento
                </span>
              </div>
              <div
                className="hidden h-8 w-px shrink-0 self-center bg-white/30 md:block"
                aria-hidden
              />
              <div className="flex flex-col items-center justify-center border-l border-white/20 px-2 py-1.5 text-center leading-5 text-white md:flex-1 md:border-l-0 md:px-3">
                <strong className="text-xs font-semibold min-[380px]:whitespace-nowrap sm:text-sm">
                  Avaliação Caixa
                </strong>
                <span className="mt-0.5 text-[11px] font-medium min-[380px]:whitespace-nowrap text-white/75 sm:text-xs">
                  30 a 40% acima
                </span>
              </div>
            </div>
            <div
              className="hidden h-8 w-px shrink-0 bg-white/30 md:block"
              aria-hidden
            />
            <div className="flex items-center justify-center px-0.5 md:flex-1 md:pl-4 md:pr-3">
              <Link
                href="/empreendimentos"
                className={cn(
                  PETROL_CTA,
                  "h-10 w-full cursor-pointer text-xs md:h-12 md:w-auto md:text-sm",
                )}
              >
                Ver empreendimentos
                <span aria-hidden className="text-white/70">
                  →
                </span>
              </Link>
            </div>
          </CssGlass>
          </div>
        </div>
        {/* 1/4 inferior: cue pra descer */}
        <div className="relative z-10 flex min-h-0 flex-1 items-end justify-center pb-6 sm:pb-8 md:pb-10">
          <a
            href="#conteudo"
            aria-label="Descer para o conteúdo"
            onClick={(event) => {
              event.preventDefault();
              const target = document.getElementById("conteudo");
              if (!target) return;
              const reduce = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
              ).matches;
              if (reduce) {
                target.scrollIntoView();
                return;
              }
              const startY = window.scrollY;
              const endY =
                target.getBoundingClientRect().top + window.scrollY;
              const distance = endY - startY;
              const duration = 1100;
              const startTime = performance.now();
              const ease = (t: number) =>
                t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

              const tick = (now: number) => {
                const progress = Math.min(1, (now - startTime) / duration);
                window.scrollTo(0, startY + distance * ease(progress));
                if (progress < 1) requestAnimationFrame(tick);
              };
              requestAnimationFrame(tick);
            }}
            className="inline-flex size-12 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98] sm:size-14"
            style={{ transitionTimingFunction: EASE }}
          >
            <CssGlass className="flex size-full items-center justify-center">
              <CaretDown
                weight="bold"
                className="size-5 text-white rendal-scroll-cue sm:size-6"
                aria-hidden
              />
            </CssGlass>
          </a>
        </div>
      </div>
    </section>
  );
}

const HERO_LINE_A = ["Casa", "que", "parece", "cara."];
const HERO_LINE_B = ["Preço", "que", "cabe."];
const HERO_WORDS = [...HERO_LINE_A, ...HERO_LINE_B];

function HeroHeadline() {
  const [active, setActive] = useState<boolean[]>(() =>
    HERO_WORDS.map(() => false),
  );

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setActive(HERO_WORDS.map(() => true));
      return;
    }

    const timers: number[] = [];
    HERO_WORDS.forEach((_, i) => {
      timers.push(
        window.setTimeout(() => {
          setActive((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, 100 + i * 140),
      );
    });

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const renderLine = (words: string[], offset: number) => (
    <span className="block sm:whitespace-nowrap">
      {words.map((word, i) => {
        const index = offset + i;
        const isLast = i === words.length - 1;
        return (
          <span
            key={`${word}-${index}`}
            className={cn(
              "inline-block transition-[opacity,transform,filter] duration-700",
              active[index]
                ? "translate-y-0 opacity-100 blur-0"
                : "translate-y-3 opacity-0 blur-sm",
            )}
            style={{ transitionTimingFunction: EASE }}
          >
            {word}
            {isLast ? null : "\u00A0"}
          </span>
        );
      })}
    </span>
  );

  return (
    <h1 className="m-0 max-w-[22rem] text-[clamp(1.85rem,7.2vw,5.75rem)] font-semibold leading-[1.08] tracking-tight text-white text-balance [text-shadow:0_2px_40px_rgba(0,0,0,0.45)] sm:max-w-none sm:text-[clamp(2.35rem,8.2vw,5.75rem)]">
      {renderLine(HERO_LINE_A, 0)}
      {renderLine(HERO_LINE_B, HERO_LINE_A.length)}
    </h1>
  );
}
