import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/site/legal-page";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Como a i3Geo trata os dados pessoais de quem visita o site e pede um orçamento.",
  alternates: { canonical: "/politica-de-privacidade" },
};

// Minuta redigida a partir do que o site faz hoje. Falta incluir razão social, CNPJ,
// endereço e o contato do encarregado, e passar por revisão jurídica antes de publicar.
const sections: LegalSection[] = [
  {
    title: "Quem é o responsável",
    paragraphs: [
      "A i3Geo é a responsável pelo tratamento dos dados pessoais descritos nesta política, nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018).",
      `Para qualquer assunto sobre os seus dados, fale conosco pelo WhatsApp ${contact.phone}.`,
    ],
  },
  {
    title: "Quais dados tratamos",
    paragraphs: [
      "O site não exige cadastro. Você só informa dados pessoais se decidir pedir um orçamento ou falar conosco.",
      "No pedido de orçamento, você informa:",
    ],
    items: [
      "o serviço de interesse e o tamanho aproximado da área;",
      "o município e o estado onde a área fica;",
      "o seu nome e o seu telefone;",
      "observações que você queira acrescentar.",
    ],
  },
  {
    title: "Como o pedido de orçamento funciona",
    paragraphs: [
      "As informações que você preenche são usadas no seu próprio navegador para montar uma mensagem, que você envia à i3Geo pelo WhatsApp. O site não guarda esses dados em servidores nem em banco de dados.",
      "A partir do envio, a conversa passa a acontecer no WhatsApp, serviço da Meta, que tem política de privacidade própria.",
    ],
  },
  {
    title: "Para que usamos os dados",
    paragraphs: ["Usamos os dados que você nos envia apenas para:"],
    items: [
      "entender a sua necessidade e responder ao seu contato;",
      "elaborar o orçamento e a proposta de serviço;",
      "executar o serviço contratado e cumprir obrigações legais ligadas a ele.",
    ],
  },
  {
    title: "Base legal",
    paragraphs: [
      "O tratamento se apoia na execução de procedimentos preliminares a um contrato, a pedido do próprio titular, e, depois da contratação, na execução do contrato e no cumprimento de obrigações legais e regulatórias.",
    ],
  },
  {
    title: "Com quem compartilhamos",
    paragraphs: [
      "Não vendemos nem cedemos os seus dados para fins de publicidade.",
      "Os dados podem ser tratados por fornecedores que viabilizam o atendimento, como o WhatsApp e o serviço de hospedagem do site, que registra dados técnicos de acesso (endereço IP, navegador, data e hora) para funcionamento e segurança.",
      "Quando o serviço exigir, informações do imóvel e do requerente são apresentadas aos órgãos e cartórios competentes, sempre dentro da finalidade contratada.",
    ],
  },
  {
    title: "Cookies",
    paragraphs: [
      "O site não usa cookies de publicidade nem ferramentas de rastreamento de comportamento. Se isso mudar, esta política será atualizada antes.",
    ],
  },
  {
    title: "Por quanto tempo guardamos",
    paragraphs: [
      "Mantemos as conversas e os documentos pelo tempo necessário para atender ao seu pedido e, quando houver contratação, pelos prazos exigidos pela legislação aplicável aos serviços técnicos prestados.",
    ],
  },
  {
    title: "Os seus direitos",
    paragraphs: ["Você pode, a qualquer momento, pedir:"],
    items: [
      "a confirmação de que tratamos os seus dados e o acesso a eles;",
      "a correção de dados incompletos, inexatos ou desatualizados;",
      "a eliminação de dados desnecessários ou tratados em desconformidade com a lei;",
      "informações sobre com quem os dados foram compartilhados;",
      "a revogação do consentimento, quando o tratamento se basear nele.",
    ],
  },
  {
    title: "Alterações desta política",
    paragraphs: [
      "Podemos atualizar esta política para refletir mudanças no site ou na legislação. A data da última atualização fica indicada no topo da página.",
    ],
  },
];

export default function PoliticaDePrivacidadePage() {
  return (
    <LegalPage
      title="Política de privacidade"
      updated="3 de outubro de 2026"
      intro="Esta política explica, em linguagem direta, quais dados pessoais a i3Geo trata quando você visita o site ou pede um orçamento, para que eles servem e quais são os seus direitos."
      sections={sections}
    />
  );
}
