import Link from "next/link";
import { coverage, instagram } from "@/lib/content";
import { brand } from "@/lib/brand";

export const nav = [
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-brand/15 bg-[#F6F4EF]">
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
          <Link href="/#contato" className="bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-graphite">
            Solicitar orçamento
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-graphite text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-[1.4fr_1fr_1fr] sm:px-10 lg:px-16">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-i3geo-wordmark-negativo.svg" alt={brand.name} className="h-9 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">{brand.positioning}</p>
        </div>
        <ul className="space-y-3 text-sm">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-white/85 transition-colors hover:text-white">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/#contato" className="text-white/85 transition-colors hover:text-white">
              Contato
            </Link>
          </li>
        </ul>
        <div className="text-sm text-white/75">
          <p>
            Atendimento em {coverage.states.join(" e ")}, em um raio de até {coverage.radiusKm} km.
          </p>
          <a
            href={instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-white/85 underline underline-offset-4 transition-colors hover:text-white"
          >
            Instagram
          </a>
        </div>
      </div>
      <p className="border-t border-white/15 px-6 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {brand.name}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
