"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { siteConfigs } from "@grupo-patrimonial/site-config";
import { cn } from "@/lib/utils";

const EASE = "cubic-bezier(0.32,0.72,0,1)";

export function RendalIslandNav() {
  const links = siteConfigs.rendal.links;
  const menuId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#1F1F1F]"
      >
        Ir para o conteúdo
      </a>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-center px-4 pt-4 sm:pt-6">
        <div className="pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-8 rounded-full bg-white/70 py-2 pl-5 pr-2 shadow-[0_8px_32px_rgba(31,31,31,0.08)] ring-1 ring-[#1F1F1F]/5 backdrop-blur-xl lg:w-max">
          <Link
            href="/concept"
            aria-label="Rendal, início"
            className="shrink-0"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/brands/rendal-logo-sem-subtitulo.png"
              alt="Rendal"
              width={1016}
              height={813}
              priority
              className="h-9 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Seções">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-[#1F1F1F]/65 transition-colors duration-700 hover:text-[#1F1F1F]"
                style={{ transitionTimingFunction: EASE }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/empreendimentos"
              className="hidden h-10 items-center justify-center rounded-full bg-[#0F5B63] px-4 text-sm font-semibold text-white transition-colors duration-700 hover:bg-[#0A474E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5B63] active:scale-[0.98] sm:inline-flex"
              style={{ transitionTimingFunction: EASE }}
            >
              Ver empreendimentos
            </Link>
            <button
              type="button"
              className="relative inline-flex size-10 items-center justify-center rounded-full text-[#1F1F1F] transition-colors duration-700 hover:bg-[#1F1F1F]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F5B63] lg:hidden"
              style={{ transitionTimingFunction: EASE }}
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
              <span
                aria-hidden
                className={cn(
                  "absolute left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-current transition-all duration-700",
                  open ? "top-1/2 rotate-45" : "top-[calc(50%-4px)]",
                )}
                style={{ transitionTimingFunction: EASE }}
              />
              <span
                aria-hidden
                className={cn(
                  "absolute left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-current transition-all duration-700",
                  open ? "top-1/2 -rotate-45" : "top-[calc(50%+4px)]",
                )}
                style={{ transitionTimingFunction: EASE }}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        id={menuId}
        inert={!open}
        className={cn(
          "fixed inset-0 z-50 flex flex-col justify-center bg-white/80 px-8 backdrop-blur-3xl transition-opacity duration-700 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        style={{ transitionTimingFunction: EASE }}
      >
        <nav aria-label="Seções" className="flex flex-col gap-6">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-4xl font-semibold tracking-tight text-[#1F1F1F] transition-all duration-700",
                open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
              )}
              style={{
                transitionTimingFunction: EASE,
                transitionDelay: open ? `${100 + index * 50}ms` : "0ms",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/empreendimentos"
            onClick={() => setOpen(false)}
            className={cn(
              "mt-6 inline-flex h-12 w-max items-center justify-center rounded-full bg-[#0F5B63] px-6 text-base font-semibold text-white transition-all duration-700",
              open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
            )}
            style={{
              transitionTimingFunction: EASE,
              transitionDelay: open ? `${100 + links.length * 50}ms` : "0ms",
            }}
          >
            Ver empreendimentos
          </Link>
        </nav>
      </div>
    </>
  );
}
