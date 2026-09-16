import Link from "next/link";
import { DCORP_WORKS_PLACEHOLDERS } from "@/lib/dcorp-content";

export function DcorpWorksTeaser() {
  return (
    <section className="bg-white px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C9A96A]" aria-hidden="true" />
              <p className="font-sans text-[11px] font-semibold uppercase text-[#C9A96A]">
                Obras
              </p>
            </div>
            <h2 className="text-balance font-sans text-3xl font-bold text-[#1F1F1F] md:text-4xl lg:text-5xl">
              Capacidade de execução em campo.
            </h2>
            <p className="mt-5 max-w-xl text-pretty font-sans text-base leading-relaxed text-[#4D4D4D] md:text-lg">
              Portfólio em atualização com registros reais de obra. Enquanto
              isso, o foco permanece em sistemas industrializados e entrega com
              engenharia.
            </p>
          </div>
          <Link
            href="/obras"
            className="t-learn inline-flex shrink-0 items-center gap-2 self-start font-sans text-[12px] font-semibold text-[#1F1F1F] md:self-auto"
          >
            Ver portfólio
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

        <ul className="grid gap-px bg-[#D9D9D9] md:grid-cols-3">
          {DCORP_WORKS_PLACEHOLDERS.map((work, index) => (
            <li key={work.title} className="bg-white">
              <div className="relative aspect-[4/3] bg-[#1F1F1F]">
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #2a2a2a 0%, #1F1F1F 45%, #3a3428 100%)",
                  }}
                  aria-hidden="true"
                />
                <span className="absolute left-5 top-5 font-sans text-[11px] font-semibold tabular-nums text-[#C9A96A]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="absolute bottom-5 left-5 right-5 font-sans text-[10px] font-semibold uppercase tracking-wide text-white/45">
                  Registro em breve
                </span>
              </div>
              <div className="border-t border-[#D9D9D9] px-5 py-5">
                <h3 className="font-sans text-lg font-semibold text-[#1F1F1F]">
                  {work.title}
                </h3>
                <p className="mt-2 font-sans text-sm text-[#4D4D4D]">
                  {work.meta}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
