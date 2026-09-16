import type { MetadataRoute } from "next";
import { getDcorpSiteUrl } from "../lib/site";

const ROUTES = [
  "/",
  "/quem-somos",
  "/sistemas-construtivos",
  "/servicos",
  "/obras",
  "/contato",
  "/politica-de-privacidade",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getDcorpSiteUrl();
  const lastModified = new Date();

  return ROUTES.map((path) => ({
    url: path === "/" ? origin : `${origin}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/contato" ? 0.9 : 0.7,
  }));
}
