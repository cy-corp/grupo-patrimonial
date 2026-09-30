import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/rendal/PageHero";
import { StatusChip } from "@/components/rendal/StatusChip";
import { FaqList } from "@/components/rendal/FaqList";
import { LeadForm } from "@/components/rendal/contato/LeadForm";
import {
  empreendimentos,
  fatosDoEmpreendimento,
  formatPreco,
} from "@/lib/rendal/content/empreendimentos";
import { faqEmpreendimentos } from "@/lib/rendal/content/faq";
import { RendalReveal } from "@/components/rendal/RendalReveal";

export const metadata: Metadata = {
  title: "Empreendimentos",
  description:
    "Casas pensadas para o dia a dia. Veja plantas e condições antes de visitar.",
  alternates: { canonical: "/empreendimentos" },
};

export default function EmpreendimentosPage() {
  const list = empreendimentos;
  const single = empreendimentos.length === 1;

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: list.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.nome,
      url: `/empreendimentos/${item.slug}`,
    })),
  };

  return (
    <main id="conteudo" className="bg-[#F8F1E3]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <RendalReveal>
        <PageHero
          eyebrow="Empreendimentos"
          title="Casas pensadas para o dia a dia."
          subtitle="Laje de lazer, lavabo social e acabamento onde faz diferença. Veja plantas e condições antes de visitar."
        />
      </RendalReveal>

      <section className="px-6 py-12 sm:py-20" aria-label="Lista de empreendimentos">
        <div className={single ? "mx-auto max-w-5xl" : "mx-auto grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-3"}>
          {list.map((item, index) => (
            <RendalReveal key={item.slug} delayMs={index * 80}>
            <article
              className={single ? "relative grid overflow-hidden rounded-3xl bg-white ring-1 ring-[#1F1F1F]/10 md:grid-cols-2" : "relative h-full overflow-hidden rounded-3xl bg-white ring-1 ring-[#1F1F1F]/10"}
            >
              <div className={single ? "relative aspect-[4/5] md:aspect-auto md:min-h-[320px]" : "relative aspect-[4/5] md:aspect-[4/3]"}>
                <Image src={item.heroDia.src} alt={item.heroDia.alt} fill priority={single} sizes={single ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"} className="object-cover" />
                <StatusChip status={item.status} className="absolute top-4 left-4" />
              </div>
              <div className="flex flex-col justify-center p-6">
                <h2 className="text-2xl font-semibold tracking-tight text-[#1F1F1F]">
                  <Link href={`/empreendimentos/${item.slug}`} className="after:absolute after:inset-0">
                    {item.nome}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-[#1F1F1F]/65">{item.bairro ?? item.cidade}</p>
                <p className="mt-3 text-base text-[#1F1F1F]/70">{fatosDoEmpreendimento(item)}</p>
                {item.precoPublico && item.precoAPartirDe ? (
                  <p className="mt-3 text-sm font-semibold tabular-nums text-[#7A4A2B]">
                    a partir de {formatPreco(item.precoAPartirDe)}
                  </p>
                ) : null}
                <p className="mt-6 text-sm font-semibold text-[#7A4A2B]">Ver empreendimento</p>
              </div>
            </article>
            </RendalReveal>
          ))}
        </div>
      </section>

      <RendalReveal>
      <section className="px-6 pb-12" aria-labelledby="lancamento-titulo">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-6 ring-1 ring-[#1F1F1F]/10">
          <h2 id="lancamento-titulo" className="text-2xl font-semibold tracking-tight text-[#1F1F1F]">
            Quer saber do próximo lançamento?
          </h2>
          <div className="mt-4">
            <LeadForm compact subject="Lista de lançamento" perfil="lista-lancamento" submitLabel="Quero saber" eventName="contato_submit" hidden={{ name: "Lista de lançamento" }} />
          </div>
        </div>
      </section>
      </RendalReveal>

      <FaqList items={faqEmpreendimentos} title="Antes da visita" />
    </main>
  );
}
