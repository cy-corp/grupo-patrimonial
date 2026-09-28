import { companies } from "@/lib/companies";

export function rendalWhatsapp(text: string) {
  const phone = companies.rendal.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function getRendalSiteUrl() {
  const fromEnv =
    process.env.NEXT_PUBLIC_RENDAL_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return "https://gruporendal.com.br";
}
