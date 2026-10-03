import { SiteFooter, SiteHeader } from "./site-chrome";

export type LegalSection = { title: string; paragraphs: string[]; items?: string[] };

// Página de texto legal: índice fixo à esquerda em telas largas, texto em coluna de leitura.
export function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[#F6F4EF]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
          <h1 className="text-balance text-4xl font-bold leading-[1.02] tracking-tight text-brand sm:text-6xl">{title}</h1>
          <p className="mt-4 text-sm font-semibold text-graphite/70">Última atualização: {updated}</p>
          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-graphite/85">{intro}</p>

          <div className="mt-16 grid gap-12 lg:grid-cols-12">
            <nav aria-label="Nesta página" className="hidden lg:col-span-4 lg:block">
              <ol className="sticky top-28 space-y-3 border-l-2 border-brand/15 pl-5 text-sm font-semibold text-brand">
                {sections.map((section, i) => (
                  <li key={section.title}>
                    <a href={`#secao-${i + 1}`} className="transition-colors hover:text-graphite">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="lg:col-span-8">
              {sections.map((section, i) => (
                <section key={section.title} id={`secao-${i + 1}`} className="scroll-mt-28 border-t border-brand/15 py-10 first:border-t-0 first:pt-0">
                  <h2 className="text-2xl font-bold tracking-tight text-graphite sm:text-3xl">{section.title}</h2>
                  <div className="mt-5 max-w-[65ch] space-y-4 leading-relaxed text-graphite/85">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.items && (
                      <ul className="list-disc space-y-2 pl-5 marker:text-orange">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
