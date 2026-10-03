import Link from "next/link";
import { coverage, instagram } from "@/lib/content";
import { brand } from "@/lib/brand";
import { FooterNascente } from "./footer-nascente";

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
        <nav aria-label="Principal" className="flex items-center gap-6">
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
            Solicitar orçamento
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#F6F4EF] text-graphite">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 pt-20 sm:grid-cols-[1.5fr_1fr_1fr] sm:px-10 lg:px-16">
        <p className="max-w-md text-balance text-4xl font-bold leading-[1.02] tracking-tight text-brand sm:text-5xl">
          Na dúvida, comece pelo levantamento.
        </p>
        <ul className="space-y-3 text-lg font-semibold text-brand">
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
          <p className="text-sm leading-relaxed text-graphite/80">
            Atendimento em {coverage.states.join(" e ")}, em um raio de até {coverage.radiusKm} km.
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
      <p className="relative border-t border-brand/15 px-6 py-5 text-center text-xs text-graphite/70">
        © {new Date().getFullYear()} {brand.name}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
