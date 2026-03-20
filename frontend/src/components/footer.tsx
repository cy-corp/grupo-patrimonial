"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0e0e0e] w-full py-12 px-6 md:px-12 mt-auto border-t border-[#484848]/20 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
      <div className="flex flex-col items-center md:items-start gap-4">
        <div className="flex items-center gap-2">
          <img src="/patrimonial-logo-png.png" alt="Grupo Patrimonial" className="h-8 w-auto" />
          <span className="text-lg font-bold text-[#d9c58f] font-headline uppercase tracking-widest">Grupo Patrimonial</span>
        </div>
        <p className="font-body text-[#acabaa] text-[10px] md:text-xs text-center md:text-left">
          Excellence in Structural Permanence.
        </p>
      </div>

      <div className="flex flex-col items-center md:items-end gap-6">
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <Link 
            href="/politica-privacidade" 
            className="font-body tracking-[0.05em] text-[#acabaa] text-xs hover:text-[#d9c58f] transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          <Link 
            href="/termos-servico" 
            className="font-body tracking-[0.05em] text-[#acabaa] text-xs hover:text-[#d9c58f] transition-colors duration-200"
          >
            Terms of Service
          </Link>
          <Link 
            href="/investidores" 
            className="font-body tracking-[0.05em] text-[#acabaa] text-xs hover:text-[#d9c58f] transition-colors duration-200"
          >
            Investor Relations
          </Link>
        </div>
        <p className="font-body tracking-[0.05em] text-[#acabaa] text-[10px] md:text-xs">
          © {new Date().getFullYear()} Grupo Patrimonial. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
