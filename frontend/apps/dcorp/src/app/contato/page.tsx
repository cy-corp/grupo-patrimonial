import type { Metadata } from "next";
import { DcorpContactPage } from "@/components/site/DcorpContactPage";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Solicite um orçamento ou fale sobre parceria tecnológica com a DCORP. Retorno em até um dia útil.",
  alternates: { canonical: "/contato" },
  openGraph: {
    title: "Contato | DCORP Engenharia",
    description:
      "Orçamento ou parceria tecnológica — a equipe técnica retorna em até um dia útil.",
    url: "/contato",
  },
};

export default function ContatoPage() {
  return <DcorpContactPage />;
}
