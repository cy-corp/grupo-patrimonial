import type { Metadata } from "next";

export { default } from "@/app/(landing-page)/dcorp-pages/politica-de-privacidade/page";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a DCORP Engenharia trata dados pessoais enviados pelo site e pelo formulário de contato.",
  alternates: { canonical: "/politica-de-privacidade" },
  openGraph: {
    title: "Política de Privacidade | DCORP Engenharia",
    description:
      "Informações sobre tratamento de dados pessoais no site da DCORP.",
    url: "/politica-de-privacidade",
  },
};
