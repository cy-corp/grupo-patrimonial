import type { Metadata } from "next";
import { SiteContactPage } from "@/components/site/SiteContactPage";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Rendal sobre terrenos, parcerias e empreendimentos imobiliários.",
};

export default function RendalContactPage() {
  return <SiteContactPage companyId="rendal" />;
}
