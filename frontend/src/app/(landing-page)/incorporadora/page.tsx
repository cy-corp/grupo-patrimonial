"use client";

import { RendalHomeHero } from "./RendalHomeHero";
import { RendalBenefits } from "./RendalBenefits";
import { RendalMorphScroll } from "./RendalMorphScroll";
import { RendalHowItWorks } from "./RendalHowItWorks";
import { RendalSocialProof } from "./RendalSocialProof";
import { RendalFAQ } from "./RendalFAQ";
import { RendalFinalCta } from "./RendalFinalCta";

export default function IncorporadoraPage() {
  return (
    <main className="relative isolate flex min-h-screen flex-col bg-[#F8F1E3] font-sans">
      <RendalHomeHero />
      <RendalMorphScroll />
      <RendalBenefits />
      <RendalHowItWorks />
      <RendalSocialProof />
      <RendalFAQ />
      <RendalFinalCta />
    </main>
  );
}
