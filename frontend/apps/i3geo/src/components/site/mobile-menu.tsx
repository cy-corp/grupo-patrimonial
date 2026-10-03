"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { brand } from "@/lib/brand";
import { coverage, instagram } from "@/lib/content";

const links = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
] as const;

// Menu de tela cheia para telas estreitas. O botão herda a cor do cabeçalho.
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Abrir menu"
        aria-expanded={open}
        aria-controls="menu-celular"
        onClick={() => setOpen(true)}
        className="flex size-10 flex-col items-end justify-center gap-1.5 sm:hidden"
      >
        <span className="block h-0.5 w-6 bg-current" />
        <span className="block h-0.5 w-6 bg-current" />
      </button>
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                id="menu-celular"
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-50 flex flex-col bg-[#F6F4EF] px-6 pb-8 text-graphite sm:hidden"
              >
                <div className="flex h-16 shrink-0 items-center justify-between">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand/logo-i3geo-wordmark.svg" alt={brand.name} className="h-8 w-auto" />
                  <button type="button" onClick={() => setOpen(false)} className="-mr-2 px-2 py-2 text-sm font-semibold text-brand">
                    Fechar
                  </button>
                </div>
                <nav aria-label="Menu" className="mt-8 flex-1">
                  <ul>
                    {links.map((item, i) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + i * 0.06, duration: 0.35 }}
                        className="border-b border-brand/15"
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="block py-5 text-4xl font-bold tracking-tight text-brand"
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                  <a href={instagram} target="_blank" rel="noreferrer" className="mt-6 inline-block text-base font-semibold text-brand underline underline-offset-4">
                    Instagram
                  </a>
                </nav>
                <p className="text-sm leading-relaxed text-graphite/75">
                  Atendimento em {coverage.states.join(" e ")}, em um raio de até {coverage.radiusKm} km.
                </p>
                <Link
                  href="/orcamento"
                  onClick={() => setOpen(false)}
                  className="mt-5 block bg-orange px-6 py-4 text-center text-base font-bold text-graphite"
                >
                  Solicitar orçamento
                </Link>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
