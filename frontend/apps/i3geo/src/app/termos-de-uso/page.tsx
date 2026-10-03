import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: "Condições de uso do site da i3Geo.",
  alternates: { canonical: "/termos-de-uso" },
};

// Minuta redigida a partir do que o site faz hoje. Falta incluir razão social, CNPJ e
// foro, e passar por revisão jurídica antes de publicar.
const sections: LegalSection[] = [
  {
    title: "Aceitação",
    paragraphs: [
      "Ao navegar neste site, você concorda com estes termos. Se não concordar com algum ponto, pedimos que não utilize o site.",
    ],
  },
  {
    title: "O que é este site",
    paragraphs: [
      "O site apresenta a i3Geo e os serviços que ela presta em topografia e georreferenciamento, e oferece um canal para pedir orçamento.",
      "As informações têm caráter geral e informativo. Elas não substituem a análise técnica de um caso concreto, que depende de documentos e de levantamento em campo.",
    ],
  },
  {
    title: "Pedidos de orçamento",
    paragraphs: [
      "O envio de um pedido de orçamento não cria contrato nem obrigação de contratar, para nenhuma das partes.",
      "Valores, prazos e escopo só valem depois de formalizados em proposta emitida pela i3Geo e aceita por você.",
      "Você é responsável pela veracidade das informações que enviar sobre o imóvel e sobre si.",
    ],
  },
  {
    title: "Conteúdo ilustrativo",
    paragraphs: [
      "O imóvel, os vértices, as áreas e as coordenadas exibidos nas animações do site são ilustrativos e não correspondem a um imóvel de cliente.",
      "O relevo usado nas animações vem de dados públicos de elevação (SRTM, da NASA). Fotografias podem ser meramente ilustrativas.",
    ],
  },
  {
    title: "Propriedade intelectual",
    paragraphs: [
      "A marca i3Geo, os textos, os desenhos, as animações e o código do site pertencem à i3Geo ou são usados com autorização. Não é permitido copiar, reproduzir ou explorar comercialmente esse conteúdo sem autorização prévia e por escrito.",
    ],
  },
  {
    title: "Links e serviços de terceiros",
    paragraphs: [
      "O site contém links para serviços de terceiros, como WhatsApp e Instagram. Esses serviços têm regras e políticas próprias, e a i3Geo não responde pelo funcionamento deles.",
    ],
  },
  {
    title: "Disponibilidade",
    paragraphs: [
      "Trabalhamos para manter o site no ar e atualizado, mas ele pode ficar indisponível por manutenção ou por motivos fora do nosso controle. O conteúdo pode ser alterado sem aviso prévio.",
    ],
  },
  {
    title: "Privacidade",
    paragraphs: [
      "O tratamento de dados pessoais segue a nossa Política de privacidade, disponível no rodapé de todas as páginas.",
    ],
  },
  {
    title: "Legislação aplicável",
    paragraphs: ["Estes termos são regidos pelas leis da República Federativa do Brasil."],
  },
];

export default function TermosDeUsoPage() {
  return (
    <LegalPage
      title="Termos de uso"
      updated="3 de outubro de 2026"
      intro="Estes termos descrevem as condições para usar o site da i3Geo."
      sections={sections}
    />
  );
}
