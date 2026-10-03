import Image from "next/image";
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
      <div className="flex h-16 items-center justify-between px-6 lg:px-12 xl:px-20">
        <Link href="/" aria-label={brand.fullName} className="block">
          <Image
            src="/brand/logo-i3geo-wordmark.svg"
            alt={brand.name}
            width={116}
            height={36}
            priority
            unoptimized
            className="h-9 w-auto"
          />
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
