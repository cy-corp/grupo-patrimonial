import { RendalConceptHero } from "../RendalConceptHero";
import { RendalPriceGuess } from "../RendalPriceGuess";
import { RendalAnatomy } from "../RendalAnatomy";
import { RendalHowItWorks } from "../RendalHowItWorks";
import { RendalSocialProof } from "../RendalSocialProof";
import { RendalFAQ } from "../RendalFAQ";
import { RendalFinalCta } from "../RendalFinalCta";

export default function RendalConceptPage() {
  return (
    <main className="relative isolate flex min-h-screen flex-col bg-[#F8F1E3] font-sans">
      <RendalConceptHero />
      <RendalPriceGuess />
      <RendalAnatomy />
      <RendalHowItWorks />
      <RendalSocialProof />
      <RendalFAQ />
      <RendalFinalCta />
    </main>
  );
}
