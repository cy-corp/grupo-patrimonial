import type { Metadata } from "next";

export { default } from "@/app/(landing-page)/dcorp-pages/quem-somos/page";

export const metadata: Metadata = {
  title: "A DCORP",
  description:
    "Engenharia e construção industrializada com atuação própria e serviços para incorporadoras, investidores e empresas — inclusive fora da holding.",
  alternates: { canonical: "/quem-somos" },
  openGraph: {
    title: "A DCORP | DCORP Engenharia",
    description:
      "Engenharia e construção industrializada com atuação própria e serviços para terceiros.",
    url: "/quem-somos",
  },
};
