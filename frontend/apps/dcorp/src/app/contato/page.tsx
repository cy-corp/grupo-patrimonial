import type { Metadata } from "next";
import { DcorpContactPage } from "@/components/site/DcorpContactPage";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Solicite um orçamento ou fale sobre parceria tecnológica com a DCORP Engenharia.",
};

export default function ContatoPage() {
  return <DcorpContactPage />;
}
