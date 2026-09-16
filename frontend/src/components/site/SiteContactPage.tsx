"use client";

import Link from "next/link";
import { ContactForm } from "@/components/contato/ContactForm";
import { companies, type CompanyId } from "@/lib/companies";

export function SiteContactPage({ companyId }: { companyId: CompanyId }) {
  const company = companies[companyId];
  const isDcorp = companyId === "dcorp";

  return (
    <div className="container mx-auto max-w-6xl px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mb-12 max-w-2xl">
        <span
          className={
            isDcorp
              ? "mb-4 block font-sans text-[11px] font-semibold uppercase text-[#C9A96A]"
              : "mb-4 block text-[10px] font-bold uppercase tracking-[0.4em] text-primary"
          }
        >
          Contato
        </span>
        <h1
          className={
            isDcorp
              ? "text-balance font-sans text-4xl font-bold leading-tight text-[#1F1F1F] md:text-6xl"
              : "font-display text-4xl leading-tight text-graphite md:text-6xl"
          }
        >
          {isDcorp
            ? "Solicite um orçamento ou fale sobre parceria."
            : `Fale com a ${company.name}.`}
        </h1>
        <p
          className={
            isDcorp
              ? "mt-5 max-w-xl text-pretty font-sans text-base leading-relaxed text-[#4D4D4D]"
              : "mt-5 max-w-xl text-base leading-7 text-graphite/70"
          }
        >
          {isDcorp
            ? "Conte o escopo do empreendimento — sistemas, prazos e necessidade de execução. Nossa equipe técnica retorna com o próximo passo."
            : "Conte-nos sobre sua necessidade e nossa equipe retornará para entender o próximo passo."}
        </p>
      </div>

      {isDcorp ? (
        <aside
          id="parceiro"
          className="mb-12 scroll-mt-28 border border-[#D9D9D9] bg-[#F7F7F7] px-6 py-8 md:px-8"
        >
          <p className="font-sans text-[11px] font-semibold uppercase text-[#C9A96A]">
            Seja nosso parceiro
          </p>
          <p className="mt-3 max-w-2xl text-pretty font-sans text-base leading-relaxed text-[#4D4D4D]">
            Construtoras e incorporadoras que precisam de parceiro tecnológico
            para implantar sistemas industrializados — mencione “parceria” na
            mensagem do formulário.
          </p>
          <Link
            href="#contato-form"
            className="mt-5 inline-block font-sans text-[12px] font-semibold text-[#1F1F1F] underline-offset-4 hover:underline"
          >
            Ir ao formulário
          </Link>
        </aside>
      ) : null}

      <div id="contato-form" className="scroll-mt-28">
        <ContactForm company={company} />
      </div>
    </div>
  );
}
