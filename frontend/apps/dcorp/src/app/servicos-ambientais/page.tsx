import type { Metadata } from "next";

export { default } from "@/app/(landing-page)/dcorp-pages/servicos-ambientais/page";

export const metadata: Metadata = {
  title: "Serviços ambientais",
  description:
    "Regularização ambiental de loteamento, outorga, recurso de multa, licenciamento, CAR e recuperação de área degradada.",
  alternates: { canonical: "/servicos-ambientais" },
  openGraph: {
    title: "Serviços ambientais | DCORP Engenharia",
    description:
      "Regularizar o terreno e liberar o projeto: licenciamento, CAR, outorga e recuperação de área degradada.",
    url: "/servicos-ambientais",
  },
};
