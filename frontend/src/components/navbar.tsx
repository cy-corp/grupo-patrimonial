"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { GoldButton } from "./ui/gold-button";
import { DualBrandLockup } from "./brands/DualBrandLockup";

const mainLinks = [
  { name: "Home", href: "/" },
  { name: "Rendal", href: "/incorporadora" },
  { name: "DCorp", href: "/engenharia" },
  { name: "Quem Somos", href: "/quem-somos" },
  { name: "Contato", href: "/contato" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-[100] w-full bg-white">
      <div className="container mx-auto flex h-24 items-center justify-between px-6">
        <div className="min-[1150px]:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center gap-2 text-[#1F1F1F] p-2 hover:bg-[#D9D9D9]/40 rounded-lg transition-colors cursor-pointer"
            aria-label="Abrir menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#4D4D4D] select-none">
              {isMobileMenuOpen ? "Fechar" : "Menu"}
            </span>
          </button>
        </div>

        <Link href="/" className="min-[1150px]:order-none order-last">
          <DualBrandLockup
            className="gap-2.5"
            markClassName="max-h-12 max-w-[7.5rem] sm:max-h-14 sm:max-w-[8.5rem]"
            pipeClassName="h-11 sm:h-12"
          />
        </Link>

        <div className="hidden min-[1150px]:flex items-center gap-4 xl:gap-8">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[9px] xl:text-[10px] font-semibold uppercase tracking-[0.18em] xl:tracking-[0.22em] transition-all hover:text-primary relative group",
                pathname === link.href ? "text-primary" : "text-[#4D4D4D]"
              )}
            >
              {link.name}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full",
                  pathname === link.href && "w-full"
                )}
              />
            </Link>
          ))}
        </div>

        <div className="hidden min-[1150px]:flex items-center gap-4">
          <Link href="/contato">
            <GoldButton className="px-4 xl:px-8 py-4 text-[9px] xl:text-[10px] tracking-[0.2em] xl:tracking-[0.3em]">
              Fale conosco
            </GoldButton>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="min-[1150px]:hidden bg-white border-t border-slate-200 overflow-hidden"
          >
            <div className="px-6 py-10 flex flex-col gap-6">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xs font-semibold uppercase tracking-[0.22em] transition-colors",
                    pathname === link.href ? "text-primary" : "text-[#4D4D4D]"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/contato" onClick={() => setIsMobileMenuOpen(false)} className="pt-4">
                <GoldButton className="w-full py-5 text-[10px] tracking-[0.3em]">
                  Fale conosco
                </GoldButton>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
