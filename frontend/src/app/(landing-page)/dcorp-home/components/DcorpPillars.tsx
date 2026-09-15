const pillars = [
  {
    title: "Inteligência construtiva",
    description:
      "Planejamento estruturado e decisões técnicas que elevam produtividade e previsibilidade de obra.",
  },
  {
    title: "Eficiência operacional",
    description:
      "Sistemas industrializados para reduzir desperdícios, acelerar prazos e padronizar qualidade.",
  },
  {
    title: "Controle de qualidade",
    description:
      "Execução com método, fiscalização e entregas mensuráveis em cada etapa do projeto.",
  },
  {
    title: "Crescimento sustentável",
    description:
      "Soluções que equilibram desempenho, racionalização de recursos e visão de longo prazo.",
  },
];

export function DcorpPillars() {
  return (
    <section className="bg-white px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl md:mb-20">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#C9A96A]" aria-hidden="true" />
            <p className="font-sans text-[11px] font-semibold uppercase text-[#C9A96A]">
              Diferenciais
            </p>
          </div>
          <h2 className="text-balance font-sans text-3xl font-bold text-[#1F1F1F] md:text-4xl lg:text-5xl">
            Planejamento, execução e resultados.
          </h2>
          <p className="mt-5 max-w-xl text-pretty font-sans text-base leading-relaxed text-[#4D4D4D] md:text-lg">
            Eficiência, tecnologia e crescimento para projetos que exigem
            desempenho industrial.
          </p>
        </div>

        <ul className="grid gap-0 border-t border-[#D9D9D9] sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <li
              key={pillar.title}
              className="border-b border-[#D9D9D9] py-8 sm:border-r sm:px-6 sm:py-10 lg:px-8 [&:nth-child(2n)]:sm:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0"
            >
              <h3 className="font-sans text-lg font-semibold text-[#1F1F1F]">
                {pillar.title}
              </h3>
              <p className="mt-3 text-pretty font-sans text-sm leading-relaxed text-[#4D4D4D]">
                {pillar.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
