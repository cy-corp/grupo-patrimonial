import type { Metadata } from "next";

export { default } from "@/app/(landing-page)/dcorp-pages/servicos/page";

export const metadata: Metadata = {
  title: "Construção civil",
  description:
    "Projetos arquitetônicos, acompanhamento e execução de obras — engenharia, sistemas industrializados e gestão.",
  alternates: { canonical: "/servicos" },
  openGraph: {
    title: "Construção civil | DCORP Engenharia",
    description:
      "Projetos arquitetônicos, engenharia e execução — em obras próprias e para terceiros.",
    url: "/servicos",
  },
};
