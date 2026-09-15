import Link from "next/link";

const solutions = [
  {
    name: "Painel Monolítico EPS",
    benefits: ["Leveza", "Desempenho térmico", "Rapidez de montagem"],
  },
  {
    name: "Sistema Concrete Laje",
    benefits: ["Racionalização", "Robustez", "Controle construtivo"],
  },
  {
    name: "Sistema Concrete Parede-Forma",
    benefits: ["Precisão", "Velocidade", "Padronização"],
  },
  {
    name: "Estruturas Industriais",
    benefits: ["Escala", "Desempenho", "Eficiência"],
  },
];

export function DcorpSolutions() {
  return (
    <section className="bg-[#F7F7F7] px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C9A96A]" aria-hidden="true" />
              <p className="font-sans text-[11px] font-semibold uppercase text-[#C9A96A]">
                Soluções
              </p>
            </div>
            <h2 className="text-balance font-sans text-3xl font-bold text-[#1F1F1F] md:text-4xl lg:text-5xl">
              Sistemas construtivos industrializados
            </h2>
            <p className="mt-5 max-w-xl text-pretty font-sans text-base leading-relaxed text-[#4D4D4D] md:text-lg">
              Soluções industrializadas para ganhar produtividade, reduzir
              desperdícios e acelerar prazos.
            </p>
          </div>
          <Link
            href="/sistemas-construtivos"
            className="t-learn inline-flex shrink-0 items-center gap-2 self-start font-sans text-[12px] font-semibold text-[#1F1F1F] md:self-auto"
          >
            Explorar sistemas
            <span className="t-learn-chevron" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  className="t-learn-arm t-learn-arm-top"
                  d="M6 4L10 8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  className="t-learn-arm t-learn-arm-bot"
                  d="M10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </Link>
        </div>

        <ul className="grid gap-px bg-[#D9D9D9] sm:grid-cols-2">
          {solutions.map((solution, index) => (
            <li key={solution.name} className="bg-[#F7F7F7] p-8 md:p-10">
              <span className="font-sans text-[11px] font-semibold tabular-nums text-[#C9A96A]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-sans text-xl font-semibold text-[#1F1F1F] md:text-2xl">
                {solution.name}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                {solution.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="font-sans text-sm text-[#4D4D4D] before:mr-2 before:text-[#C9A96A] before:content-['—']"
                  >
                    {benefit}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
