import type { CompanyId } from "@/lib/companies";

const RENDAL_SLUGS = new Set([
  "incorporadora",
  "imobiliaria",
  "investidores",
  "rendal",
]);

const DCORP_SLUGS = new Set([
  "engenharia",
  "construtora",
  "dcorp",
  "sistemas-construtivos",
  "servicos",
  "obras",
]);

export function brandFromPageSlug(slug: string): CompanyId | "shared" {
  const normalized = slug.toLowerCase();
  if (RENDAL_SLUGS.has(normalized) || normalized.startsWith("rendal-")) {
    return "rendal";
  }
  if (DCORP_SLUGS.has(normalized) || normalized.startsWith("dcorp-")) {
    return "dcorp";
  }
  return "shared";
}

export function brandLabel(brand: CompanyId | "shared") {
  if (brand === "rendal") return "Rendal";
  if (brand === "dcorp") return "DCorp";
  return "Compartilhado";
}
