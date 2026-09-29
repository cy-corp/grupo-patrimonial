import type { MetadataRoute } from "next";
import { empreendimentos } from "@/lib/rendal/content/empreendimentos";
import { getRendalSiteUrl } from "@/lib/rendal/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getRendalSiteUrl();
  const lastModified = new Date();
  const paths = [
    "/",
    "/quem-somos",
    "/empreendimentos",
    "/proprietarios",
    "/parceiros",
    "/contato",
    "/politica-de-privacidade",
    ...empreendimentos.map((item) => `/empreendimentos/${item.slug}`),
  ];
  return paths.map((path) => ({
    url: path === "/" ? `${origin}/` : `${origin}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "weekly",
    priority: path === "/" ? 1 : path.startsWith("/empreendimentos") ? 0.8 : 0.7,
  }));
}
