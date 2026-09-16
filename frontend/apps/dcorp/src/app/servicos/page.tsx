import type { Metadata } from "next";

export { default } from "@/app/(landing-page)/dcorp-pages/servicos/page";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Engenharia, execução e gestão: planejamento, orçamentação, sistemas industrializados, fiscalização e capacitação de equipes.",
  alternates: { canonical: "/servicos" },
  openGraph: {
    title: "Serviços | DCORP Engenharia",
    description:
      "Da orçamentação à fiscalização — em obras próprias e para terceiros.",
    url: "/servicos",
  },
};
