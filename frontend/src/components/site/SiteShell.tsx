"use client";

import Link from "next/link";
import type { CompanyId } from "@/lib/companies";
import { siteConfigs } from "@grupo-patrimonial/site-config";
import { SiteHeader } from "./SiteHeader";

export function getSiteConfig(id: CompanyId) {
  return siteConfigs[id];
}

export function SiteShell({
  companyId,
  children,
}: {
  companyId: CompanyId;
  children: React.ReactNode;
}) {
  const config = siteConfigs[companyId];

  return (
    <div className="min-h-dvh bg-[#F8F1E3]">
      <SiteHeader companyId={companyId} />

      <div className="min-h-dvh">{children}</div>

      <footer className="border-t border-graphite/10 bg-[#F3F0EA] px-6 py-12">
        <div className="container mx-auto flex flex-col gap-4 text-sm text-graphite/65 md:flex-row md:items-center md:justify-between">
          <p>
            {config.name} · {config.role}
          </p>
          <p>Empresa integrante da Paiva &amp; Lopes Holding.</p>
          <Link href="/contato" className="font-semibold text-primary">
            Entrar em contato
          </Link>
        </div>
      </footer>
    </div>
  );
}
