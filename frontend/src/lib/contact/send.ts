import { Resend } from "resend";
import { companies } from "@/lib/companies";
import { GENERIC_CONTACT_ERROR } from "@/lib/contact/constants";
import { mailForCompany, resendConfigured } from "@/lib/contact/mail-config";
import { enforceLeadRateLimit } from "@/lib/contact/rate-limit";
import {
  confirmationLeadEmail,
  financiamentoConfirmationEmail,
  internalLeadEmail,
  leadEmailCopy,
} from "@/lib/contact/templates";
import { empreendimentos } from "@/lib/rendal/content/empreendimentos";
import { linkArquivo } from "@/lib/rendal/arquivo-link";
import { getRendalSiteUrl } from "@/lib/rendal/site";
import {
  documentosDaCotacao,
  FINANCIAMENTO_DISCLAIMER,
  FINANCIAMENTO_SUBJECT,
  parseDossier,
  primeiraEtapaInvalida,
  textoDossier,
} from "@/lib/rendal/financiamento";
import { requestIp, verifyTurnstile } from "@/lib/contact/turnstile";
import {
  formatPhoneBr,
  parseContactForm,
  parseQuoteForm,
} from "@/lib/contact/validation";

function resendClient() {
  return new Resend(process.env.RESEND_API_KEY);
}

function financiamentoExtras(formData: FormData, name: string) {
  const parsed = parseDossier(formData.get("dossier"));
  if (!parsed.ok) return { error: parsed.message };
  const draft = parsed.draft;
  if (primeiraEtapaInvalida(draft, { tipologiaObrigatoria: true })) {
    return { error: "Faltam dados ou documentos da cotação." };
  }
  const empreendimento = draft.empreendimento;
  const known = empreendimentos.find((item) => item.nome === empreendimento);
  const origin = getRendalSiteUrl();
  const company = companies.rendal;
  const checklist = documentosDaCotacao(draft).map((slot) => ({ id: slot.id, label: slot.label }));
  return {
    message: textoDossier(draft, (arquivo) => linkArquivo(origin, arquivo.pathname)),
    subjectSuffix: empreendimento ? ` · ${known?.nome ?? empreendimento}` : "",
    confirmation: {
      subject: `Recebemos seu pedido de orientação de crédito — ${company.name}`,
      ...financiamentoConfirmationEmail({
        company,
        name,
        checklist,
        disclaimer: FINANCIAMENTO_DISCLAIMER,
      }),
    },
  };
}

async function sendPair(input: {
  companyId: "rendal" | "dcorp";
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  kind: "contact" | "quote";
  subjectSuffix?: string;
  confirmation?: { subject: string; text: string; html: string };
}) {
  const { company, inbox, from } = mailForCompany(input.companyId);
  if (!inbox) return { ok: false as const, message: GENERIC_CONTACT_ERROR };

  const copy = leadEmailCopy({
    companyId: input.companyId,
    subject: input.subject,
    kind: input.kind,
  });
  const internal = internalLeadEmail({
    company,
    name: input.name,
    email: input.email,
    phone: input.phone,
    subject: input.subject,
    message: input.message,
    kind: input.kind,
    label: copy.internalLabel,
  });
  const confirm = input.confirmation ?? confirmationLeadEmail({
    company,
    name: input.name,
    subject: copy.subject,
    paragraphs: copy.paragraphs,
  });
  const resend = resendClient();
  const brand = input.companyId === "dcorp" ? "DCorp" : "Rendal";

  const internalResult = await resend.emails.send({
    from,
    to: inbox,
    replyTo: input.email || undefined,
    subject: `[${brand}] ${input.subject} — ${input.name}${input.subjectSuffix ?? ""}`,
    text: internal.text,
    html: internal.html,
  });

  if (internalResult.error) {
    return { ok: false as const, message: GENERIC_CONTACT_ERROR };
  }

  if (input.email) {
    const confirmation = await resend.emails.send({
      from,
      to: input.email,
      subject: confirm.subject,
      text: confirm.text,
      html: confirm.html,
    });

    if (confirmation.error) {
      console.error("contact.confirmation_failed", confirmation.error.name);
    }
  }

  return { ok: true as const, message: "Mensagem enviada com sucesso!" };
}

