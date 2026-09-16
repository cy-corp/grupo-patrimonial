"use client";

import { WhatsAppIcon } from "@/components/whatsapp-button";
import { companies, whatsappHref } from "@/lib/companies";

const company = companies.dcorp;

/** FAB simples — só DCORP, sem menu. */
export function DcorpWhatsAppFab() {
  return (
    <a
      href={whatsappHref(company, "Olá, gostaria de falar com a DCORP.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp com a DCORP"
      className="fixed bottom-6 right-6 z-[200] flex size-14 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-transform duration-150 ease-out hover:scale-[1.04] active:scale-[0.97]"
    >
      <WhatsAppIcon className="size-7" aria-hidden />
    </a>
  );
}
