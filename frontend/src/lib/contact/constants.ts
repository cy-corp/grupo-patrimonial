import type { CompanyId } from "@/lib/companies";

export const SUBJECTS_BY_COMPANY: Record<CompanyId, readonly string[]> = {
  rendal: ["Terreno ou parceria", "Investimento", "Produto imobiliário", "Outros"],
  dcorp: ["Engenharia e construção", "Projeto e engenharia", "Administração da construção", "Outros"],
};

export const CONTACT_LIMITS = {
  name: 120,
  email: 254,
  phoneDigits: { min: 10, max: 11 },
  subject: 160,
  message: 4000,
  service: 160,
} as const;

export const GENERIC_CONTACT_ERROR =
  "Não foi possível enviar. Tente novamente em instantes.";

export const RATE_LIMIT_ERROR =
  "Muitas tentativas. Aguarde alguns minutos e tente de novo.";
