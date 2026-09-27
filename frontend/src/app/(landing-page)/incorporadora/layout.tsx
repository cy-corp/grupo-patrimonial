import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aplicação inteligente do seu dinheiro | Rendal",
  description:
    "Rendal Incorporadora: capital no lugar certo — da laje ao acabamento. Conheça empreendimentos e agende visita sem compromisso.",
  openGraph: {
    title: "Aplicação inteligente do seu dinheiro | Rendal",
    description:
      "Cada centavo no lugar certo. Laje de lazer, lavabo social e acabamento onde gera valor.",
  },
};

export default function IncorporadoraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
