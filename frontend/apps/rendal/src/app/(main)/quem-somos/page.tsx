import type { Metadata } from "next";
import { PageHero } from "@/components/rendal/PageHero";
import { SectionHeader } from "@/components/rendal/SectionHeader";
import { FinalCta } from "@/components/rendal/FinalCta";
import { RendalButton } from "@/components/rendal/RendalButton";
import { RendalReveal } from "@/components/rendal/RendalReveal";
import { Decisions } from "@/components/rendal/quem-somos/Decisions";
import { getRendalSiteUrl } from "@/lib/rendal/site";

export const metadata: Metadata = {
  title: "A Rendal",
  description:
    "Incorporadora com método: projeto antes da obra, capital onde aparece e transparência antes da venda.",
  alternates: { canonical: "/quem-somos" },
};

const FRENTES = [
  { title: "Terrenos e viabilidade", text: "Estuda a área e se o produto cabe no terreno." },
  { title: "Estruturação jurídica e SPE", text: "Organiza o negócio antes de vender unidade." },
  { title: "Aprovações e licenciamento", text: "Conduz o caminho até o projeto poder sair do papel." },
  { title: "Coordenação de projetos", text: "Arquitetura, estrutura e instalações nascem juntos." },
  { title: "Investidores e proprietários", text: "Cada parte sabe o papel e o momento da conversa." },
  { title: "Comercialização", text: "Planta, acabamento e memorial abertos antes da visita." },
];

const PRINCIPIOS = [
  { n: "01", title: "Projeto antes de obra", text: "A decisão de planta vem antes do canteiro." },
  { n: "02", title: "Capital onde aparece", text: "O orçamento pesa no que se vê e se usa." },
  { n: "03", title: "Transparência antes da venda", text: "A visita começa com o projeto na mesa." },
];

export default function QuemSomosPage() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rendal Incorporadora",
    url: getRendalSiteUrl(),
    logo: `${getRendalSiteUrl()}/brands/rendal-logo.png`,
  };

  return (
    <main id="conteudo" className="bg-[#F8F1E3]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <RendalReveal>
        <PageHero
          eyebrow="A Rendal"
          title="Incorporação com o orçamento no lugar certo."
          subtitle="Do terreno à entrega, cada decisão de projeto é tomada pelo que gera uso e valor para quem mora."
          image="/quem-somos/quem-somos-hero.jpg"
          imageAlt="Equipe e método da Rendal"
          priority
        />
      </RendalReveal>

      <RendalReveal>
        <section className="px-6 py-12 sm:py-20 md:py-24" aria-labelledby="decisoes-titulo">
          <div className="mx-auto max-w-5xl">
            <SectionHeader id="decisoes-titulo" eyebrow="Método" title="Decisões, não adjetivos." align="start" />
            <div className="mt-10">
              <Decisions />
            </div>
          </div>
        </section>
      </RendalReveal>

      <RendalReveal>
        <section className="bg-white px-6 py-12 sm:py-20 md:py-24" aria-labelledby="frentes-titulo">
          <div className="mx-auto max-w-5xl">
            <SectionHeader id="frentes-titulo" title="O que a Rendal faz" align="start" />
            <ul className="mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {FRENTES.map((item, index) => (
                <li key={item.title}>
                  <RendalReveal delayMs={index * 70}>
                    <div className="rounded-3xl bg-[#F8F1E3] p-5">
                      <h3 className="text-lg font-semibold text-[#1F1F1F]">{item.title}</h3>
                      <p className="mt-2 text-base leading-7 text-[#1F1F1F]/70">{item.text}</p>
                    </div>
                  </RendalReveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </RendalReveal>

      <RendalReveal>
        <section className="px-6 pt-12 pb-10 sm:pt-20 sm:pb-12 md:pt-24 md:pb-16" aria-labelledby="principios-titulo">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <h2 id="principios-titulo" className="sr-only">Como decidimos</h2>
            {PRINCIPIOS.map((item, index) => (
              <RendalReveal key={item.n} delayMs={index * 80}>
                <article>
                  <p className="text-4xl font-semibold tabular-nums text-[#7A4A2B]">{item.n}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#1F1F1F]">{item.title}</h3>
                  <p className="mt-2 text-base leading-7 text-[#1F1F1F]/70">{item.text}</p>
                </article>
              </RendalReveal>
            ))}
          </div>
          <div className="mx-auto mt-8 flex max-w-5xl justify-center md:mt-10">
            <RendalButton href="/empreendimentos" variant="ghost">Ver empreendimentos</RendalButton>
          </div>
        </section>
      </RendalReveal>

      {/* Pessoas — comentado por enquanto
      <section className="bg-white px-6 py-12 sm:py-20 md:py-24" aria-labelledby="pessoas-titulo">
        <div className="mx-auto max-w-5xl">
          <SectionHeader id="pessoas-titulo" title="Pessoas" subtitle="Quem conduz a incorporação." align="start" />
          <div className="mt-10 hidden gap-4 md:grid md:grid-cols-3">
            {lideranca.map((pessoa) => (
              <Person key={pessoa.nome} {...pessoa} />
            ))}
          </div>
          <div className="mt-10 md:hidden">
            <SnapRail label="Liderança">
              {lideranca.map((pessoa) => (
                <Person key={pessoa.nome} {...pessoa} color />
              ))}
            </SnapRail>
          </div>
        </div>
      </section>
      */}

      <FinalCta
        title="Vamos conversar sobre o próximo empreendimento?"
        subtitle="Conte o que você está olhando. A equipe retorna para marcar a conversa certa."
        href="/contato#perfil"
        cta="Fale com a Rendal"
      />
    </main>
  );
}

