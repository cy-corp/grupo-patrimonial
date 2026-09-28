import type { Company, CompanyId } from "@/lib/companies";
import { SUBJECTS_BY_COMPANY } from "@/lib/contact/constants";
import { checklistText, type ChecklistItem } from "@/lib/rendal/financiamento";

const ACCENT: Record<CompanyId, string> = {
  rendal: "#0F5B63",
  dcorp: "#C9A96A",
};

type LeadCopy = {
  internalLabel: string;
  subject: string;
  paragraphs: readonly string[];
};

const RENDAL_COPY = {
  "Terreno ou parceria": {
    internalLabel: "Terreno ou parceria",
    subject: "Recebemos as informações do terreno",
    paragraphs: [
      "Recebemos os dados do terreno.",
      "A equipe analisa a área, a documentação e o formato de parceria e retorna em até um dia útil.",
    ],
  },
  Investimento: {
    internalLabel: "Investimento",
    subject: "Recebemos seu interesse em investimento",
    paragraphs: [
      "Recebemos seu pedido de apresentação.",
      "A equipe retorna em até um dia útil com o próximo passo.",
    ],
  },
  "Produto imobiliário": {
    internalLabel: "Produto imobiliário",
    subject: "Recebemos seu interesse no empreendimento",
    paragraphs: [
      "Recebemos seu contato sobre o produto.",
      "A equipe retorna em até um dia útil para alinhar unidade, visita e condições.",
    ],
  },
  Outros: {
    internalLabel: "Contato",
    subject: "Recebemos sua mensagem",
    paragraphs: [
      "Recebemos sua mensagem.",
      "A equipe analisa o pedido e retorna em até um dia útil.",
    ],
  },
  "Lista de lançamento": {
    internalLabel: "Lista de lançamento",
    subject: "Você entrou na lista de lançamento",
    paragraphs: [
      "Seu contato entrou na lista de lançamento.",
      "Avisamos por aqui quando houver novidade.",
    ],
  },
  Parceria: {
    internalLabel: "Parceria",
    subject: "Recebemos seu pedido de parceria",
    paragraphs: [
      "Recebemos os dados da imobiliária ou do parceiro.",
      "A equipe comercial retorna em até um dia útil.",
    ],
  },
  "Simulação de financiamento": {
    internalLabel: "Simulação de financiamento",
    subject: "Recebemos seu pedido de orientação de crédito",
    paragraphs: [
      "Recebemos seu pedido de orientação de crédito.",
      "A equipe retorna em até um dia útil.",
    ],
  },
} as const satisfies Record<(typeof SUBJECTS_BY_COMPANY.rendal)[number], LeadCopy>;

const DCORP_COPY = {
  "Solicitar orçamento": {
    internalLabel: "Orçamento",
    subject: "Recebemos seu pedido de orçamento",
    paragraphs: [
      "Recebemos o escopo da obra.",
      "A engenharia analisa sistema, prazo e local e retorna em até um dia útil.",
    ],
  },
  "Parceria tecnológica": {
    internalLabel: "Parceria tecnológica",
    subject: "Recebemos seu pedido de parceria tecnológica",
    paragraphs: [
      "Recebemos o perfil da construtora ou incorporadora.",
      "A equipe retorna em até um dia útil sobre a implantação.",
    ],
  },
  "Engenharia e execução": {
    internalLabel: "Engenharia e execução",
    subject: "Recebemos seu contato sobre engenharia e execução",
    paragraphs: [
      "Recebemos o pedido de engenharia e execução.",
      "A equipe técnica retorna em até um dia útil.",
    ],
  },
  Outros: {
    internalLabel: "Contato",
    subject: "Recebemos sua mensagem",
    paragraphs: [
      "Recebemos sua mensagem.",
      "A equipe analisa o pedido e retorna em até um dia útil.",
    ],
  },
} as const satisfies Record<(typeof SUBJECTS_BY_COMPANY.dcorp)[number], LeadCopy>;

const QUOTE_COPY: LeadCopy = {
  internalLabel: "Orçamento",
  subject: "Recebemos seu pedido de orçamento",
  paragraphs: [
    "Recebemos os dados do orçamento.",
    "A equipe analisa o serviço e retorna em até um dia útil com o próximo passo.",
  ],
};

