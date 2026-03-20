"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { GoldButton } from "@/components/ui/gold-button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import { ThemeToggle } from "@/components/theme-toggle";

const businessUnits = [
  { id: "01", name: "Engenharia", href: "/engenharia", description: "Inovação e precisão técnica em cada detalhe." },
  { id: "02", name: "Incorporadora", href: "/incorporadora", description: "Criação de projetos imobiliários de alto padrão." },
  { id: "03", name: "Construtora", href: "/construtora", description: "Excelência em execução e entrega rigorosa." },
  { id: "04", name: "Imobiliária", href: "/imobiliaria", description: "Consultoria especializada em ativos de luxo." },
  { id: "05", name: "Patrimonial", href: "/patrimonial", description: "Gestão estratégica e segura do seu legado." },
  { id: "06", name: "Integração", href: "/integracao", description: "Soluções completas e sinergia entre negócios." },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-2xl border-b border-outline-variant/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex justify-between items-center px-4 md:px-12 py-3 max-w-none">
      {/* Logo */}
      <Link href="/" className="flex items-center group">
        <div className="flex items-center">
          <img src="/patrimonial-logo-png.png" alt="Grupo Patrimonial" className="h-12 md:h-16 w-auto transition-transform group-hover:scale-105" />
          <img src="/patrimonial-text-png.png" alt="Patrimonial" className="h-10 md:h-14 w-auto -ml-1 md:-ml-2 transition-transform group-hover:scale-105 dark:invert dark:brightness-200 dark:contrast-75" />
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-10">
        <Link
          href="/"
          className={cn(
            "font-headline font-light tracking-[0.15em] uppercase text-[10px] transition-all duration-500 cursor-pointer relative group/link",
            pathname === "/" ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
          )}
        >
          Home
          <span className={cn(
            "absolute -bottom-1 left-0 h-[1px] bg-primary transition-all duration-500",
            pathname === "/" ? "w-full" : "w-0 group-hover/link:w-full"
          )} />
        </Link>
        <Link
          href="/quem-somos"
          className={cn(
            "font-headline font-light tracking-[0.15em] uppercase text-[10px] transition-all duration-500 cursor-pointer relative group/link",
            pathname === "/quem-somos" ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
          )}
        >
          Quem Somos
          <span className={cn(
            "absolute -bottom-1 left-0 h-[1px] bg-primary transition-all duration-500",
            pathname === "/quem-somos" ? "w-full" : "w-0 group-hover/link:w-full"
          )} />
        </Link>

        {/* Unidades de Negócio Dropdown */}
        <div
          className="relative group h-full py-4"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button className="flex items-center gap-1.5 font-headline font-light tracking-[0.15em] uppercase text-[10px] text-on-surface-variant group-hover:text-on-surface transition-all duration-500 cursor-pointer">
            Unidades de Negócio
            <ChevronDown className={cn("w-3 h-3 transition-transform duration-500", isDropdownOpen && "rotate-180")} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="absolute top-full left-1/2 -translate-x-1/2 w-[560px] pt-4 pointer-events-auto"
              >
                <div className="bg-surface/95 dark:bg-[#0e0e0e]/95 backdrop-blur-3xl border border-outline-variant/20 shadow-[0_40px_80px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden rounded-xl">
                  <div className="p-8 grid grid-cols-2 gap-x-8 gap-y-6">
                    {businessUnits.map((unit) => (
                      <Link
                        key={unit.id}
                        href={unit.href}
                        className="group/item flex flex-col gap-1 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-primary/50 group-hover/item:text-primary text-[10px] font-bold tracking-widest">{unit.id}</span>
                          <span className="font-headline text-xs font-semibold tracking-wider text-on-surface group-hover/item:text-primary transition-colors">
                            {unit.name}
                          </span>
                        </div>
                        <p className="text-[10px] text-on-surface-variant font-light leading-relaxed pl-7 transition-colors group-hover/item:text-on-surface/70">
                          {unit.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link
          href="/investidores"
          className={cn(
            "font-headline font-light tracking-[0.15em] uppercase text-[10px] transition-all duration-500 cursor-pointer relative group/link",
            pathname === "/investidores" ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
          )}
        >
          Investidores
          <span className={cn(
            "absolute -bottom-1 left-0 h-[1px] bg-primary transition-all duration-500",
            pathname === "/investidores" ? "w-full" : "w-0 group-hover/link:w-full"
          )} />
        </Link>
        <Link
          href="/contato"
          className={cn(
            "font-headline font-light tracking-[0.15em] uppercase text-[10px] transition-all duration-500 cursor-pointer relative group/link",
            pathname === "/contato" ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
          )}
        >
          Contato
          <span className={cn(
            "absolute -bottom-1 left-0 h-[1px] bg-primary transition-all duration-500",
            pathname === "/contato" ? "w-full" : "w-0 group-hover/link:w-full"
          )} />
        </Link>
      </div>

      {/* Desktop CTA, Theme Toggle & Mobile Menu Button */}
      <div className="flex items-center gap-4">
        <ThemeToggle />

        <Link href="/orcamento" className="hidden md:block">
          <GoldButton className="rounded-full px-8 opacity-90 hover:opacity-100">
            Orçamento
          </GoldButton>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-on-surface cursor-pointer p-2 rounded-lg hover:bg-surface-container transition-colors"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-surface/98 dark:bg-[#0e0e0e]/98 backdrop-blur-3xl border-b border-outline-variant/30 overflow-hidden flex flex-col p-8 gap-6 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              <Link href="/" className="font-headline uppercase text-xs tracking-widest text-on-surface" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/quem-somos" className="font-headline uppercase text-xs tracking-widest text-on-surface" onClick={() => setIsMobileMenuOpen(false)}>Quem Somos</Link>

              <div className="flex flex-col gap-4 pt-6 border-t border-outline-variant/10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Unidades de Negócio</span>
                <div className="grid grid-cols-1 gap-4 pl-2">
                  {businessUnits.map((unit) => (
                    <Link key={unit.id} href={unit.href} className="flex flex-col gap-1" onClick={() => setIsMobileMenuOpen(false)}>
                      <span className="font-headline text-sm text-on-surface-variant">{unit.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/investidores" className="font-headline uppercase text-xs tracking-widest text-on-surface pt-6 border-t border-outline-variant/10" onClick={() => setIsMobileMenuOpen(false)}>Investidores</Link>
              <Link href="/contato" className="font-headline uppercase text-xs tracking-widest text-on-surface" onClick={() => setIsMobileMenuOpen(false)}>Contato</Link>
            </div>

            <Link href="/orcamento" onClick={() => setIsMobileMenuOpen(false)} className="mt-4">
              <GoldButton className="w-full rounded-full py-4">
                Orçamento
              </GoldButton>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
