import type { Metadata } from "next";

export { default } from "@/app/(landing-page)/dcorp-pages/obras/page";

export const metadata: Metadata = {
  title: "Obras",
  description:
    "Portfólio DCORP: obra Holambra em andamento com painel monolítico EPS e tipologias de execução em escala.",
  alternates: { canonical: "/obras" },
  openGraph: {
    title: "Obras | DCORP Engenharia",
    description:
      "Holambra em andamento com painel monolítico EPS — e execução para residencial e incorporadoras.",
    url: "/obras",
  },
};
