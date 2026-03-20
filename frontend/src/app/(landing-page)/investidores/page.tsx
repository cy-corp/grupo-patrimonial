import { InvestorsHero } from "@/components/investidores/InvestorsHero";
import { BusinessModels } from "@/components/investidores/BusinessModels";
import { InvestorsCTA } from "@/components/investidores/InvestorsCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investidores & Parcerias | Grupo Patrimonial",
  description: "Estruturamos parcerias patrimoniais e imobiliárias com visão de longo prazo e segurança jurídica.",
};

export default function InvestidoresPage() {
  return (
    <main className="min-h-screen bg-surface">
      <InvestorsHero />
      <BusinessModels />
      <InvestorsCTA />
    </main>
  );
}
