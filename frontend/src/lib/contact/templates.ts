import type { Company, CompanyId } from "@/lib/companies";
import { SUBJECTS_BY_COMPANY } from "@/lib/contact/constants";
import { checklistText, type ChecklistItem } from "@/lib/rendal/financiamento";

const ACCENT: Record<CompanyId, string> = {
  rendal: "#7A4A2B",
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
      "A equipe analisa a área, a documentação e o formato de parceria e retorna em até dois dias úteis.",
    ],
  },
  Investimento: {
    internalLabel: "Investimento",
    subject: "Recebemos seu interesse em investimento",
    paragraphs: [
      "Recebemos seu pedido de apresentação.",
      "A equipe retorna em até dois dias úteis com o próximo passo.",
    ],
  },
  "Produto imobiliário": {
    internalLabel: "Produto imobiliário",
    subject: "Recebemos seu interesse no empreendimento",
    paragraphs: [
      "Recebemos seu contato sobre o produto.",
      "A equipe retorna em até dois dias úteis para alinhar unidade, visita e condições.",
    ],
  },
  Outros: {
    internalLabel: "Contato",
    subject: "Recebemos sua mensagem",
    paragraphs: [
      "Recebemos sua mensagem.",
      "A equipe analisa o pedido e retorna em até dois dias úteis.",
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
      "A equipe comercial retorna em até dois dias úteis.",
    ],
  },
  "Simulação de financiamento": {
    internalLabel: "Simulação de financiamento",
    subject: "Recebemos seu pedido de orientação de crédito",
    paragraphs: [
      "Recebemos seu pedido de orientação de crédito.",
      "A equipe retorna em até dois dias úteis.",
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

const FIELD_LABELS: Record<string, string> = {
  perfil: "Perfil",
  assunto: "Assunto",
  empreendimento: "Empreendimento",
  empresa: "Empresa",
  creci: "CRECI",
  cidade: "Cidade",
  tamanho: "Tamanho",
  documento: "Documentação",
  preferencia: "Preferência",
  dia: "Dia",
  periodo: "Período",
  faixa: "Faixa",
  tipo: "Tipo",
};

function prettyLabel(key: string) {
  return FIELD_LABELS[key.toLowerCase()] ?? key.replace(/[-_]/g, " ").replace(/^\w/, (ch) => ch.toUpperCase());
}

function leakedLine(line: string) {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (/^(cf-turnstile-response|turnstileToken|g-recaptcha-response|website|privacy|dossier)\s*:/i.test(trimmed)) {
    return true;
  }
  if (trimmed.length > 180 && /^[A-Za-z0-9._+\-/=]+$/.test(trimmed.replace(/\s/g, ""))) {
    return true;
  }
  return false;
}

function formatValueHtml(value: string) {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return `<a href="mailto:${escapeHtml(value)}">${escapeHtml(value)}</a>`;
  }
  const digits = value.replace(/\D/g, "");
  if (digits.length >= 10 && digits.length <= 13 && /^[\d()\s+\-]+$/.test(value)) {
    return `<a href="tel:+55${digits.slice(-11)}">${escapeHtml(value)}</a>`;
  }
  if (/^https?:\/\//i.test(value)) {
    return `<a href="${escapeHtml(value)}">abrir</a>`;
  }
  return escapeHtml(value);
}

export function formatLeadMessageHtml(message: string, skipSubject?: string) {
  const blocks: string[] = [];
  let current: string[] = [];

  const flush = () => {
    if (!current.length) return;
    blocks.push(`<p style="margin:0 0 14px;line-height:1.7">${current.join("<br/>")}</p>`);
    current = [];
  };

  for (const raw of message.replace(/\r\n/g, "\n").split("\n")) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flush();
      continue;
    }
    if (leakedLine(line)) continue;
    const match = line.match(/^([^:]{1,80}):\s*(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (key.toLowerCase() === "assunto" && skipSubject && value === skipSubject) continue;
      if (!value || value === "on") continue;
      current.push(`<strong>${escapeHtml(prettyLabel(key))}:</strong> ${formatValueHtml(value)}`);
      continue;
    }
    current.push(escapeHtml(line.trim()));
  }
  flush();
  return blocks.join("") || `<p style="margin:0;color:#4D4D4D">(sem mensagem)</p>`;
}

export function formatLeadMessageText(message: string, skipSubject?: string) {
  return message
    .replace(/\r\n/g, "\n")
    .split("\n")
    .filter((line) => {
      if (leakedLine(line)) return false;
      const match = line.trim().match(/^([^:]{1,80}):\s*(.*)$/);
      if (match && match[1].trim().toLowerCase() === "assunto" && skipSubject && match[2].trim() === skipSubject) {
        return false;
      }
      return true;
    })
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
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
  messageHtml?: string;
}) {
  const kindLabel =
    input.label ?? (input.kind === "quote" ? "Orçamento" : "Contato");
  const accent = ACCENT[input.company.id];
  const email = input.email.trim() || "—";
  const phone = input.phone.trim() || "—";
  const bodyText = formatLeadMessageText(input.message, input.subject) || "(sem mensagem)";
  const text = [
    `${kindLabel} — ${input.company.legalName}`,
    `Nome: ${input.name}`,
    `E-mail: ${email}`,
    `Telefone: ${phone}`,
    `Assunto: ${input.subject}`,
    "",
    bodyText,
  ].join("\n");

  const emailHtml =
    email.includes("@")
      ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`
      : escapeHtml(email);
  const phoneDigits = phone.replace(/\D/g, "");
  const phoneHtml =
    phoneDigits.length >= 10
      ? `<a href="tel:+55${phoneDigits.slice(-11)}">${escapeHtml(phone)}</a>`
      : escapeHtml(phone);

  const html = `
    <div style="font-family:Arial,sans-serif;color:#1F1F1F;line-height:1.5;max-width:560px">
      <p style="margin:0 0 16px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${accent};font-weight:700">${escapeHtml(kindLabel)} · ${escapeHtml(input.company.legalName)}</p>
      <p style="margin:0 0 18px;line-height:1.7">
        <strong>Nome:</strong> ${escapeHtml(input.name)}<br/>
        <strong>E-mail:</strong> ${emailHtml}<br/>
        <strong>Telefone:</strong> ${phoneHtml}<br/>
        <strong>Assunto:</strong> ${escapeHtml(input.subject)}
      </p>
      ${input.messageHtml ?? formatLeadMessageHtml(input.message, input.subject)}
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
    "Recebemos seu pedido de orientação de crédito e os documentos enviados. A equipe retorna em até dois dias úteis.",
    "",
    "Documentos recebidos:",
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
      <p style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#7A4A2B;font-weight:700">${escapeHtml(input.company.legalName)}</p>
      <p>Olá, ${escapeHtml(first)}.</p>
      <p>Recebemos seu pedido de orientação de crédito e os documentos enviados. A equipe retorna em até dois dias úteis.</p>
      <p style="margin-bottom:8px"><strong>Documentos recebidos:</strong></p>
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
