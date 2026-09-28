import Link from "next/link";
import type { CompanyId } from "@/lib/companies";
import { companies, formatCnpj } from "@/lib/companies";
import { siteConfigs } from "@grupo-patrimonial/site-config";
import { DcorpChromeProvider } from "./dcorp-chrome";
import { DcorpWhatsAppFab } from "./DcorpWhatsAppFab";
import { RendalFooterDiorama } from "./RendalFooterDiorama";
import { RendalIslandNav } from "@/app/(landing-page)/incorporadora/RendalIslandNav";
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
      {isDcorp ? null : <RendalIslandNav />}
      <SiteHeader companyId={companyId} />

      <div className={isDcorp ? "min-h-svh" : "min-h-dvh"}>{children}</div>

      <footer
        className={
          isDcorp
            ? "border-t border-[#D9D9D9] bg-[#1F1F1F] px-6 py-12"
            : "relative z-10 -mt-8 overflow-hidden rounded-t-[32px] bg-[#F8F1E3] pt-12 pb-[calc(var(--diorama-h)_-_2.5rem)] shadow-[0_-16px_40px_rgba(0,0,0,0.12)] [--diorama-h:clamp(13rem,34vw,36rem)] md:-mt-12 md:rounded-t-[56px] md:pt-16"
        }
      >
        {isDcorp ? (
          <div className="container mx-auto flex flex-col gap-6 text-sm text-white/65 md:flex-row md:items-start md:justify-between">
            <div className="space-y-1">
              <p className="font-medium text-white">
                {config.name} · {config.role}
              </p>
              <p>Empresa integrante da Paiva &amp; Lopes Holding.</p>
              <p className="pt-1 font-sans text-xs text-white/45">
                CNPJ {formatCnpj(company.cnpj)}
              </p>
            </div>
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
            <Link
              href={company.contactHref}
              className="font-semibold text-[#C9A96A] transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:text-white"
            >
              Entrar em contato
            </Link>
          </div>
        ) : (
          <div className="relative z-10 container mx-auto px-6">
            <div className="flex flex-col gap-8 text-sm text-graphite/65 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <p>
                  {config.name} · {config.role}
                </p>
                <p className="whitespace-nowrap">
                  Empresa integrante da Paiva &amp; Lopes Holding.
                </p>
              </div>
              <div className="flex flex-col gap-8 sm:flex-row sm:gap-x-12">
                <nav aria-label="Rodapé" className="flex flex-col sm:items-end sm:text-right">
                  {config.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex min-h-11 items-center text-graphite/75 hover:text-graphite sm:w-full sm:justify-end"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col sm:items-end sm:text-right">
                  <a href={`mailto:${company.email}`} className="inline-flex min-h-11 items-center text-graphite/75 sm:w-full sm:justify-end">
                    {company.email}
                  </a>
                  <a href={company.phoneHref} className="inline-flex min-h-11 items-center text-graphite/75 sm:w-full sm:justify-end">
                    {company.phone}
                  </a>
                  <Link href="/politica-de-privacidade" className="inline-flex min-h-11 items-center text-graphite/75 sm:w-full sm:justify-end">
                    Política de Privacidade
                  </Link>
                  <Link href="/contato" className="inline-flex min-h-11 items-center font-semibold text-primary sm:w-full sm:justify-end">
                    Fale com a Rendal
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {isDcorp ? null : (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[var(--diorama-h)]">
            <RendalFooterDiorama />
          </div>
        )}
      </footer>

      <DcorpWhatsAppFab companyId={companyId} />
    </div>
  );

  if (!isDcorp) return tree;

  return <DcorpChromeProvider>{tree}</DcorpChromeProvider>;
}
