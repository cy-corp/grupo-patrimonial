import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empreendimentos",
  description:
    "Conheça os empreendimentos Rendal: casas com laje de lazer e presença de alto padrão no preço das classes B e C. Agende visita sem compromisso.",
};

export default function EmpreendimentosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
