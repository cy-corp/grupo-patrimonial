"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, ShieldCheck, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Quem Somos", href: "/quem-somos" },
  { name: "Engenharia", href: "/engenharia" },
  { name: "Incorporadora", href: "/incorporadora" },
  { name: "Construtora", href: "/construtora" },
  { name: "Imobiliária", href: "/imobiliaria" },
  { name: "Patrimonial", href: "/patrimonial" },
  { name: "Integração", href: "/integracao" },
  { name: "Investidores", href: "/investidores" },
];

const ctaLinks = [
  { name: "Orçamento", href: "/orcamento" },
  { name: "Contato", href: "/contato" },
];

export function Navbar() {
  const { setTheme, theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const allLinks = [...navLinks, ...ctaLinks];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <ShieldCheck className="h-7 w-7 text-primary" />
          <span className="font-heading text-lg font-bold tracking-tight uppercase">
            Grupo Patrimonial
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-primary/5",
                pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-foreground/70"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA + Theme */}
        <div className="hidden xl:flex items-center gap-3">
          {ctaLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-semibold border transition-colors",
                link.name === "Contato"
                  ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                  : "border-border hover:border-primary hover:text-primary"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="ml-1"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="xl:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t bg-background absolute w-full shadow-lg">
          <div className="container mx-auto px-4 py-4 grid grid-cols-2 gap-2">
            {allLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-primary/5",
                  pathname === link.href
                    ? "text-primary bg-primary/10 font-semibold"
                    : "text-foreground/80"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