export async function sendContact(formData: FormData): Promise<{ success: boolean; message: string }> {
  const parsed = parseContactForm(formData);
  if (!parsed.ok) return { success: false, message: parsed.message };
  const fields = parsed.fields;

  if (fields.honeypot.trim()) {
    return { success: true, message: "Mensagem enviada com sucesso!" };
  }

  if (!resendConfigured()) {
    return { success: false, message: GENERIC_CONTACT_ERROR };
  }

  const ip = await requestIp();
  const turnstile = await verifyTurnstile(fields.turnstileToken, ip);
  if (!turnstile.ok) return { success: false, message: turnstile.message };

  const limited = await enforceLeadRateLimit("contact", ip, fields.email || fields.phone);
  if (!limited.ok) return { success: false, message: limited.message };

  const financiamento =
    fields.companyId === "rendal" && fields.subject === FINANCIAMENTO_SUBJECT
      ? financiamentoExtras(formData, fields.name)
      : undefined;
  if (financiamento && "error" in financiamento) {
    return { success: false, message: financiamento.error || "Não foi possível ler os dados da cotação." };
  }

  try {
    const sent = await sendPair({
      companyId: fields.companyId,
      name: fields.name,
      email: fields.email,
      phone: fields.phone ? formatPhoneBr(fields.phone) : "—",
      subject: fields.subject,
      message: financiamento?.message ?? fields.message,
      kind: "contact",
      subjectSuffix: financiamento?.subjectSuffix,
      confirmation: financiamento?.confirmation,
    });
    return sent.ok
      ? { success: true, message: sent.message }
      : { success: false, message: sent.message };
  } catch {
    return { success: false, message: GENERIC_CONTACT_ERROR };
  }
}

export async function sendQuote(formData: FormData) {
  const parsed = parseQuoteForm(formData);
  if (!parsed.ok) return { success: false, message: parsed.message };
  const fields = parsed.fields;

  if (fields.honeypot.trim()) {
    return { success: true, message: "Mensagem enviada com sucesso!" };
  }

  if (!resendConfigured()) {
    return { success: false, message: GENERIC_CONTACT_ERROR };
  }

  const ip = await requestIp();
  const turnstile = await verifyTurnstile(fields.turnstileToken, ip);
  if (!turnstile.ok) return { success: false, message: turnstile.message };

  const limited = await enforceLeadRateLimit("quote", ip, fields.email);
  if (!limited.ok) return { success: false, message: limited.message };

  try {
    const sent = await sendPair({
      companyId: "rendal",
      name: fields.name,
      email: fields.email,
      phone: "—",
      subject: fields.service,
      message: fields.details,
      kind: "quote",
    });

    const dcorpInbox = mailForCompany("dcorp").inbox;
    const rendalInbox = mailForCompany("rendal").inbox;
    if (sent.ok && dcorpInbox && dcorpInbox !== rendalInbox) {
      try {
        const extra = internalLeadEmail({
          company: companies.dcorp,
          name: fields.name,
          email: fields.email,
          phone: "—",
          subject: fields.service,
          message: fields.details,
          kind: "quote",
          label: "Orçamento",
        });
        await resendClient().emails.send({
          from: mailForCompany("dcorp").from,
          to: dcorpInbox,
          replyTo: fields.email,
          subject: `[DCorp] Orçamento — ${fields.name}`,
          text: extra.text,
          html: extra.html,
        });
      } catch {
        console.error("quote.dcorp_copy_failed");
      }
    }

    return sent.ok
      ? { success: true, message: sent.message }
      : { success: false, message: sent.message };
  } catch {
    return { success: false, message: GENERIC_CONTACT_ERROR };
  }
}
