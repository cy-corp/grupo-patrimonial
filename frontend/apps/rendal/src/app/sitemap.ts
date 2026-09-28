import type { MetadataRoute } from "next";
import { empreendimentos } from "@/lib/rendal/content/empreendimentos";
import { getRendalSiteUrl } from "@/lib/rendal/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getRendalSiteUrl();
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
    url: `${origin}${path}`,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
