"use client";

import { ContactForm } from "@/components/contato/ContactForm";
import { companies, type CompanyId } from "@/lib/companies";

export function SiteContactPage({ companyId }: { companyId: CompanyId }) {
  const company = companies[companyId];

  return (
    <div className="container mx-auto max-w-6xl px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mb-12 max-w-2xl">
        <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
          Contato
        </span>
        <h1 className="font-display text-4xl leading-tight text-graphite md:text-6xl">
          Fale com a {company.name}.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-graphite/70">
          Conte-nos sobre sua necessidade e nossa equipe retornará para entender o próximo passo.
        </p>
      </div>
      <ContactForm company={company} />
    </div>
  );
}
