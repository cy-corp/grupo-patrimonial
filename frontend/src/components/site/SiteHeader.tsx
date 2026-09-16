"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cn } from "@/lib/utils";
import type { CompanyId } from "@/lib/companies";
import { companies } from "@/lib/companies";
import { siteConfigs } from "@grupo-patrimonial/site-config";
import { useDcorpChrome } from "./dcorp-chrome";
import { DcorpHandoffLogo } from "./DcorpHandoffLogo";

function cssNumber(name: string, fallback: number) {
  if (typeof window === "undefined") return fallback;
  const parsed = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() || String(fallback),
  );
  return Number.isFinite(parsed) ? parsed : fallback;
}

function LearnChevron() {
  return (
    <span className="t-learn-chevron" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path className="t-learn-arm t-learn-arm-top" d="M6 4L10 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path className="t-learn-arm t-learn-arm-bot" d="M10 8L6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/** Graphite / silver CTA — CSS metal rim (no WebGL). Rendal default. */
function MetalCta({
  href,
  label,
  className,
  onClick,
  fullWidth,
}: {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "t-learn site-header-cta-metal inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-[11px] font-semibold tracking-[-0.01em] whitespace-nowrap",
        fullWidth && "w-full h-12",
        className,
      )}
    >
      <span>{label}</span>
      <LearnChevron />
    </Link>
  );
}

/** DCORP gold metallic CTA — shared brand CTA surface. */
function GoldCta({
  href,
  label,
  className,
  onClick,
  fullWidth,
}: {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "t-learn gold-metallic-cta inline-flex h-10 items-center justify-center gap-2 rounded-md px-5 text-[13px] font-semibold tracking-[-0.01em] whitespace-nowrap uppercase",
        fullWidth && "w-full h-12",
        className,
      )}
    >
      <span>{label}</span>
      <LearnChevron />
    </Link>
  );
}

