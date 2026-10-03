import type { Metadata } from "next";
import { QuoteExperience } from "@/components/site/quote-experience";
import { SiteFooter, SiteHeader } from "@/components/site/site-chrome";

export const metadata: Metadata = {
  title: "Orçamento",
  alternates: { canonical: "/orcamento" },
  description: "Monte o seu pedido de orçamento de topografia e georreferenciamento em quatro passos.",
};

export default function OrcamentoPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col bg-[#03121A] [&>section]:flex-1">
        <QuoteExperience />
      </main>
      <SiteFooter />
    </>
  );
}
