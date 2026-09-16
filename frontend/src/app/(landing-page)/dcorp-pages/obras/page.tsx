import { DCORP_WORKS_PLACEHOLDERS } from "@/lib/dcorp-content";
import { DcorpPageCta, DcorpPageIntro } from "../DcorpPageChrome";

export default function DcorpObrasPage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:px-12 md:pb-28 md:pt-36 lg:px-20">
        <DcorpPageIntro
          eyebrow="Obras e portfólio"
          title="Execução com engenharia e sistemas de alta produtividade."
          description="O portfólio visual está em atualização com registros autorizados de obra. Até lá, mantemos o foco no que a DCORP entrega: planejamento, sistemas industrializados e capacidade de execução."
        />

        <p className="mt-10 border-l-2 border-[#C9A96A] pl-4 font-sans text-sm leading-relaxed text-[#4D4D4D]">
          Placeholders honestos — fotos e cases nominados entram assim que
          houver material aprovado pelo cliente.
        </p>

        <ul className="mt-14 grid gap-px bg-[#D9D9D9] sm:grid-cols-2 lg:grid-cols-3">
          {DCORP_WORKS_PLACEHOLDERS.map((work, index) => (
            <li key={work.title} className="bg-white">
              <div className="relative aspect-[4/3] bg-[#1F1F1F]">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(145deg, #2c2c2c 0%, #1F1F1F 50%, #3d3426 100%)",
                  }}
                  aria-hidden="true"
                />
                <span className="absolute left-5 top-5 font-sans text-[11px] font-semibold tabular-nums text-[#C9A96A]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="absolute bottom-5 left-5 font-sans text-[10px] font-semibold uppercase tracking-wide text-white/45">
                  Registro em breve
                </span>
              </div>
              <div className="border-t border-[#D9D9D9] px-5 py-5">
                <h2 className="font-sans text-lg font-semibold text-[#1F1F1F]">
                  {work.title}
                </h2>
                <p className="mt-2 font-sans text-sm text-[#4D4D4D]">
                  {work.meta}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <DcorpPageCta
        title="Quer ver a DCORP no seu próximo empreendimento?"
        description="Solicite um orçamento e conversamos sobre escopo, sistema e prazo."
      />
    </main>
  );
}
