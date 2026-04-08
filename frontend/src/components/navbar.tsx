"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { GoldButton } from "./ui/gold-button";

const unidades = [
  { name: "Engenharia", href: "/engenharia" },
  { name: "Incorporadora", href: "/incorporadora" },
  { name: "Construtora", href: "/construtora" },
  { name: "Imobiliária", href: "/imobiliaria" },
  { name: "Patrimonial", href: "/patrimonial" },
];

const mainLinks = [
  { name: "Home", href: "/" },
  { name: "Quem Somos", href: "/quem-somos" },
  { name: "Processos", href: "/processos" },
  { name: "Integração", href: "/integracao" },
  { name: "Investidores", href: "/investidores" },
  { name: "Contato", href: "/contato" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isUnidadesOpen, setIsUnidadesOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-[100] w-full bg-white">
      <div className="container mx-auto flex h-24 items-center justify-between px-6">

        {/* Mobile: hambúrguer à esquerda | Desktop: logo à esquerda */}
        {/* Mobile menu button — visível até 1150px */}
        <div className="min-[1150px]:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center gap-2 text-[#0F172A] p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Abrir menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#0F172A]/60 select-none">
              {isMobileMenuOpen ? "Fechar" : "Menu"}
            </span>
          </button>
        </div>

        {/* Logo — no mobile fica à direita, no desktop à esquerda */}
        <Link href="/" className="flex items-center group min-[1150px]:order-none order-last">
          <img src="/patrimonial-logo-png.png" alt="Grupo Patrimonial" className="h-14 min-[1150px]:h-16 xl:h-20 w-auto transition-all" />
          <img src="/patrimonial-text-png.png" alt="Patrimonial" className="h-12 min-[1150px]:h-14 xl:h-18 w-auto -ml-3 md:-ml-5 transition-all" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden min-[1150px]:flex items-center gap-4 xl:gap-8">
          <Link
            href="/"
            className={cn(
              "text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.1em] xl:tracking-[0.2em] transition-all hover:text-primary relative group",
              pathname === "/" ? "text-primary" : "text-[#0F172A]/70"
            )}
          >
            Home
            <span className={cn(
              "absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full",
              pathname === "/" && "w-full"
            )} />
          </Link>

          {/* Quem Somos */}
          <Link
            href="/quem-somos"
            className={cn(
              "text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.1em] xl:tracking-[0.2em] transition-all hover:text-primary relative group",
              pathname === "/quem-somos" ? "text-primary" : "text-[#0F172A]/70"
            )}
          >
            Quem Somos
            <span className={cn(
              "absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full",
              pathname === "/quem-somos" && "w-full"
            )} />
          </Link>

          {/* Processos */}
          <Link
            href="/processos"
            className={cn(
              "text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.1em] xl:tracking-[0.2em] transition-all hover:text-primary relative group",
              pathname === "/processos" ? "text-primary" : "text-[#0F172A]/70"
            )}
          >
            Processos
            <span className={cn(
              "absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full",
              pathname === "/processos" && "w-full"
            )} />
          </Link>

          {/* Unidades Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsUnidadesOpen(true)}
            onMouseLeave={() => setIsUnidadesOpen(false)}
          >
            <button
              className={cn(
                "flex items-center gap-1 text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.1em] xl:tracking-[0.2em] transition-all hover:text-primary cursor-pointer",
                unidades.some(u => pathname === u.href) ? "text-primary" : "text-[#0F172A]/70"
              )}
            >
              Unidades
              <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isUnidadesOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isUnidadesOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="w-64 bg-white border border-slate-200 shadow-2xl rounded-xl overflow-hidden py-4"
                  >
                    <div className="px-6 py-2 border-b border-slate-100 mb-2">
                      <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Nossa Expertise</span>
                    </div>
                    {unidades.map((unidade) => (
                      <Link
                        key={unidade.href}
                        href={unidade.href}
                        className={cn(
                          "block px-6 py-3 text-[10px] font-bold uppercase tracking-wider transition-all hover:bg-slate-50 hover:text-primary",
                          pathname === unidade.href ? "text-primary bg-primary/5" : "text-[#0F172A]/70"
                        )}
                      >
                        {unidade.name}
                      </Link>
                    ))}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Integração */}
          <Link
            href="/integracao"
            className={cn(
              "text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.1em] xl:tracking-[0.2em] transition-all hover:text-primary relative group",
              pathname === "/integracao" ? "text-primary" : "text-[#0F172A]/70"
            )}
          >
            Integração
            <span className={cn(
              "absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full",
              pathname === "/integracao" && "w-full"
            )} />
          </Link>

          {/* Investidores */}
          <Link
            href="/investidores"
            className={cn(
              "text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.1em] xl:tracking-[0.2em] transition-all hover:text-primary relative group",
              pathname === "/investidores" ? "text-primary" : "text-[#0F172A]/70"
            )}
          >
            Investidores
            <span className={cn(
              "absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full",
              pathname === "/investidores" && "w-full"
            )} />
          </Link>

          <Link
            href="/contato"
            className={cn(
              "text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.1em] xl:tracking-[0.2em] transition-all hover:text-primary relative group",
              pathname === "/contato" ? "text-primary" : "text-[#0F172A]/70"
            )}
          >
            Contato
            <span className={cn(
              "absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full",
              pathname === "/contato" && "w-full"
            )} />
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden min-[1150px]:flex items-center gap-4">
          <Link href="/contato#form-contato">
            <GoldButton className="px-4 xl:px-8 py-4 text-[9px] xl:text-[10px] tracking-[0.2em] xl:tracking-[0.3em]">
              Solicite uma Análise
            </GoldButton>
          </Link>
        </div>

        {/* Mobile menu button placeholder */}
        <div className="hidden min-[1150px]:flex items-center" />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="min-[1150px]:hidden bg-white border-t border-slate-200 overflow-hidden"
          >
            <div className="px-6 py-10 flex flex-col gap-6">
              {[...mainLinks].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xs font-bold uppercase tracking-[0.2em] transition-colors",
                    pathname === link.href ? "text-primary" : "text-[#0F172A]/70"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Nossas Unidades</span>
                {unidades.map((unidade) => (
                  <Link
                    key={unidade.href}
                    href={unidade.href}
                    className={cn(
                      "text-xs font-bold uppercase tracking-[0.2em] transition-colors",
                      pathname === unidade.href ? "text-primary" : "text-[#0F172A]/50"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {unidade.name}
                  </Link>
                ))}
              </div>

              <Link href="/contato#form-contato" onClick={() => setIsMobileMenuOpen(false)} className="pt-4">
                <GoldButton className="w-full py-5 text-[10px] tracking-[0.3em]">
                  Fale com um especialista
                </GoldButton>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