export function leadEmailCopy(input: {
  companyId: CompanyId;
  subject: string;
  kind: "contact" | "quote";
}): LeadCopy {
  if (input.kind === "quote") return QUOTE_COPY;
  if (input.companyId === "dcorp") {
    return DCORP_COPY[input.subject as keyof typeof DCORP_COPY] ?? DCORP_COPY.Outros;
  }
  return RENDAL_COPY[input.subject as keyof typeof RENDAL_COPY] ?? RENDAL_COPY.Outros;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function internalLeadEmail(input: {
  company: Company;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  kind: "contact" | "quote";
  label?: string;
}) {
  const kindLabel =
    input.label ?? (input.kind === "quote" ? "Orçamento" : "Contato");
  const accent = ACCENT[input.company.id];
  const text = [
    `${kindLabel} — ${input.company.legalName}`,
    `Nome: ${input.name}`,
    `E-mail: ${input.email}`,
    `Telefone: ${input.phone}`,
    `Assunto: ${input.subject}`,
    "",
    input.message || "(sem mensagem)",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#0F172A;line-height:1.5">
      <p style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${accent};font-weight:700">${escapeHtml(kindLabel)} · ${escapeHtml(input.company.legalName)}</p>
      <p><strong>Nome:</strong> ${escapeHtml(input.name)}<br/>
      <strong>E-mail:</strong> ${escapeHtml(input.email)}<br/>
      <strong>Telefone:</strong> ${escapeHtml(input.phone)}<br/>
      <strong>Assunto:</strong> ${escapeHtml(input.subject)}</p>
      <p style="white-space:pre-wrap">${escapeHtml(input.message || "(sem mensagem)")}</p>
    </div>
  `;

  return { text, html };
}

export function financiamentoConfirmationEmail(input: {
  company: Company;
  name: string;
  checklist: ChecklistItem[];
  disclaimer: string;
}) {
  const first = input.name.split(" ")[0] || input.name;
  const text = [
    `Olá, ${first}.`,
    "",
    "Recebemos seu pedido de orientação de crédito. A equipe retorna em até um dia útil.",
    "",
    "Enquanto isso, vá separando:",
    checklistText(input.checklist),
    "",
    input.disclaimer,
    "",
    "Esta é uma confirmação automática. Não é necessário responder este e-mail.",
  ].join("\n");

  const items = input.checklist
    .map(
      (item) =>
        `<li style="margin:0 0 6px">${escapeHtml(item.label)}${item.detail ? ` <span style="color:#4D4D4D">— ${escapeHtml(item.detail)}</span>` : ""}</li>`,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#1F1F1F;line-height:1.6;max-width:560px">
      <p style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#0F5B63;font-weight:700">${escapeHtml(input.company.legalName)}</p>
      <p>Olá, ${escapeHtml(first)}.</p>
      <p>Recebemos seu pedido de orientação de crédito. A equipe retorna em até um dia útil.</p>
      <p style="margin-bottom:8px"><strong>Enquanto isso, vá separando:</strong></p>
      <ul style="padding-left:20px;margin-top:0">${items}</ul>
      <p style="color:#4D4D4D;font-size:13px">${escapeHtml(input.disclaimer)}</p>
      <p style="color:#4D4D4D;font-size:13px">Esta é uma confirmação automática. Não é necessário responder este e-mail.</p>
    </div>
  `;

  return { text, html };
}

export function confirmationLeadEmail(input: {
  company: Company;
  name: string;
  subject: string;
  paragraphs: readonly string[];
}) {
  const first = input.name.split(" ")[0] || input.name;
  const accent = ACCENT[input.company.id];
  const text = [
    `Olá, ${first}.`,
    "",
    ...input.paragraphs.flatMap((paragraph) => [paragraph, ""]),
    "Esta é uma confirmação automática. Não é necessário responder este e-mail.",
  ].join("\n");

  const body = input.paragraphs
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#1F1F1F;line-height:1.6;max-width:560px">
      <p style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${accent};font-weight:700">${escapeHtml(input.company.legalName)}</p>
      <p>Olá, ${escapeHtml(first)}.</p>
      ${body}
      <p style="color:#4D4D4D;font-size:13px">Esta é uma confirmação automática. Não é necessário responder este e-mail.</p>
    </div>
  `;

  return { subject: `${input.subject} — ${input.company.legalName}`, text, html };
}
