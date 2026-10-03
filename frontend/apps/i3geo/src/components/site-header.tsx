import Link from "next/link";
import { brand } from "@/lib/brand";

const nav = [
  { href: "#areas", label: "Áreas" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-brand">
          {brand.name}
        </Link>
        <nav aria-label="Principal" className="flex items-center gap-4 sm:gap-6">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden text-sm font-medium text-muted transition-colors hover:text-foreground sm:inline"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contato"
            className="bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-petroleum"
          >
            Fale conosco
          </a>
        </nav>
      </div>
    </header>
  );
}
