import Link from "next/link";
import type { CompanyId } from "@/lib/companies";
import { companies, formatCnpj } from "@/lib/companies";
import { siteConfigs } from "@grupo-patrimonial/site-config";
import { DcorpChromeProvider } from "./dcorp-chrome";
import { DcorpWhatsAppFab } from "./DcorpWhatsAppFab";
import { RendalFooterDiorama } from "./RendalFooterDiorama";
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
  const company = companies[companyId];
  const isDcorp = companyId === "dcorp";

  const tree = (
    <div className={isDcorp ? "min-h-svh bg-white" : "min-h-dvh bg-[#F8F1E3]"}>
      <SiteHeader companyId={companyId} />

      <div className={isDcorp ? "min-h-svh" : "min-h-dvh"}>{children}</div>

      <footer
        className={
          isDcorp
            ? "border-t border-[#D9D9D9] bg-[#1F1F1F] px-6 py-12"
            : "relative z-10 -mt-8 overflow-hidden rounded-t-[32px] bg-[#F8F1E3] pt-12 pb-[calc(var(--diorama-h)_-_2.5rem)] shadow-[0_-16px_40px_rgba(0,0,0,0.12)] [--diorama-h:clamp(13rem,34vw,36rem)] md:-mt-12 md:rounded-t-[56px] md:pt-16"
        }
      >
        <div
          className={
            isDcorp
              ? "container mx-auto flex flex-col gap-6 text-sm text-white/65 md:flex-row md:items-start md:justify-between"
              : "relative z-10 container mx-auto flex flex-col gap-4 px-6 text-sm text-graphite/65 md:flex-row md:items-center md:justify-between"
          }
        >
          <div className="space-y-1">
            <p className={isDcorp ? "font-medium text-white" : undefined}>
              {config.name} · {config.role}
            </p>
            <p>Empresa integrante da Paiva &amp; Lopes Holding.</p>
            {isDcorp ? (
              <p className="pt-1 font-sans text-xs text-white/45">
                CNPJ {formatCnpj(company.cnpj)}
              </p>
            ) : null}
          </div>

          {isDcorp ? (
            <div className="space-y-1.5 font-sans text-sm">
              <a
                href={company.phoneHref}
                className="block text-white/75 transition-colors hover:text-[#C9A96A]"
              >
                {company.phone}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="block text-white/75 transition-colors hover:text-[#C9A96A]"
              >
                {company.email}
              </a>
              <Link
                href="/politica-de-privacidade"
                className="block text-white/75 transition-colors hover:text-[#C9A96A]"
              >
                Política de Privacidade
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
              <Link
                href="/politica-de-privacidade"
                className="text-graphite/65 transition-colors hover:text-graphite"
              >
                Política de Privacidade
              </Link>
              <Link
                href={company.contactHref}
                className="font-semibold text-primary"
              >
                Entrar em contato
              </Link>
            </div>
          )}

          {isDcorp ? (
            <Link
              href={company.contactHref}
              className="font-semibold text-[#C9A96A] transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:text-white"
            >
              Entrar em contato
            </Link>
          ) : null}
        </div>

        {isDcorp ? null : (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[var(--diorama-h)]">
            <RendalFooterDiorama />
          </div>
        )}
      </footer>

      {isDcorp ? <DcorpWhatsAppFab /> : null}
    </div>
  );

  if (!isDcorp) return tree;

  return <DcorpChromeProvider>{tree}</DcorpChromeProvider>;
}
