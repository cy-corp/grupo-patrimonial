import { isCompanyId, type CompanyId } from "@/lib/companies";
import {
  CONTACT_LIMITS,
  GENERIC_CONTACT_ERROR,
  SUBJECTS_BY_COMPANY,
} from "@/lib/contact/constants";

export type ContactFields = {
  companyId: CompanyId;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  turnstileToken: string;
  honeypot: string;
};

export type QuoteFields = {
  name: string;
  email: string;
  service: string;
  details: string;
  turnstileToken: string;
  honeypot: string;
};

function str(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function collapse(value: string) {
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim();
}

export function normalizeEmail(value: string) {
  return collapse(value).toLowerCase();
}

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

const EMAIL_RE = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i;

export function parseContactForm(formData: FormData):
  | { ok: true; fields: ContactFields }
  | { ok: false; message: string } {
  const honeypot = str(formData, "website");
  const companyRaw = str(formData, "company");
  if (!isCompanyId(companyRaw)) {
    return { ok: false, message: GENERIC_CONTACT_ERROR };
  }

  const name = collapse(str(formData, "name"));
  const email = normalizeEmail(str(formData, "email"));
  const phone = digitsOnly(str(formData, "phone"));
  const subject = collapse(str(formData, "subject"));
  const message = str(formData, "message").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
  const turnstileToken = str(formData, "turnstileToken");

  if (name.length < 2 || name.length > CONTACT_LIMITS.name) {
    return { ok: false, message: "Informe um nome válido." };
  }
  if (
    email.length < 6 ||
    email.length > CONTACT_LIMITS.email ||
    !EMAIL_RE.test(email)
  ) {
    return { ok: false, message: "Informe um e-mail válido." };
  }
  if (
    phone.length < CONTACT_LIMITS.phoneDigits.min ||
    phone.length > CONTACT_LIMITS.phoneDigits.max
  ) {
    return { ok: false, message: "Informe um telefone válido." };
  }
  if (!(SUBJECTS_BY_COMPANY[companyRaw] as readonly string[]).includes(subject)) {
    return { ok: false, message: GENERIC_CONTACT_ERROR };
  }
  if (message.length > CONTACT_LIMITS.message) {
    return { ok: false, message: "A mensagem é longa demais." };
  }

  return {
    ok: true,
    fields: {
      companyId: companyRaw,
      name,
      email,
      phone,
      subject,
      message,
      turnstileToken,
      honeypot,
    },
  };
}

export function parseQuoteForm(formData: FormData):
  | { ok: true; fields: QuoteFields }
  | { ok: false; message: string } {
  const honeypot = str(formData, "website");
  const name = collapse(str(formData, "name"));
  const email = normalizeEmail(str(formData, "email"));
  const service = collapse(str(formData, "service"));
  const details = str(formData, "details").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
  const turnstileToken = str(formData, "turnstileToken");

  if (name.length < 2 || name.length > CONTACT_LIMITS.name) {
    return { ok: false, message: "Informe um nome válido." };
  }
  if (
    email.length < 6 ||
    email.length > CONTACT_LIMITS.email ||
    !EMAIL_RE.test(email)
  ) {
    return { ok: false, message: "Informe um e-mail válido." };
  }
  if (service.length < 2 || service.length > CONTACT_LIMITS.service) {
    return { ok: false, message: "Informe o serviço desejado." };
  }
  if (details.length < 8 || details.length > CONTACT_LIMITS.message) {
    return { ok: false, message: "Descreva o projeto com um pouco mais de detalhe." };
  }

  return {
    ok: true,
    fields: { name, email, service, details, turnstileToken, honeypot },
  };
}

export function formatPhoneBr(digits: string) {
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return digits;
}
