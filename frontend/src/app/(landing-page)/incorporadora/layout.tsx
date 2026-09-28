import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aplicação inteligente do seu dinheiro | Rendal",
  description:
    "Cada centavo no lugar certo. Conheça os empreendimentos e agende visita sem compromisso.",
  openGraph: {
    title: "Aplicação inteligente do seu dinheiro | Rendal",
    description:
      "Cada centavo no lugar certo. Veja empreendimentos e agende visita sem compromisso.",
  },
};

export default function IncorporadoraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
