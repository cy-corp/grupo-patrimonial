import { Resend } from "resend";
import { companies } from "@/lib/companies";
import { GENERIC_CONTACT_ERROR } from "@/lib/contact/constants";
import { mailForCompany, resendConfigured } from "@/lib/contact/mail-config";
import { enforceLeadRateLimit } from "@/lib/contact/rate-limit";
import { confirmationLeadEmail, internalLeadEmail } from "@/lib/contact/templates";
import { requestIp, verifyTurnstile } from "@/lib/contact/turnstile";
import {
  formatPhoneBr,
  parseContactForm,
  parseQuoteForm,
} from "@/lib/contact/validation";

function resendClient() {
  return new Resend(process.env.RESEND_API_KEY);
}

async function sendPair(input: {
  companyId: "rendal" | "dcorp";
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  kind: "contact" | "quote";
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
  const confirm = confirmationLeadEmail({ company, name: input.name });
  const resend = resendClient();
  const brand = input.companyId === "dcorp" ? "DCorp" : "Rendal";

  const internalResult = await resend.emails.send({
    from,
    to: inbox,
    replyTo: input.email,
    subject: `[${brand}] ${input.subject} — ${input.name}`,
    text: internal.text,
    html: internal.html,
  });

  if (internalResult.error) {
    return { ok: false as const, message: GENERIC_CONTACT_ERROR };
  }

  const confirmation = await resend.emails.send({
    from,
    to: input.email,
    subject: `Recebemos sua mensagem — ${company.name}`,
    text: confirm.text,
    html: confirm.html,
  });

  if (confirmation.error) {
    console.error("contact.confirmation_failed", confirmation.error.name);
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

  const limited = await enforceLeadRateLimit("contact", ip, fields.email);
  if (!limited.ok) return { success: false, message: limited.message };

  try {
    const sent = await sendPair({
      companyId: fields.companyId,
      name: fields.name,
      email: fields.email,
      phone: formatPhoneBr(fields.phone),
      subject: fields.subject,
      message: fields.message,
      kind: "contact",
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
