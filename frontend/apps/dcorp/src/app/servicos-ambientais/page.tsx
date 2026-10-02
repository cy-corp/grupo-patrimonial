import type { Metadata } from "next";

export { default } from "@/app/(landing-page)/dcorp-pages/servicos-ambientais/page";

export const metadata: Metadata = {
  title: "Meio ambiente",
  description:
    "Consultoria ambiental e aprovações de loteamentos e obras: licenciamento, CAR, outorga e recurso de multa na esfera administrativa.",
  alternates: { canonical: "/servicos-ambientais" },
  openGraph: {
    title: "Meio ambiente | DCORP Engenharia",
    description:
      "Consultoria ambiental e aprovações de loteamentos e obras — do CAR à recuperação de área degradada.",
    url: "/servicos-ambientais",
  },
};
