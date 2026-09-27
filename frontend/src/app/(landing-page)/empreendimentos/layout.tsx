import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empreendimentos",
  description:
    "Empreendimentos Rendal: laje de lazer, lavabo social e capital no lugar certo. Agende visita sem compromisso.",
};

export default function EmpreendimentosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
