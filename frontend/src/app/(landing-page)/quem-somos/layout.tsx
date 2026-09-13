import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quem somos",
  description:
    "Duas empresas, papéis claros: a Rendal estrutura o negócio; a DCorp projeta e constrói.",
};

export default function QuemSomosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
