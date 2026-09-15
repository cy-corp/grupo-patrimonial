import { companies, type CompanyId } from "@/lib/companies";

export function mailForCompany(companyId: CompanyId) {
  const company = companies[companyId];
  const inbox =
    companyId === "dcorp"
      ? process.env.CONTACT_EMAIL_DCORP || process.env.CONTACT_EMAIL || company.email
      : process.env.CONTACT_EMAIL_RENDAL || process.env.CONTACT_EMAIL || company.email;

  const from =
    companyId === "dcorp"
      ? process.env.RESEND_FROM_DCORP || "DCorp Engenharia <noreply@dcorp.com.br>"
      : process.env.RESEND_FROM_RENDAL || "Grupo Rendal <noreply@gruporendal.com.br>";

  return { company, inbox: inbox.trim(), from: from.trim() };
}

export function resendConfigured() {
  const key = process.env.RESEND_API_KEY?.trim() ?? "";
  return key.length > 0 && key !== "re_123" && key !== "re_xxxxxxxx";
}

export function isProduction() {
  return process.env.NODE_ENV === "production";
}
