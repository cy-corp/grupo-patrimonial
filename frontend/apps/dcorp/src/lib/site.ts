/** Canonical site origin for DCORP (OG, sitemap, robots). */
export function getDcorpSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return "https://dcorp.com.br";
}

export const DCORP_SITE_NAME = "DCORP Engenharia";

/** Matches the home hero supporting line. */
export const DCORP_DEFAULT_DESCRIPTION =
  "Construção industrializada com engenharia, velocidade e controle — para incorporadoras, investidores e empresas.";

export const DCORP_SIGNATURE = "Projetos que constroem oportunidades.";
