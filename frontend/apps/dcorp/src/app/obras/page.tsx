import type { Metadata } from "next";

export { default } from "@/app/(landing-page)/dcorp-pages/obras/page";

export const metadata: Metadata = {
  title: "Obras",
  description:
    "Execução com escala: empreendimentos residenciais, condomínios e obras para incorporadoras com sistemas industrializados.",
  alternates: { canonical: "/obras" },
  openGraph: {
    title: "Obras | DCORP Engenharia",
    description:
      "Residencial, condomínios e execução para incorporadoras — com engenharia e produtividade.",
    url: "/obras",
  },
};
