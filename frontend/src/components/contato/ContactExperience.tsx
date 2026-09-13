"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ContactHero } from "@/components/contato/ContactHero";
import { FAQ } from "@/components/contato/FAQ";
import { ContactForm } from "@/components/contato/ContactForm";
import { companies, companyList, isCompanyId } from "@/lib/companies";

function ContactChooser() {
  return (
    <section className="flex min-h-dvh flex-col justify-center bg-[#F8F1E3] px-6 pt-28 pb-16 md:px-16">
      <p className="mb-4 font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Contato</p>
      <h1 className="max-w-[16ch] font-display text-4xl leading-[1.08] text-balance text-graphite md:text-6xl">
        Com qual empresa você quer falar?
      </h1>
      <p className="mt-5 max-w-[42ch] font-sans text-base leading-7 text-pretty text-graphite/65">
        Rendal estrutura o negócio. DCorp projeta e constrói. A mensagem segue para a unidade certa.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {companyList.map((company) => (
          <Link
            key={company.id}
            href={company.contactHref}
            className="group flex flex-col items-start rounded-[28px] bg-white p-7 text-left ring-1 ring-graphite/10 transition-transform duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 md:p-10"
          >
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              {company.role}
            </span>
            <Image
              src={company.id === "rendal" ? "/brands/rendal-logo.png" : "/brands/dcorp-logo.png"}
              alt=""
              width={1016}
              height={813}
              className="mt-6 h-14 w-auto max-w-[10rem] object-contain md:h-16"
            />
            <span className="mt-8 font-display text-3xl text-graphite">{company.name}</span>
            <span className="mt-8 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-graphite">
              Continuar
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ContactExperienceInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const raw = searchParams.get("empresa");
  const companyId = isCompanyId(raw) ? raw : null;
  const company = companyId ? companies[companyId] : null;

  if (!company) {
    return <ContactChooser />;
  }

  return (
    <>
      <ContactHero company={company} />
      <FAQ />
      <ContactForm company={company} onSwitch={() => router.replace("/contato")} />
    </>
  );
}

export function ContactExperience() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[#F8F1E3] pt-24" />}>
      <ContactExperienceInner />
    </Suspense>
  );
}
