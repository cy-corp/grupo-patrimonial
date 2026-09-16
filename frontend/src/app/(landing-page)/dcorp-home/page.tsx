import { DcorpHero } from "./components/DcorpHero";
import { DcorpAudiences } from "./components/DcorpAudiences";
import { DcorpSolutions } from "./components/DcorpSolutions";
import { DcorpServices } from "./components/DcorpServices";
import { DcorpInstitutional } from "./components/DcorpInstitutional";
import { DcorpWorksTeaser } from "./components/DcorpWorksTeaser";
import { DcorpCta } from "./components/DcorpCta";

/**
 * DCORP home — industrial premium.
 * Visual: DCORP-CONTEXTO-MARCA.md · IA comercial: seção “IA do site”.
 */
export default function DcorpHomePage() {
  return (
    <main className="flex min-h-svh flex-col bg-white">
      <DcorpHero />
      <DcorpAudiences />
      <DcorpSolutions />
      <DcorpServices />
      <DcorpInstitutional />
      <DcorpWorksTeaser />
      <DcorpCta />
    </main>
  );
}
