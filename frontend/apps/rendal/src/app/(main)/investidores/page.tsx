import type { Metadata } from "next";
import { PageHero } from "@/components/rendal/PageHero";
import { Disclaimer } from "@/components/rendal/Disclaimer";
import { CapitalBar } from "@/components/rendal/investidores/CapitalBar";
import { LeadForm } from "@/components/rendal/contato/LeadForm";
import { RendalReveal } from "@/components/rendal/RendalReveal";

export const metadata: Metadata = {
  title: "Para investidores",
  description:
    "Empreendimentos residenciais em SPE, com projeto definido antes da obra e capital aplicado onde o comprador percebe.",
  alternates: { canonical: "/investidores" },
  robots: { index: false, follow: false },
};

const TESES = [
  "Casa com mais valor percebido no mesmo orçamento",
  "Custo racionalizado sem comprometer o resultado",
  "Liquidez apoiada na percepção de valor",
];

export default function InvestidoresPage() {
  return (
    <main id="conteudo" className="bg-[#F8F1E3]">
      <RendalReveal>
        <PageHero
          dark
          grain
          eyebrow="Para investidores"
          title="Produto com percepção de valor e orçamento racionalizado."
          subtitle="Empreendimentos residenciais estruturados em SPE, com projeto definido antes da obra e capital aplicado onde o comprador percebe."
          image="/investidores/investor-hero.jpg"
          imageAlt="Empreendimento residencial à noite"
          priority
        />
      </RendalReveal>

      <section className="px-6 py-12 sm:py-20" aria-labelledby="tese-titulo">
        <div className="mx-auto max-w-3xl">
          <h2 id="tese-titulo" className="sr-only">A tese</h2>
          <ul className="m-0 flex list-none flex-col gap-6 border-l border-[#C9A96A] p-0 pl-6">
            {TESES.map((tese, index) => (
              <li key={tese}>
                <RendalReveal delayMs={index * 80}>
                  <p className="text-2xl font-semibold tracking-tight text-balance text-[#1F1F1F] sm:text-3xl">
                    {tese}
                  </p>
                </RendalReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RendalReveal>
      <section className="bg-white px-6 py-12 sm:py-20" aria-labelledby="capital-titulo">
        <div className="mx-auto max-w-5xl">
          <h2 id="capital-titulo" className="text-3xl font-semibold tracking-tight text-[#1F1F1F] sm:text-4xl">
            Para onde vai o capital
          </h2>
          <p className="mt-3 max-w-xl text-base leading-7 text-[#1F1F1F]/70">
            A cada real de obra, o projeto move verba do que não se vê para o que se usa.
          </p>
          <div className="mt-8">
            <CapitalBar />
          </div>
        </div>
      </section>
      </RendalReveal>

      <RendalReveal>
      <section className="px-6 py-12 sm:py-20" aria-labelledby="avaliacao-titulo">
        <div className="mx-auto max-w-3xl">
          <h2 id="avaliacao-titulo" className="text-2xl font-semibold text-[#1F1F1F]">
            Lógica de avaliação
          </h2>
          <p className="mt-4 text-base leading-7 text-[#1F1F1F]/70">
            Em um projeto de referência, uma unidade vendida na casa de R$ 200 mil teve avaliação na casa de R$ 300 mil. O exemplo ilustra a diferença entre preço de venda e avaliação bancária.
          </p>
          <div className="mt-4">
            <Disclaimer>
              Exemplo de projeto de referência. Depende da unidade e da análise do banco. Não é garantia, rentabilidade nem promessa de crédito.
            </Disclaimer>
          </div>
        </div>
      </section>
      </RendalReveal>

      <section className="bg-[#EDE6DA] px-6 py-12 sm:py-20" aria-labelledby="passos-titulo">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          <h2 id="passos-titulo" className="sr-only">Como começamos</h2>
          {[
            ["01", "Conversa inicial"],
            ["02", "Apresentação do empreendimento, mediante confidencialidade"],
            ["03", "Estruturação da participação"],
          ].map(([n, text], index) => (
            <RendalReveal key={n} delayMs={index * 80}>
              <article>
                <p className="text-3xl font-semibold tabular-nums text-[#0F5B63]">{n}</p>
                <p className="mt-2 text-lg font-semibold text-[#1F1F1F]">{text}</p>
              </article>
            </RendalReveal>
          ))}
        </div>
      </section>

      <RendalReveal>
      <section className="bg-[#0E2A2D] px-6 py-12 sm:py-20" aria-labelledby="apresentacao-titulo">
        <div className="mx-auto max-w-xl rounded-3xl bg-[#F8F1E3] p-6">
          <h2 id="apresentacao-titulo" className="text-3xl font-semibold tracking-tight text-[#1F1F1F]">
            Solicitar apresentação
          </h2>
          <div className="mt-6">
            <LeadForm subject="Investimento" perfil="investir" submitLabel="Solicitar apresentação" />
          </div>
        </div>
      </section>
      </RendalReveal>
    </main>
  );
}
