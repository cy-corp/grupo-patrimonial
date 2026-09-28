import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empreendimentos",
  description:
    "Empreendimentos Rendal. Veja plantas e condições e agende visita sem compromisso.",
};

export default function EmpreendimentosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
