import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DCorp",
  description:
    "A DCorp converte a estratégia em engenharia: projeto, técnica e execução de obra com controle em cada etapa.",
};

export default function EngenhariaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
