import type { Metadata } from "next";

const description =
  "Incorporadora do Grupo Rendal em Campinas. Cada centavo no lugar certo — veja empreendimentos e agende visita sem compromisso.";

export const metadata: Metadata = {
  title: {
    absolute: "Rendal Incorporadora | Grupo Rendal",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rendal Incorporadora | Grupo Rendal",
    description,
    url: "/",
  },
};

export { default } from "@/app/(landing-page)/incorporadora/concept/page";
