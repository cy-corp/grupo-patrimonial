import Link from "next/link";
import { addressLine, contact, coverage, instagram, whatsappLink } from "@/lib/content";
import { brand } from "@/lib/brand";
import { FooterNascente } from "./footer-nascente";
import { MobileMenu } from "./mobile-menu";

export const nav = [
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 bg-[#F6F4EF] text-brand">
      <span className="header-ruler pointer-events-none absolute inset-x-0 bottom-0 block h-2 opacity-45" aria-hidden="true" />
      <div className="flex h-16 items-center justify-between px-6 sm:h-20 sm:px-10 lg:px-16">
        <Link href="/" aria-label={brand.name} className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-i3geo-wordmark.svg" alt={brand.name} className="h-8 w-auto sm:h-9" />
        </Link>
        <nav aria-label="Principal" className="flex items-center gap-3 sm:gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden text-sm font-medium text-graphite/80 transition-colors hover:text-brand sm:inline"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/orcamento" className="bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-graphite">
            <span className="sm:hidden">Orçamento</span>
            <span className="hidden sm:inline">Solicitar orçamento</span>
          </Link>
          <MobileMenu />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    // O rodapé nunca passa da altura da tela: o relevo encolhe para tudo caber abaixo do cabeçalho.
    <footer className="relative flex max-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-[#F6F4EF] text-graphite sm:max-h-[calc(100svh-5rem)]">
      <div className="mx-auto grid w-full max-w-7xl shrink-0 gap-6 px-6 pt-10 sm:grid-cols-[1.5fr_1fr_1fr] sm:gap-10 sm:px-10 sm:pt-16 lg:px-16">
        <p className="max-w-md text-balance text-3xl font-bold leading-[1.02] tracking-tight text-brand sm:text-5xl">
          Na dúvida, comece pelo levantamento.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-lg font-semibold text-brand sm:block sm:space-y-3">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="transition-colors hover:text-graphite">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/orcamento" className="transition-colors hover:text-graphite">
              Orçamento
            </Link>
          </li>
          <li>
            <a href={instagram} target="_blank" rel="noreferrer" className="transition-colors hover:text-graphite">
              Instagram
            </a>
          </li>
        </ul>
        <div>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="block text-2xl font-bold tracking-tight text-brand tabular-nums transition-colors hover:text-graphite"
          >
            {contact.phone}
          </a>
          <p className="mt-1 text-sm font-semibold text-graphite/70">WhatsApp</p>
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="mt-3 block text-sm font-semibold text-brand transition-colors hover:text-graphite">
              {contact.email}
            </a>
          )}
          <p className="mt-4 text-sm leading-relaxed text-graphite/80">
            {addressLine}. Atendimento em {coverage.states.join(" e ")}, em um raio de até {coverage.radiusKm} km.
          </p>
          <Link
            href="/orcamento"
            className="mt-6 inline-block bg-orange px-6 py-3.5 text-sm font-bold text-graphite transition-colors hover:bg-brand hover:text-white"
          >
            Solicitar orçamento
          </Link>
        </div>
      </div>
      <FooterNascente />
      <div className="relative flex shrink-0 flex-wrap items-center justify-center gap-x-6 gap-y-1 border-t border-brand/15 px-6 py-4 text-xs text-graphite/70">
        <p>
          © {new Date().getFullYear()} {brand.name}. Todos os direitos reservados.
        </p>
        <Link href="/politica-de-privacidade" className="underline underline-offset-4 transition-colors hover:text-brand">
          Política de privacidade
        </Link>
        <Link href="/termos-de-uso" className="underline underline-offset-4 transition-colors hover:text-brand">
          Termos de uso
        </Link>
      </div>
    </footer>
  );
}
