import Link from "next/link";
import { GoldButton } from "@/components/ui/gold-button";
import { companies } from "@/lib/companies";
import { cn } from "@/lib/utils";

const DCORP_ORCAMENTO = companies.dcorp.contactHref;
const DCORP_PARCEIRO = "/contato?empresa=dcorp#parceiro";

export function DcorpPageIntro({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <header className={cn("max-w-3xl", className)}>
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-10 bg-[#C9A96A]" aria-hidden="true" />
        <p className="font-sans text-[11px] font-semibold uppercase text-[#C9A96A]">
          {eyebrow}
        </p>
      </div>
      <h1 className="text-balance font-sans text-3xl font-bold text-[#1F1F1F] md:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-pretty font-sans text-base leading-relaxed text-[#4D4D4D] md:text-lg">
        {description}
      </p>
    </header>
  );
}

export function DcorpPageCta({
  title = "Engenharia e execução para o seu empreendimento.",
  description = "Orçamento com método — sistemas industrializados, prazo e entrega.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="border-t border-[#D9D9D9] bg-[#1F1F1F] px-6 py-20 md:px-12 md:py-24 lg:px-20">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 md:items-center md:text-center">
        <h2 className="text-balance font-sans text-2xl font-bold text-white md:text-4xl">
          {title}
        </h2>
        <p className="max-w-xl text-pretty font-sans text-base leading-relaxed text-white/65">
          {description}
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <GoldButton href={DCORP_ORCAMENTO} className="h-11 px-8 text-[12px]">
            Solicitar orçamento
          </GoldButton>
          <Link
            href={DCORP_PARCEIRO}
            className="inline-flex h-11 items-center justify-center rounded-md border border-white/20 px-7 text-[12px] font-semibold text-white transition-colors duration-[var(--duration-quick)] ease-out hover:border-white/40"
          >
            Seja nosso parceiro
          </Link>
        </div>
      </div>
    </section>
  );
}