export function SiteHeader({ companyId }: { companyId: CompanyId }) {
  const config = siteConfigs[companyId];
  const pathname = usePathname();
  const isDcorp = companyId === "dcorp";
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuShown, setMenuShown] = useState(false);
  const menuId = useId();
  const tabsRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<number>(0);
  const hoverIndex = useRef<number | null>(null);
  const isHome = pathname === "/";
  const chrome = useDcorpChrome();
  const mobileHandoff = Boolean(isDcorp && isHome && chrome?.isMobile);
  const showHeaderLogo = !mobileHandoff || Boolean(chrome?.logoInHeader) || open;

  const matchedIndex = config.links.findIndex((link) => link.href === pathname);
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
      pill.style.transform = `translateX(${tab.offsetLeft}px)`;
      pill.style.width = `${tab.offsetWidth}px`;
      void pill.offsetWidth;
      pill.style.transition = previous;
      return;
    }
    pill.style.transform = `translateX(${tab.offsetLeft}px)`;
    pill.style.width = `${tab.offsetWidth}px`;
  }, []);

  const paintSheen = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--sheen-x", `${x}%`);
    el.style.setProperty("--sheen-y", `${y}%`);
  }, []);

  const clearSheen = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.removeProperty("--sheen-x");
    event.currentTarget.style.removeProperty("--sheen-y");
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

  useLayoutEffect(() => {
    let ticking = false;
    const threshold = isDcorp && isHome ? 72 : 16;
    const readY = () =>
      window.scrollY || document.documentElement.scrollTop || 0;
    const update = () => {
      const next = readY() > threshold;
      setScrolled((prev) => (prev === next ? prev : next));
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDcorp, isHome]);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

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
    const onResize = () => movePillToIndex(hoverIndex.current ?? activeIndex, false);
    const observer = new ResizeObserver(onResize);
    observer.observe(bar);
    window.addEventListener("resize", onResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [movePillToIndex, activeIndex, config.links]);

  useEffect(() => {
    const id = requestAnimationFrame(() => movePillToIndex(activeIndex, true));
    return () => cancelAnimationFrame(id);
  }, [pathname, activeIndex, movePillToIndex]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const ctaHref = companies[companyId].contactHref;
  const HeaderCta = isDcorp ? GoldCta : MetalCta;
  const attached =
    isDcorp &&
    isHome &&
    !open &&
    (mobileHandoff ? !chrome?.logoInHeader : !scrolled);

  const headerLogoVariant = attached ? "hero" : "header";

  return (
    <header
      className={cn(
        "site-header pointer-events-none fixed inset-x-0 top-0 z-[100] px-4 pt-[max(0.85rem,env(safe-area-inset-top))] md:px-6 md:pt-[max(1.15rem,env(safe-area-inset-top))]",
        isDcorp && "site-header--dcorp",
        attached && "site-header--attached",
      )}
      data-attached={attached ? "true" : "false"}
    >
      <div
        className={cn(
          "pointer-events-auto relative mx-auto transition-[max-width] duration-[var(--duration-fast)] ease-[var(--ease-smooth-out)]",
          attached ? "max-w-6xl" : "max-w-5xl",
          isDcorp && "max-w-6xl",
        )}
      >
        <div
          data-scrolled={scrolled}
          data-attached={attached ? "true" : "false"}
          onPointerMove={attached ? undefined : paintSheen}
          onPointerLeave={attached ? undefined : clearSheen}
          className={cn(
            "site-glass site-glass-sheen site-header-bar flex h-[3.75rem] items-center gap-2 px-2.5 sm:px-3",
            isDcorp ? "rounded-xl site-glass-dcorp" : "rounded-full",
            companyId === "rendal" && "site-glass-rendal",
            attached && "site-header-bar--attached",
          )}
        >
          {mobileHandoff ? (
            <div className="relative z-10 mr-auto flex h-11 w-[9.75rem] shrink-0 items-center px-2">
              <Link
                href={config.homeHref}
                aria-label={`${config.name} - início`}
                tabIndex={showHeaderLogo ? 0 : -1}
                aria-hidden={!showHeaderLogo}
                className={cn(
                  "flex items-center rounded-md transition-opacity duration-[var(--duration-medium)] ease-[var(--ease-smooth-out)] active:scale-[0.96]",
                  showHeaderLogo
                    ? "opacity-100"
                    : "pointer-events-none opacity-0",
                )}
              >
                <DcorpHandoffLogo
                  variant={headerLogoVariant}
                  priority
                  className="h-11 w-[9.75rem]"
                />
              </Link>
            </div>
          ) : showHeaderLogo ? (
            <Link
              href={config.homeHref}
              aria-label={`${config.name} - início`}
              className={cn(
                "relative z-10 mr-auto flex shrink-0 items-center px-2 py-1 active:scale-[0.96]",
                isDcorp ? "rounded-md" : "rounded-full",
              )}
            >
              {isDcorp ? (
                <DcorpHandoffLogo
                  variant={headerLogoVariant}
                  priority
                  className="h-11 w-[9.75rem] sm:h-12 sm:w-[11rem]"
                />
              ) : (
                <span className="relative block h-11 w-[9.75rem] sm:h-12 sm:w-[11rem]">
                  <Image
                    src={config.logo}
                    alt={config.name}
                    width={1016}
                    height={813}
                    className="absolute inset-0 h-full w-full object-contain object-left"
                    priority
                  />
                </span>
              )}
            </Link>
          ) : null}

          <nav
            ref={tabsRef}
            aria-label="Principal"
            className={cn(
              "t-tabs site-header-tabs relative mx-auto hidden min-w-0 flex-1 justify-center",
              isDcorp ? "2xl:inline-flex" : "min-[1150px]:inline-flex",
            )}
            onMouseLeave={() => {
              hoverIndex.current = null;
              movePillToIndex(activeIndex, true);
            }}
          >
            <span ref={pillRef} className="t-tabs-pill" aria-hidden="true" />
            {config.links.map((link, index) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn("t-tab", isDcorp && "site-header-tab--dcorp")}
                  aria-selected={active}
                  aria-current={active ? "page" : undefined}
                  onMouseEnter={() => {
                    hoverIndex.current = index;
                    movePillToIndex(index, true);
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <div
              className={cn(
                "hidden",
                isDcorp ? "2xl:block" : "min-[1150px]:block",
              )}
            >
              <HeaderCta href={ctaHref} label={config.ctaLabel} />
            </div>

            <button
              type="button"
              onClick={() => (open ? closeMenu() : openMenu())}
              className={cn(
                "site-header-menu-btn flex size-11 items-center justify-center transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] active:scale-[0.96]",
                isDcorp ? "rounded-md 2xl:hidden" : "rounded-full min-[1150px]:hidden",
                attached
                  ? "text-white hover:bg-white/10"
                  : "text-graphite hover:bg-graphite/5",
              )}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls={menuId}
            >
              <span className="t-icon-swap" data-state={open ? "b" : "a"}>
                <span className="t-icon" data-icon="a">
                  <Menu size={18} strokeWidth={2} />
                </span>
                <span className="t-icon" data-icon="b">
                  <X size={18} strokeWidth={2} />
                </span>
              </span>
            </button>
          </div>
        </div>

        <div
          id={menuId}
          data-origin="top-right"
          data-scrolled="true"
          className={cn(
            "t-dropdown t-dropdown-panel site-header-dropdown site-glass",
            isDcorp ? "2xl:hidden" : "min-[1150px]:hidden",
            isDcorp && "site-glass-dcorp rounded-xl",
            companyId === "rendal" && "site-glass-rendal",
            open && "is-open",
            closing && "is-closing",
          )}
        >
          <nav
            className={cn("t-stagger flex flex-col gap-1", menuShown && "is-shown", closing && "is-hiding")}
            aria-label="Menu móvel"
          >
            {config.links.map((link, index) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "t-stagger-line site-header-mobile-link px-4 py-3.5 transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)]",
                    isDcorp ? "rounded-md" : "rounded-2xl",
                    active ? "bg-white text-graphite shadow-sm" : "text-graphite/70 hover:bg-white/75 hover:text-graphite",
                  )}
                  style={{ transitionDelay: `calc(var(--stagger-stagger) * ${index})` } as CSSProperties}
                >
                  {link.label}
                </Link>
              );
            })}
            <div
              className="t-stagger-line mt-2"
              style={
                {
                  transitionDelay: `calc(var(--stagger-stagger) * ${config.links.length})`,
                } as CSSProperties
              }
            >
              <HeaderCta
                href={ctaHref}
                label={config.ctaLabel}
                onClick={closeMenu}
                fullWidth
              />
            </div>
          </nav>
        </div>
      </div>

      <button
        type="button"
        aria-label="Fechar menu"
        tabIndex={open ? 0 : -1}
        className={cn(
          "site-header-backdrop fixed inset-0 -z-10",
          isDcorp ? "2xl:hidden" : "min-[1150px]:hidden",
          open ? "pointer-events-auto is-open" : "pointer-events-none",
        )}
        onClick={closeMenu}
      />
    </header>
  );
}
