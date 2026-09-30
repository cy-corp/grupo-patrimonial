import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectHero } from "@/components/rendal/empreendimentos/ProjectHero";
import { DayInHouse } from "@/components/rendal/empreendimentos/DayInHouse";
import { Plants } from "@/components/rendal/empreendimentos/Plants";
import { Gallery } from "@/components/rendal/empreendimentos/Gallery";
import { FaqList } from "@/components/rendal/FaqList";
import { SectionHeader } from "@/components/rendal/SectionHeader";
import { StickyActionBar } from "@/components/rendal/StickyActionBar";
import { FinalCta } from "@/components/rendal/FinalCta";
import { LeadForm } from "@/components/rendal/contato/LeadForm";
import { faqCapetinga, faqPassos } from "@/lib/rendal/content/faq";
import {
  empreendimentos,
  getEmpreendimento,
  midiasDoEmpreendimento,
  type Empreendimento,
} from "@/lib/rendal/content/empreendimentos";
import { RendalReveal } from "@/components/rendal/RendalReveal";
import { getRendalSiteUrl, rendalWhatsapp } from "@/lib/rendal/site";

type Params = { slug: string };

export function generateStaticParams() {
  return empreendimentos.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getEmpreendimento(slug);
  if (!item) return { title: "Empreendimento" };
  const lote = !item.plantas.length;
  return {
    title: item.nome,
    description: lote
      ? `${item.nome} em ${item.cidade}. Veja o local e agende visita sem compromisso.`
      : `${item.nome} em ${item.cidade}. Veja plantas e condições antes de visitar.`,
    alternates: { canonical: `/empreendimentos/${item.slug}` },
    openGraph: {
      title: item.nome,
      description: lote
        ? `${item.bairro ?? item.cidade}. Local e andamento da implantação.`
        : `${item.bairro ?? item.cidade}. Plantas e condições abertas antes da visita.`,
    },
  };
}

export default async function EmpreendimentoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const item = getEmpreendimento(slug);
  if (!item) notFound();

  const lote = !item.plantas.length;
  const faq = slug === "passos" ? faqPassos : faqCapetinga;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": lote ? "Place" : "Residence",
    name: item.nome,
    address: {
      "@type": "PostalAddress",
      addressLocality: item.cidade,
      addressRegion: "MG",
      addressCountry: "BR",
    },
    url: `${getRendalSiteUrl()}/empreendimentos/${item.slug}`,
    image: `${getRendalSiteUrl()}${item.heroDia.src}`,
  };

  return (
    <main id="conteudo" className="bg-[#F8F1E3] pb-28 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProjectHero item={item} />

      {lote && item.racional.length ? (
        <RendalReveal>
        <section className="bg-white px-6 py-24" aria-labelledby="fatos-titulo">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              id="fatos-titulo"
              eyebrow="No terreno"
              title="O que já está no lugar"
              align="start"
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {item.racional.map((fact, index) => (
                <article key={fact.titulo} className="rounded-3xl bg-[#F8F1E3] p-8">
                  <p className="text-xs font-semibold tabular-nums tracking-widest text-[#C9A96A]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#1F1F1F]">{fact.titulo}</h3>
                  <p className="mt-3 text-base leading-7 text-pretty text-[#1F1F1F]/70">{fact.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        </RendalReveal>
      ) : null}

      {item.diaNaCasa.length ? (
        <RendalReveal>
          <section id="um-dia" className="px-6 py-12 sm:py-20 md:py-24" aria-labelledby="dia-titulo">
            <div className="mx-auto max-w-6xl">
              <SectionHeader id="dia-titulo" eyebrow="Uso" title="Um dia na casa" align="start" />
              <div className="mt-10">
                <DayInHouse item={item} />
              </div>
            </div>
          </section>
        </RendalReveal>
      ) : null}

      {item.plantas.length ? (
        <RendalReveal>
          <section className="bg-white px-6 py-12 sm:py-20 md:py-24" aria-labelledby="plantas-titulo">
            <div className="mx-auto max-w-5xl">
              <SectionHeader id="plantas-titulo" title="Plantas" align="start" />
              <div className="mt-8">
                <Plants item={item} />
              </div>
            </div>
          </section>
        </RendalReveal>
      ) : null}

      <RendalReveal>
        <section className="px-6 py-12 sm:py-20 md:py-24" aria-labelledby="galeria-titulo">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              id="galeria-titulo"
              title="Galeria"
              subtitle={lote ? "Explore o terreno." : undefined}
              align="start"
            />
            <div className="mt-8">
              <Gallery images={midiasDoEmpreendimento(item)} featuredFirst={lote} />
            </div>
          </div>
        </section>
      </RendalReveal>

      {lote ? (
        <FinalCta
          id="banco-titulo"
          title="Quer conhecer o lote?"
          subtitle="Agende uma visita e veja o terreno, as vias e o entorno. Sem compromisso de compra."
          href="#visita"
          cta="Agendar visita"
        />
      ) : (
        <FinalCta
          id="banco-titulo"
          title="Financiamento e avaliação"
          subtitle="Oriente o crédito antes de escolher a unidade. A equipe analisa seu perfil com a Caixa e outros bancos e retorna uma orientação no seu nome."
          href={`/contato?perfil=financiar&empreendimento=${item.slug}#perfil`}
          cta="Faça seu financiamento aqui"
        />
      )}

      <FaqList items={faq} />

      <VisitBlock item={item} />

      <StickyActionBar
        primaryHref="#visita"
        primaryLabel="Agendar visita"
        whatsappHref={rendalWhatsapp(`Olá, quero saber do ${item.nome}.`)}
        hideWhen={item.diaNaCasa.length ? "um-dia" : undefined}
      />
    </main>
  );
}

function VisitBlock({ item }: { item: Empreendimento }) {
  return (
    <RendalReveal>
      <section id="visita" className="scroll-mt-28 px-6 py-12 sm:py-20" aria-labelledby="visita-titulo">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-6 ring-1 ring-[#1F1F1F]/10">
          <h2 id="visita-titulo" className="text-3xl font-semibold tracking-tight text-[#1F1F1F]">
            Agendar visita
          </h2>
          <div className="mt-6">
            <LeadForm
              subject="Produto imobiliário"
              perfil="comprar"
              emailOptional
              submitLabel="Agendar visita"
              eventName="cta_visita_click"
              hidden={{ empreendimento: item.nome }}
              extra={
                <>
                  <fieldset>
                    <legend className="text-sm font-semibold text-[#1F1F1F]">Dia</legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["Dia útil", "Sábado"].map((label) => (
                        <label key={label} className="min-h-11 cursor-pointer rounded-full bg-[#EDE6DA] px-4 text-sm font-semibold has-[:checked]:bg-[#1F1F1F] has-[:checked]:text-white">
                          <input className="sr-only" type="radio" name="dia" value={label} />
                          <span className="inline-flex min-h-11 items-center">{label}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="text-sm font-semibold text-[#1F1F1F]">Período</legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["Manhã", "Tarde"].map((label) => (
                        <label key={label} className="min-h-11 cursor-pointer rounded-full bg-[#EDE6DA] px-4 text-sm font-semibold has-[:checked]:bg-[#1F1F1F] has-[:checked]:text-white">
                          <input className="sr-only" type="radio" name="periodo" value={label} />
                          <span className="inline-flex min-h-11 items-center">{label}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </>
              }
            />
          </div>
        </div>
      </section>
    </RendalReveal>
  );
}
