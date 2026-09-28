import { Resend } from "resend";
import { companies } from "@/lib/companies";
import { GENERIC_CONTACT_ERROR } from "@/lib/contact/constants";
import { mailForCompany, resendConfigured } from "@/lib/contact/mail-config";
import { enforceLeadRateLimit } from "@/lib/contact/rate-limit";
import {
  confirmationLeadEmail,
  financiamentoConfirmationEmail,
  internalLeadEmail,
} from "@/lib/contact/templates";
import { empreendimentos } from "@/lib/rendal/content/empreendimentos";
import {
  checklistFinanciamento,
  FINANCIAMENTO_DISCLAIMER,
  FINANCIAMENTO_SUBJECT,
  isFgts,
  isTipoRenda,
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

function collapseLine(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim() : "";
}

function financiamentoExtras(formData: FormData, name: string) {
  const tipoRenda = formData.get("tipoRenda");
  const fgts = formData.get("fgts");
  const empreendimento = collapseLine(formData.get("empreendimento")).slice(0, 80);
  const known = empreendimentos.find((item) => item.nome === empreendimento);
  const checklist = checklistFinanciamento({
    tipoRenda: isTipoRenda(tipoRenda) ? tipoRenda : "",
    fgts: isFgts(fgts) ? fgts : "",
  });
  const company = companies.rendal;
  return {
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

  const internal = internalLeadEmail({
    company,
    name: input.name,
    email: input.email,
    phone: input.phone,
    subject: input.subject,
    message: input.message,
    kind: input.kind,
  });
  const confirm = input.confirmation ?? {
    subject: `Recebemos sua mensagem — ${company.name}`,
    ...confirmationLeadEmail({ company, name: input.name }),
  };
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

export async function sendContact(formData: FormData) {
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

  try {
    const sent = await sendPair({
      companyId: fields.companyId,
      name: fields.name,
      email: fields.email,
      phone: fields.phone ? formatPhoneBr(fields.phone) : "—",
      subject: fields.subject,
      message: fields.message,
      kind: "contact",
      ...financiamento,
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
