import Link from "next/link";
import { DCORP_SERVICE_GROUPS } from "@/lib/dcorp-content";
import { DcorpPageCta, DcorpPageIntro } from "../DcorpPageChrome";

export default function DcorpServicosPage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:px-12 md:pb-28 md:pt-36 lg:px-20">
        <DcorpPageIntro
          eyebrow="Serviços"
          title="Engenharia, execução e gestão com capacidade de obra."
          description="Da orçamentação à fiscalização: atuamos em obras próprias e para terceiros, com foco em sistemas industrializados e alta produtividade."
        />

        <div className="mt-16 space-y-16 md:mt-20 md:space-y-20">
          {DCORP_SERVICE_GROUPS.map((group, groupIndex) => (
            <section key={group.title}>
              <div className="mb-8 flex items-end justify-between gap-4 border-b border-[#D9D9D9] pb-4">
                <h2 className="font-sans text-xl font-bold text-[#1F1F1F] md:text-2xl">
                  {group.title}
                </h2>
                <span className="font-sans text-[11px] font-semibold tabular-nums text-[#C9A96A]">
                  {String(groupIndex + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="grid gap-0 sm:grid-cols-2">
                {group.items.map((item, index) => (
                  <li
                    key={item}
                    className="flex gap-4 border-b border-[#D9D9D9] py-6 sm:border-r sm:px-6 sm:[&:nth-child(2n)]:border-r-0"
                  >
                    <span className="shrink-0 font-sans text-[11px] font-semibold tabular-nums text-[#C9A96A]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="font-sans text-base font-medium leading-snug text-[#1F1F1F] md:text-lg">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <aside className="mt-20 border border-[#D9D9D9] bg-[#F7F7F7] px-6 py-10 md:px-10 md:py-12">
          <p className="font-sans text-[11px] font-semibold uppercase text-[#C9A96A]">
            Parceria
          </p>
          <h2 className="mt-3 max-w-xl text-balance font-sans text-2xl font-bold text-[#1F1F1F] md:text-3xl">
            Seja nosso parceiro tecnológico.
          </h2>
          <p className="mt-4 max-w-2xl text-pretty font-sans text-base leading-relaxed text-[#4D4D4D]">
            Construtoras e incorporadoras que precisam implantar sistemas
            industrializados encontram na DCORP engenharia, treinamento e
            execução.
          </p>
          <Link
            href="/contato?empresa=dcorp#parceiro"
            className="t-learn mt-8 inline-flex items-center gap-2 font-sans text-[12px] font-semibold text-[#1F1F1F]"
          >
            Falar sobre parceria
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
        </aside>
      </div>
      <DcorpPageCta />
    </main>
  );
}
