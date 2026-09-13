import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rendal",
  description:
    "A Rendal identifica oportunidades e estrutura produto, capital, aprovações e estratégia para transformar potencial em negócio imobiliário.",
};

export default function IncorporadoraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
