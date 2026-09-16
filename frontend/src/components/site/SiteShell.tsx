"use client";

import Link from "next/link";
import { LayoutGroup } from "framer-motion";
import type { CompanyId } from "@/lib/companies";
import { siteConfigs } from "@grupo-patrimonial/site-config";
import { DcorpChromeProvider } from "./dcorp-chrome";
import { DcorpWhatsAppFab } from "./DcorpWhatsAppFab";
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
  const isDcorp = companyId === "dcorp";

  const tree = (
    <div className={isDcorp ? "min-h-dvh bg-white" : "min-h-dvh bg-[#F8F1E3]"}>
      <SiteHeader companyId={companyId} />

      <div className="min-h-dvh">{children}</div>

      <footer
        className={
          isDcorp
            ? "border-t border-[#D9D9D9] bg-[#1F1F1F] px-6 py-12"
            : "border-t border-graphite/10 bg-[#F3F0EA] px-6 py-12"
        }
      >
        <div
          className={
            isDcorp
              ? "container mx-auto flex flex-col gap-4 text-sm text-white/65 md:flex-row md:items-center md:justify-between"
              : "container mx-auto flex flex-col gap-4 text-sm text-graphite/65 md:flex-row md:items-center md:justify-between"
          }
        >
          <p>
            {config.name} · {config.role}
          </p>
          <p>Empresa integrante da Paiva &amp; Lopes Holding.</p>
          <Link
            href="/contato"
            className={
              isDcorp
                ? "font-semibold text-[#C9A96A] transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:text-white"
                : "font-semibold text-primary"
            }
          >
            Entrar em contato
          </Link>
        </div>
      </footer>

      {isDcorp ? <DcorpWhatsAppFab /> : null}
    </div>
  );

  if (!isDcorp) return tree;

  return (
    <DcorpChromeProvider>
      <LayoutGroup id="dcorp-chrome">{tree}</LayoutGroup>
    </DcorpChromeProvider>
  );
}
