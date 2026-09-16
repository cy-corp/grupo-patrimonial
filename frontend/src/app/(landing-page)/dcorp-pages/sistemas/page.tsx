import {
  DCORP_SYSTEMS,
  DCORP_SYSTEMS_HEADLINE,
} from "@/lib/dcorp-content";
import { DcorpPageCta, DcorpPageIntro } from "../DcorpPageChrome";

export default function DcorpSistemasPage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:px-12 md:pb-28 md:pt-36 lg:px-20">
        <DcorpPageIntro
          eyebrow="Sistemas construtivos"
          title={DCORP_SYSTEMS_HEADLINE}
          description="Apresentamos cada sistema individualmente — com tipo construtivo, benefícios e quando aplicar. Nem todos são construção a seco: EPS, ICF e paredes de concreto utilizam argamassa ou concreto."
        />

        <nav
          aria-label="Índice de sistemas"
          className="mt-14 flex flex-wrap gap-x-6 gap-y-3 border-y border-[#D9D9D9] py-5"
        >
          {DCORP_SYSTEMS.map((system, index) => (
            <a
              key={system.id}
              href={`#${system.id}`}
              className="font-sans text-sm font-medium text-[#1F1F1F] transition-colors hover:text-[#C9A96A]"
            >
              <span className="mr-2 tabular-nums text-[#C9A96A]">
                {String(index + 1).padStart(2, "0")}
              </span>
              {system.name}
            </a>
          ))}
        </nav>

        <div className="mt-6 divide-y divide-[#D9D9D9]">
          {DCORP_SYSTEMS.map((system, index) => (
            <article
              key={system.id}
              id={system.id}
              className="scroll-mt-28 py-14 md:py-16"
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <span className="font-sans text-[11px] font-semibold tabular-nums text-[#C9A96A]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-sans text-[10px] font-semibold uppercase tracking-wide text-[#4D4D4D]">
                    {system.typeLabel}
                  </p>
                  <h2 className="mt-3 font-sans text-2xl font-bold text-[#1F1F1F] md:text-3xl">
                    {system.name}
                  </h2>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-pretty font-sans text-base leading-relaxed text-[#4D4D4D] md:text-lg">
                    {system.summary}
                  </p>
                  <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
                    {system.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="font-sans text-sm text-[#1F1F1F] before:mr-2 before:text-[#C9A96A] before:content-['—']"
                      >
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 border-l-2 border-[#C9A96A] pl-4 font-sans text-sm leading-relaxed text-[#4D4D4D]">
                    <span className="font-semibold text-[#1F1F1F]">
                      Quando usar.{" "}
                    </span>
                    {system.when}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <DcorpPageCta
        title="Quer aplicar o sistema certo no seu projeto?"
        description="Nossa equipe indica a solução de alta produtividade mais adequada ao empreendimento."
      />
    </main>
  );
}
