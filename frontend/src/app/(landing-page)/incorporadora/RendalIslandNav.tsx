"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { siteConfigs } from "@grupo-patrimonial/site-config";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/rendal/tokens";

const ATALHOS = [
  { label: "Quero financiar", href: "/contato?perfil=financiar#financiamento" },
  { label: "Tenho um terreno", href: "/contato?perfil=terreno" },
  { label: "Quero investir", href: "/contato?perfil=investir" },
  { label: "Sou imobiliária", href: "/contato?perfil=parceiro" },
];

function active(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function RendalIslandNav() {
  const links = siteConfigs.rendal.links;
  const pathname = usePathname();
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const home = pathname === "/" || pathname === "/concept";
  const cta = home
    ? { href: "/empreendimentos", label: "Ver empreendimentos" }
    : { href: "/contato", label: "Fale com a Rendal" };

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

      <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-center px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:pt-6">
        <div className="pointer-events-auto flex w-max max-w-full items-center justify-between gap-3 rounded-full bg-white/70 py-2 pl-5 pr-2 shadow-[0_8px_32px_rgba(31,31,31,0.08)] ring-1 ring-[#1F1F1F]/5 backdrop-blur-xl sm:gap-4 lg:gap-6">
          <Link href="/" aria-label="Rendal, início" className="shrink-0" onClick={() => setOpen(false)}>
            <Image
              src="/brands/rendal-logo-sem-subtitulo.png"
              alt="Rendal"
              width={1016}
              height={813}
              priority
              className="h-9 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-5 lg:flex" aria-label="Seções">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active(pathname, link.href) ? "page" : undefined}
                className={cn(
                  "relative text-sm font-semibold text-[#1F1F1F]/65 transition-colors duration-700 hover:text-[#1F1F1F]",
                  active(pathname, link.href) &&
                    "text-[#1F1F1F] after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-[#C9A96A]",
                )}
                style={{ transitionTimingFunction: EASE }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={cta.href}
              className="hidden h-10 min-h-11 cursor-pointer items-center justify-center rounded-full bg-[#0F5B63] px-4 text-sm font-semibold text-white transition-colors duration-700 hover:bg-[#0A474E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5B63] lg:inline-flex"
              style={{ transitionTimingFunction: EASE }}
            >
              {cta.label}
            </Link>
            <button
              type="button"
              className="relative inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-[#1F1F1F] lg:hidden"
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
          "fixed inset-0 z-50 flex flex-col justify-center overflow-y-auto bg-white/80 px-8 py-24 backdrop-blur-3xl transition-opacity duration-700 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        style={{ transitionTimingFunction: EASE }}
      >
        <nav aria-label="Seções" className="flex flex-col gap-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="min-h-11 text-4xl font-semibold tracking-tight text-[#1F1F1F]"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            {ATALHOS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 items-center text-base font-semibold text-[#0F5B63]"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href={cta.href}
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex h-12 w-max items-center justify-center rounded-full bg-[#0F5B63] px-6 text-base font-semibold text-white"
          >
            {cta.label}
          </Link>
        </nav>
      </div>
    </>
  );
}
