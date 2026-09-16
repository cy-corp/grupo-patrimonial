import type { Company } from "@/lib/companies";

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
}) {
  const kindLabel = input.kind === "quote" ? "Orçamento" : "Contato";
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
      <p style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#C9A14A;font-weight:700">${escapeHtml(kindLabel)} · ${escapeHtml(input.company.legalName)}</p>
      <p><strong>Nome:</strong> ${escapeHtml(input.name)}<br/>
      <strong>E-mail:</strong> ${escapeHtml(input.email)}<br/>
      <strong>Telefone:</strong> ${escapeHtml(input.phone)}<br/>
      <strong>Assunto:</strong> ${escapeHtml(input.subject)}</p>
      <p style="white-space:pre-wrap">${escapeHtml(input.message || "(sem mensagem)")}</p>
    </div>
  `;

  return { text, html };
}

export function confirmationLeadEmail(input: { company: Company; name: string }) {
  const first = input.name.split(" ")[0] || input.name;
  const text = [
    `Olá, ${first}.`,
    "",
    `Recebemos sua mensagem na ${input.company.legalName}.`,
    "Nossa equipe analisa as informações e retorna em até um dia útil.",
    "",
    "Esta é uma confirmação automática. Não é necessário responder este e-mail.",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#0F172A;line-height:1.6;max-width:560px">
      <p style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#C9A14A;font-weight:700">${escapeHtml(input.company.legalName)}</p>
      <p>Olá, ${escapeHtml(first)}.</p>
      <p>Recebemos sua mensagem. Nossa equipe analisa as informações e retorna em até um dia útil.</p>
      <p style="color:#4D4D4D;font-size:13px">Esta é uma confirmação automática. Não é necessário responder este e-mail.</p>
    </div>
  `;

  return { text, html };
}
