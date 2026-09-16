import type { MetadataRoute } from "next";
import { getDcorpSiteUrl } from "../lib/site";

export default function robots(): MetadataRoute.Robots {
  const origin = getDcorpSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
