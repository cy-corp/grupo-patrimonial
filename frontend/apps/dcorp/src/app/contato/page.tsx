import type { Metadata } from "next";
import { SiteContactPage } from "@/components/site/SiteContactPage";

export const metadata: Metadata = {
  title: "Contato",
  description: "Solicite um orçamento para sua obra com a DCorp Engenharia.",
};

export default function DcorpContactPage() {
  return <SiteContactPage companyId="dcorp" />;
}
