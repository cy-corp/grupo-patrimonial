import type { MetadataRoute } from "next";
import { getRendalSiteUrl } from "@/lib/rendal/site";

export default function robots(): MetadataRoute.Robots {
  const origin = getRendalSiteUrl();
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/concept", "/investidores"] },
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
