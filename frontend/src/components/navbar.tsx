"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Quem Somos", href: "/quem-somos" },
  { name: "Engenharia", href: "/engenharia" },
  { name: "Incorporadora", href: "/incorporadora" },
  { name: "Construtora", href: "/construtora" },
  { name: "Imobiliária", href: "/imobiliaria" },
  { name: "Patrimonial", href: "/patrimonial" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-[100] w-full bg-background/80 backdrop-blur-md border-b border-primary/10">
      <div className="container mx-auto flex h-24 items-center justify-between px-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <img src="/patrimonial-logo-png.png" alt="Grupo Patrimonial" className="h-20 w-auto" />
          <img src="/patrimonial-text-png.png" alt="Patrimonial" className="h-18 w-auto -ml-5" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-primary relative group",
                pathname === link.href ? "text-primary" : "text-[#0F172A]/70"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full",
                pathname === link.href && "w-full"
              )} />
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/contato">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(201,161,74,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-3 rounded-none shadow-sm transition-all"
            >
              Fale com um especialista
            </motion.button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#0F172A]"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-background border-t border-primary/10 px-6 py-10 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold uppercase tracking-[0.2em] text-[#0F172A]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/contato" onClick={() => setIsMobileMenuOpen(false)}>
            <button className="w-full bg-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] py-4 rounded-none">
              Fale com um especialista
            </button>
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
