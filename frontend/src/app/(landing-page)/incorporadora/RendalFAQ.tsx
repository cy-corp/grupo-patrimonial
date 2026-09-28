"use client";

import { FaqList } from "@/components/rendal/FaqList";
import { faqHome } from "@/lib/rendal/content/faq";

export function RendalFAQ() {
  return (
    <FaqList
      items={[...faqHome]}
      subtitle="Antes de visitar: método, produto e próximo passo."
    />
  );
}
