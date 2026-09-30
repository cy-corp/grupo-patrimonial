import type { Metadata } from "next";
import { PageHero } from "@/components/rendal/PageHero";
import { PartnerTabs } from "@/components/rendal/parceiros/PartnerTabs";
import { RendalReveal } from "@/components/rendal/RendalReveal";
import { headlineLight } from "@/lib/rendal/tokens";

export const metadata: Metadata = {
  title: "Parceiros",
  description:
    "Imobiliárias, corretores e empresas de construção que compartilham o cuidado com o projeto.",
  alternates: { canonical: "/parceiros" },
};

export default async function ParceirosPage({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string }>;
}) {
  const params = await searchParams;
  const initial =
    params.tipo === "construcao" || params.tipo === "fornecedores" || params.tipo === "imobiliarias"
      ? params.tipo
      : "imobiliarias";

  return (
    <main id="conteudo" className="bg-[#F8F1E3]">
      <RendalReveal>
        <PageHero
          eyebrow="Parceiros"
          title={
            <>
              <span className={`block pb-[0.12em] ${headlineLight}`}>Um produto fácil de explicar</span>
              <span className="block pb-[0.12em] text-[#7A4A2B]">é mais fácil de vender.</span>
            </>
          }
          subtitle="Trabalhamos com imobiliárias, corretores e empresas de construção que compartilham o cuidado com o projeto."
        />
      </RendalReveal>

      <PartnerTabs initial={initial} />
    </main>
  );
}
