import type { MetadataRoute } from "next";
import { DCORP_ENVIRONMENTAL_PAGES } from "@/lib/dcorp-content";
import { getDcorpSiteUrl } from "../lib/site";

const ROUTES = [
  "/",
  "/quem-somos",
  "/sistemas-construtivos",
  "/servicos",
  "/servicos-ambientais",
  ...DCORP_ENVIRONMENTAL_PAGES.map((page) => `/servicos-ambientais/${page.slug}`),
  "/obras",
  "/contato",
  "/politica-de-privacidade",
];

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
