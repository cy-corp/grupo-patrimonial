import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const pages = [
  { path: "/", priority: 1 },
  { path: "/servicos", priority: 0.9 },
  { path: "/orcamento", priority: 0.8 },
  { path: "/sobre", priority: 0.6 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${siteUrl}${page.path === "/" ? "" : page.path}`,
    changeFrequency: "monthly",
    priority: page.priority,
  }));
}
