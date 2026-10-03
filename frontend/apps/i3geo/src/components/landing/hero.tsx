import { brand } from "@/lib/brand";

export function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-20 sm:py-28">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
          {brand.fullName}
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {brand.positioning}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          {brand.tagline} Atuamos em topografia, georreferenciamento e meio
          ambiente com informação precisa para decisões melhores.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="#contato"
            className="bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-petroleum"
          >
            Solicitar orçamento
          </a>
          <a
            href="#areas"
            className="border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
          >
            Conhecer áreas
          </a>
        </div>
      </div>
    </section>
  );
}
