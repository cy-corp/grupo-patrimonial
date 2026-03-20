"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { GoldButton } from "@/components/ui/gold-button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import { ThemeToggle } from "@/components/theme-toggle";

const businessUnits = [
  { id: "01", name: "Engenharia", href: "/engenharia" },
  { id: "02", name: "Incorporadora", href: "/incorporadora" },
  { id: "03", name: "Construtora", href: "/construtora" },
  { id: "04", name: "Imobiliária", href: "/imobiliaria" },
  { id: "05", name: "Patrimonial", href: "/patrimonial" },
  { id: "06", name: "Integração", href: "/integracao" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-outline-variant/10 shadow-[0_24px_24px_0_rgba(0,0,0,0.04)] flex justify-between items-center px-4 md:px-12 py-2 max-w-none">
      {/* Logo */}
      <Link href="/" className="flex items-center group">
        <div className="flex items-center">
          <img src="/patrimonial-logo-png.png" alt="Grupo Patrimonial" className="h-16 md:h-24 w-auto transition-transform group-hover:scale-105" />
          <img src="/patrimonial-text-png.png" alt="Patrimonial" className="h-14 md:h-20 w-auto -ml-1 md:-ml-2 transition-transform group-hover:scale-105 dark:invert dark:brightness-200 dark:contrast-75" />
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-10">
        <Link 
          href="/" 
          className={cn(
            "font-headline font-light tracking-[0.1em] uppercase text-xs transition-colors duration-300 cursor-pointer",
            pathname === "/" ? "text-primary border-b border-primary pb-1" : "text-on-surface-variant hover:text-on-surface"
          )}
        >
          Home
        </Link>
        <Link 
          href="/quem-somos" 
          className={cn(
            "font-headline font-light tracking-[0.1em] uppercase text-xs transition-colors duration-300 cursor-pointer",
            pathname === "/quem-somos" ? "text-primary border-b border-primary pb-1" : "text-on-surface-variant hover:text-on-surface"
          )}
        >
          Quem Somos
        </Link>

        {/* Unidades de Negócio Dropdown */}
        <div className="relative group nav-dropdown">
          <button className="flex items-center gap-1 font-headline font-light tracking-[0.1em] uppercase text-xs text-on-surface-variant group-hover:text-on-surface transition-colors duration-300 cursor-pointer h-full py-4">
            Unidades de Negócio
            <span className="material-symbols-outlined text-[14px]">expand_more</span>
          </button>
          <div className="dropdown-content hidden absolute top-full left-1/2 -translate-x-1/2 w-[480px] pt-4 opacity-0 transform -translate-y-2 transition-all duration-300">
            <div className="bg-surface/95 backdrop-blur-2xl border border-outline-variant/30 shadow-2xl p-6 grid grid-cols-2 gap-4">
              {businessUnits.map((unit) => (
                <Link 
                  key={unit.id}
                  href={unit.href} 
                  className="flex flex-col p-3 hover:bg-surface-container-high/50 transition-colors group/item cursor-pointer"
                >
                  <span className="text-primary text-[10px] tracking-[0.2em] font-bold uppercase mb-1">{unit.id}</span>
                  <span className="font-headline text-sm text-on-surface group-hover/item:text-primary">{unit.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Link 
          href="/investidores" 
          className={cn(
            "font-headline font-light tracking-[0.1em] uppercase text-xs transition-colors duration-300 cursor-pointer",
            pathname === "/investidores" ? "text-primary border-b border-primary pb-1" : "text-on-surface-variant hover:text-on-surface"
          )}
        >
          Investidores
        </Link>
        <Link 
          href="/contato" 
          className={cn(
            "font-headline font-light tracking-[0.1em] uppercase text-xs transition-colors duration-300 cursor-pointer",
            pathname === "/contato" ? "text-primary border-b border-primary pb-1" : "text-on-surface-variant hover:text-on-surface"
          )}
        >
          Contato
        </Link>
      </div>

      {/* Desktop CTA, Theme Toggle & Mobile Menu Button */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        <Link href="/orcamento" className="hidden md:block">
          <GoldButton>
            Orçamento
          </GoldButton>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-on-surface cursor-pointer"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-surface border-b border-outline-variant/30 overflow-hidden flex flex-col p-6 gap-4"
          >
            <Link href="/" className="font-headline uppercase text-sm text-foreground" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="/quem-somos" className="font-headline uppercase text-sm text-foreground" onClick={() => setIsMobileMenuOpen(false)}>Quem Somos</Link>
            
            <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/20">
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">Unidades de Negócio</span>
              {businessUnits.map((unit) => (
                <Link key={unit.id} href={unit.href} className="font-headline text-sm text-on-surface-variant pl-4" onClick={() => setIsMobileMenuOpen(false)}>
                  {unit.name}
                </Link>
              ))}
            </div>

            <Link href="/investidores" className="font-headline uppercase text-sm text-foreground" onClick={() => setIsMobileMenuOpen(false)}>Investidores</Link>
            <Link href="/contato" className="font-headline uppercase text-sm text-foreground" onClick={() => setIsMobileMenuOpen(false)}>Contato</Link>
            
            <Link href="/orcamento" onClick={() => setIsMobileMenuOpen(false)} className="mt-4">
              <GoldButton className="w-full">
                Orçamento
              </GoldButton>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
