import { FinalCta } from "@/components/rendal/FinalCta";
import { primaryEmpreendimentoHref } from "@/lib/rendal/content/empreendimentos";

export function RendalFinalCta() {
  return (
    <FinalCta
      title="Veja se este é o lugar certo para você"
      subtitle="Consulte plantas, acabamentos e condições. Agende uma visita e decida no seu tempo, sem compromisso."
      href={primaryEmpreendimentoHref()}
      cta="Ver plantas e condições"
    />
  );
}
