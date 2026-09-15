import { DcorpHero } from "./components/DcorpHero";
import { DcorpPillars } from "./components/DcorpPillars";
import { DcorpSolutions } from "./components/DcorpSolutions";
import { DcorpInstitutional } from "./components/DcorpInstitutional";
import { DcorpCta } from "./components/DcorpCta";

/**
 * DCORP home — minimalista industrial premium.
 * Paleta e mensagens alinhadas a DCORP-CONTEXTO-MARCA.md.
 */
export default function DcorpHomePage() {
  return (
    <main className="flex min-h-dvh flex-col bg-white">
      <DcorpHero />
      <DcorpPillars />
      <DcorpSolutions />
      <DcorpInstitutional />
      <DcorpCta />
    </main>
  );
}
