import {
  DCORP_AUDIENCES,
  DCORP_POSITIONING,
} from "@/lib/dcorp-content";
import { DcorpPageCta, DcorpPageIntro } from "../DcorpPageChrome";

export default function DcorpQuemSomosPage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:px-12 md:pb-28 md:pt-36 lg:px-20">
        <DcorpPageIntro
          eyebrow="A DCORP"
          title="Construir hoje para gerar mais oportunidades amanhã."
          description={DCORP_POSITIONING}
        />

        <div className="mt-16 grid gap-12 border-t border-[#D9D9D9] pt-14 md:mt-20 md:grid-cols-2 md:gap-16 md:pt-16">
          <div>
            <h2 className="font-sans text-xl font-bold text-[#1F1F1F] md:text-2xl">
              Especialização técnica e capacidade de execução
            </h2>
            <p className="mt-5 text-pretty font-sans text-base leading-relaxed text-[#4D4D4D]">
              A DCORP une planejamento, sistemas construtivos industrializados e
              entrega em obra — com produtividade, redução de desperdícios e
              previsibilidade para incorporadoras, investidores e empresas.
            </p>
            <p className="mt-4 text-pretty font-sans text-base leading-relaxed text-[#4D4D4D]">
              Atuamos em obras próprias e na prestação de serviços para clientes
              terceiros, inclusive SPEs externas ao grupo.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
            {[
              {
                title: "Planejamento",
                detail: "Estratégia, inteligência e viabilidade técnica.",
              },
              {
                title: "Pessoas",
                detail: "Parceria e confiança com quem executa e quem investe.",
              },
              {
                title: "Execução",
                detail: "Resultados concretos com método e fiscalização.",
              },
            ].map((pillar) => (
              <div key={pillar.title} className="border-t border-[#D9D9D9] pt-5">
                <p className="font-sans text-[11px] font-semibold uppercase text-[#C9A96A]">
                  {pillar.title}
                </p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-[#4D4D4D]">
                  {pillar.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <section className="mt-20 md:mt-24">
          <h2 className="font-sans text-xl font-bold text-[#1F1F1F] md:text-2xl">
            Para quem trabalhamos
          </h2>
          <ul className="mt-8 grid gap-0 border-t border-[#D9D9D9] sm:grid-cols-2 lg:grid-cols-3">
            {DCORP_AUDIENCES.map((audience) => (
              <li
                key={audience.title}
                className="border-b border-[#D9D9D9] py-7 sm:border-r sm:px-6 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
              >
                <h3 className="font-sans text-base font-semibold text-[#1F1F1F]">
                  {audience.title}
                </h3>
                <p className="mt-2 text-pretty font-sans text-sm leading-relaxed text-[#4D4D4D]">
                  {audience.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <DcorpPageCta />
    </main>
  );
}
