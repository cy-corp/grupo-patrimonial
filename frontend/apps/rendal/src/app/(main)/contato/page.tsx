import type { Metadata } from "next";
import { ProfileForm } from "@/components/rendal/contato/ProfileForm";
import { RendalReveal } from "@/components/rendal/RendalReveal";
import { WhatsAppIcon } from "@/components/whatsapp-button";
import { companies } from "@/lib/companies";
import { isContactProfileId } from "@/lib/rendal/contact-profiles";

export const metadata: Metadata = {
  title: "Contato",
  description: "Escolha o assunto e a equipe certa retorna para você.",
  alternates: { canonical: "/contato" },
};

export default async function ContatoPage({
  searchParams,
}: {
  searchParams: Promise<{ perfil?: string; assunto?: string; empreendimento?: string }>;
}) {
  const params = await searchParams;
  const fromAssunto =
    params.assunto === "visita"
      ? "comprar"
      : params.assunto === "financiamento"
        ? "financiar"
        : undefined;
  const candidate = params.perfil ?? fromAssunto;
  const initial = isContactProfileId(candidate) ? candidate : "comprar";
  const company = companies.rendal;

  return (
    <main id="conteudo" className="bg-[#F8F1E3] px-6 pt-36 pb-20">
      <RendalReveal>
        <header className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-[#1F1F1F] sm:text-5xl">
            Fale com a Rendal.
          </h1>
          <p className="mt-4 text-base leading-7 text-[#1F1F1F]/70 sm:text-lg">
            Escolha o assunto e a equipe certa retorna para você.
          </p>
        </header>
      </RendalReveal>
      <RendalReveal delayMs={80}>
        <div className="mx-auto mt-10 max-w-5xl">
          <ProfileForm initial={initial} empreendimento={params.empreendimento} />
        </div>
      </RendalReveal>
      <section className="mx-auto mt-12 grid max-w-5xl gap-3 sm:grid-cols-3" aria-label="Outros canais">
        <RendalReveal delayMs={0}>
          <a href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1F1F1F] px-4 font-semibold text-white">
            <WhatsAppIcon className="size-5 shrink-0" aria-hidden />
            WhatsApp
          </a>
        </RendalReveal>
        <RendalReveal delayMs={70}>
          <a href={company.phoneHref} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-4 font-semibold text-[#1F1F1F] ring-1 ring-[#1F1F1F]/10">
            {company.phone}
          </a>
        </RendalReveal>
        <RendalReveal delayMs={140}>
          <a href={`mailto:${company.email}`} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-4 font-semibold text-[#1F1F1F] ring-1 ring-[#1F1F1F]/10">
            {company.email}
          </a>
        </RendalReveal>
      </section>
    </main>
  );
}
