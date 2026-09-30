import type { Metadata } from "next";
import { PageHero } from "@/components/rendal/PageHero";
import { SectionHeader } from "@/components/rendal/SectionHeader";
import { FinalCta } from "@/components/rendal/FinalCta";
import { FaqList } from "@/components/rendal/FaqList";
import { SnapRail } from "@/components/rendal/SnapRail";
import { StickyActionBar } from "@/components/rendal/StickyActionBar";
import { Journey } from "@/components/rendal/proprietarios/Journey";
import { Qualifier } from "@/components/rendal/proprietarios/Qualifier";
import { faqProprietarios } from "@/lib/rendal/content/faq";
import { RendalReveal } from "@/components/rendal/RendalReveal";
import { rendalWhatsapp } from "@/lib/rendal/site";

export const metadata: Metadata = {
  title: "Para proprietários de áreas",
  description:
    "Seu terreno pode virar um empreendimento com conceito. A Rendal estuda a viabilidade e você escolhe o modelo de participação.",
  alternates: { canonical: "/proprietarios" },
};

const MODELOS = [
  {
    title: "Venda do terreno",
    como: "A Rendal compra a área depois do estudo. Você recebe pela venda.",
    para: "Para quem quer liquidez e sair do imóvel.",
    horizonte: "Depende da documentação e da aprovação.",
  },
  {
    title: "Permuta por unidades",
    como: "Parte do pagamento vira unidades do próprio empreendimento.",
    para: "Para quem quer ficar com produto pronto.",
    horizonte: "A entrega segue o cronograma da obra.",
  },
  {
    title: "Parceria na SPE",
    como: "O terreno entra na sociedade do empreendimento.",
    para: "Para quem quer participar do negócio.",
    horizonte: "A participação é definida caso a caso, sem promessa de retorno.",
  },
];

export default function ProprietariosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Desenvolvimento de terrenos",
    provider: { "@type": "Organization", name: "Rendal Incorporadora" },
    areaServed: "Campinas",
    description: "Estudo de viabilidade e estruturação de empreendimento em terreno de terceiros.",
  };

  return (
    <main id="conteudo" className="bg-[#F8F1E3] pb-28 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RendalReveal>
        <PageHero
          eyebrow="Para proprietários de áreas"
          title="Seu terreno pode virar um empreendimento com conceito."
          subtitle="A Rendal estuda a viabilidade, estrutura o negócio e desenvolve o projeto. Você escolhe o modelo de participação."
          image="/wireframes/hero-condominio-ceu.jpg"
          imageAlt="Vista de condomínio residencial"
          priority
        />
      </RendalReveal>

      <RendalReveal>
      <section className="px-6 py-12 sm:py-20 md:py-24" aria-labelledby="jornada-titulo">
        <div className="mx-auto max-w-6xl">
          <SectionHeader id="jornada-titulo" title="Do terreno à entrega" align="start" />
          <div className="mt-10">
            <Journey />
          </div>
        </div>
      </section>
      </RendalReveal>

      <section className="bg-white px-6 py-12 sm:py-20 md:py-24" aria-labelledby="modelos-titulo">
        <div className="mx-auto max-w-6xl">
          <RendalReveal>
            <SectionHeader id="modelos-titulo" title="Modelos de participação" align="start" />
          </RendalReveal>
          <div className="mt-10 hidden gap-4 md:grid md:grid-cols-3">
            {MODELOS.map((item, index) => (
              <RendalReveal key={item.title} delayMs={index * 80} className="h-full">
                <Model {...item} />
              </RendalReveal>
            ))}
          </div>
          <div className="mt-10 md:hidden">
            <SnapRail label="Modelos de participação">
              {MODELOS.map((item, index) => (
                <RendalReveal key={item.title} delayMs={index * 80} className="h-full">
                  <Model {...item} />
                </RendalReveal>
              ))}
            </SnapRail>
          </div>
        </div>
      </section>

      <RendalReveal>
      <section className="px-6 py-12 sm:py-20 md:py-24" aria-labelledby="qualificador-titulo">
        <div className="mx-auto max-w-xl">
          <SectionHeader
            id="qualificador-titulo"
            eyebrow="Seu terreno em 60 segundos"
            title="Conte o essencial."
            subtitle="Quatro respostas. Sem promessa de valor."
            align="start"
          />
          <div className="mt-8">
            <Qualifier />
          </div>
        </div>
      </section>
      </RendalReveal>

      <FaqList items={faqProprietarios} title="Perguntas de proprietário" />
      <FinalCta
        title="Conte sobre a sua área."
        subtitle="A conversa começa pelo que você já sabe do terreno."
        href="/proprietarios#qualificador"
        cta="Avaliar meu terreno"
      />
      <StickyActionBar
        primaryHref="#qualificador"
        primaryLabel="Avaliar meu terreno"
        whatsappHref={rendalWhatsapp("Olá, quero conversar sobre um terreno.")}
        eventName="contato_submit"
      />
    </main>
  );
}

function Model({
  title,
  como,
  para,
  horizonte,
}: {
  title: string;
  como: string;
  para: string;
  horizonte: string;
}) {
  return (
    <article className="h-full rounded-3xl bg-[#F8F1E3] p-5 md:bg-white md:ring-1 md:ring-[#1F1F1F]/10">
      <h3 className="text-xl font-semibold text-[#1F1F1F]">{title}</h3>
      <p className="mt-3 text-base leading-7 text-[#1F1F1F]/70">{como}</p>
      <p className="mt-3 text-base leading-7 text-[#1F1F1F]/70">{para}</p>
      <p className="mt-3 text-sm font-semibold text-[#7A4A2B]">{horizonte}</p>
    </article>
  );
}
