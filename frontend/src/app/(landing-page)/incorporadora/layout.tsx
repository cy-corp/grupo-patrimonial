import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aplicação inteligente do seu dinheiro | Rendal",
  description:
    "Rendal Incorporadora: casas com laje de lazer, conforto no projeto e acabamento bem escolhido. Conheça os empreendimentos.",
  openGraph: {
    title: "Aplicação inteligente do seu dinheiro | Rendal",
    description:
      "Laje de lazer, lavabo social e acabamento pensado para o uso diário. Conheça os empreendimentos Rendal.",
  },
};

export default function IncorporadoraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
