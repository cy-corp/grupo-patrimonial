"use client";

import { WhatsAppIcon } from "@/components/whatsapp-button";
import { companies, whatsappHref, type CompanyId } from "@/lib/companies";

const GREETING: Record<CompanyId, string> = {
  dcorp: "Olá, gostaria de falar com a DCORP.",
  rendal: "Olá, gostaria de falar com a Rendal.",
};

/** FAB verde, sem menu — mesmo botão na DCORP e na Rendal. */
export function DcorpWhatsAppFab({ companyId = "dcorp" }: { companyId?: CompanyId }) {
  const company = companies[companyId];
  const name = companyId === "dcorp" ? "DCORP" : "Rendal";

  return (
    <a
      href={whatsappHref(company, GREETING[companyId])}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar no WhatsApp com a ${name}`}
      className="fixed bottom-6 right-6 z-[200] flex size-14 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-transform duration-150 ease-out hover:scale-[1.04] active:scale-[0.97]"
    >
      <WhatsAppIcon className="size-7" aria-hidden />
    </a>
  );
}
