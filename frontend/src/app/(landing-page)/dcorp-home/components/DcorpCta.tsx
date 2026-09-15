import Link from "next/link";
import { GoldButton } from "@/components/ui/gold-button";

export function DcorpCta() {
  return (
    <section className="bg-[#1F1F1F] px-6 py-24 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-8 md:items-center md:text-center">
        <div className="flex items-center gap-3 md:justify-center">
          <span className="h-px w-10 bg-[#C9A96A]" aria-hidden="true" />
          <p className="font-sans text-[11px] font-semibold uppercase text-[#C9A96A]">
            Próximo passo
          </p>
        </div>
        <h2 className="text-balance font-sans text-3xl font-bold text-white md:text-5xl lg:text-6xl">
          Vamos construir oportunidades para o seu projeto.
        </h2>
        <p className="max-w-xl text-pretty font-sans text-base leading-relaxed text-white/65 md:text-lg">
          Fale com a equipe técnica da DCORP e solicite um orçamento com
          planejamento, execução e resultados.
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <GoldButton
            href="/contato?empresa=dcorp"
            className="h-11 px-8 text-[12px] tracking-[0.12em]"
          >
            Solicitar orçamento
          </GoldButton>
          <Link
            href="/obras"
            className="inline-flex h-11 items-center justify-center rounded-md border border-white/20 px-7 text-[12px] font-semibold text-white transition-colors duration-[var(--duration-quick)] ease-[var(--ease-smooth-out)] hover:border-white/40"
          >
            Ver obras
          </Link>
        </div>
      </div>
    </section>
  );
}
